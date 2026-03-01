import React, { createContext, useContext, useState, useEffect } from "react";
import {
    doc,
    setDoc,
    getDoc,
    collection,
    addDoc,
    query,
    where,
    getDocs,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const { currentUser } = useAuth();
    const [cartItems, setCartItems] = useState(() => {
        try {
            const saved = localStorage.getItem("squid-cart");
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem("squid-cart", JSON.stringify(cartItems));
    }, [cartItems]);

    // Sync cart to Firestore when user logs in
    useEffect(() => {
        if (currentUser) {
            syncCartToFirestore();
        }
        // eslint-disable-next-line
    }, [currentUser]);

    const syncCartToFirestore = async () => {
        if (!currentUser) return;
        try {
            const cartRef = doc(db, "users", currentUser.uid, "cart", "current");
            const snap = await getDoc(cartRef);
            if (snap.exists()) {
                const firestoreCart = snap.data().items || [];
                // Merge: keep local items, add any Firestore-only items
                const localIds = cartItems.map((i) => i.id);
                const merged = [
                    ...cartItems,
                    ...firestoreCart.filter((fi) => !localIds.includes(fi.id)),
                ];
                setCartItems(merged);
                await setDoc(cartRef, { items: merged, updatedAt: serverTimestamp() });
            } else {
                // No Firestore cart, push local cart up
                if (cartItems.length > 0) {
                    await setDoc(cartRef, {
                        items: cartItems,
                        updatedAt: serverTimestamp(),
                    });
                }
            }
        } catch (err) {
            console.error("Cart sync error:", err);
        }
    };

    const saveCartToFirestore = async (items) => {
        if (!currentUser) return;
        try {
            const cartRef = doc(db, "users", currentUser.uid, "cart", "current");
            await setDoc(cartRef, { items, updatedAt: serverTimestamp() });
        } catch (err) {
            console.error("Cart save error:", err);
        }
    };

    const addToCart = (product) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            let updated;
            if (existing) {
                updated = prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                updated = [
                    ...prev,
                    {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        quantity: 1,
                    },
                ];
            }
            saveCartToFirestore(updated);
            return updated;
        });
    };

    const removeFromCart = (productId) => {
        setCartItems((prev) => {
            const updated = prev.filter((item) => item.id !== productId);
            saveCartToFirestore(updated);
            return updated;
        });
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setCartItems((prev) => {
            const updated = prev.map((item) =>
                item.id === productId ? { ...item, quantity } : item
            );
            saveCartToFirestore(updated);
            return updated;
        });
    };

    const clearCart = () => {
        setCartItems([]);
        saveCartToFirestore([]);
    };

    // Place order
    const placeOrder = async (shippingInfo) => {
        if (!currentUser || cartItems.length === 0) return null;

        const orderTotal = cartItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
        const shipping = orderTotal >= 50 ? 0 : 5.99;

        const order = {
            userId: currentUser.uid,
            userEmail: currentUser.email,
            items: cartItems.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: item.image || "",
            })),
            shippingInfo,
            subtotal: orderTotal,
            shipping,
            total: orderTotal + shipping,
            status: "Processing",
            createdAt: serverTimestamp(),
        };

        const docRef = await addDoc(collection(db, "orders"), order);
        clearCart();
        return { id: docRef.id, ...order };
    };

    // Get user's orders
    const getUserOrders = async () => {
        if (!currentUser) return [];
        try {
            const q = query(
                collection(db, "orders"),
                where("userId", "==", currentUser.uid)
            );
            const snap = await getDocs(q);
            console.log("DEBUG: Fetching orders for user (V2: client-side sort)", currentUser.uid);
            const orders = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
            // Sort client-side (avoids needing a Firestore composite index)
            orders.sort((a, b) => {
                const ta = a.createdAt?.toDate?.() || new Date(0);
                const tb = b.createdAt?.toDate?.() || new Date(0);
                return tb - ta;
            });
            return orders;
        } catch (err) {
            console.error("Error fetching orders:", err);
            return [];
        }
    };

    const cartTotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        placeOrder,
        getUserOrders,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
