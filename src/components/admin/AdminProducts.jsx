import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";
import { db } from "../../firebase";

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
`;

const Count = styled.span`
  color: rgba(255, 255, 255, 0.5);
  font-size: 15px;
`;

const AddBtn = styled.button`
  padding: 10px 24px;
  background: linear-gradient(135deg, #ea4c89, #d16ba5);
  border: none;
  border-radius: 10px;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(234, 76, 137, 0.5); }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`;

const ProductCardStyled = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(219, 112, 147, 0.15);
  border-radius: 14px;
  padding: 20px;
`;

const PName = styled.div`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const PCategory = styled.div`
  color: rgba(255, 255, 255, 0.4);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;
`;

const PPrice = styled.div`
  color: #ea4c89;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 12px;
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionBtn = styled.button`
  flex: 1;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid ${(p) => (p.danger ? "rgba(255,68,68,0.3)" : "rgba(219,112,147,0.3)")};
  background: transparent;
  color: ${(p) => (p.danger ? "#ff6b6b" : "#fff")};
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background: ${(p) => (p.danger ? "rgba(255,68,68,0.15)" : "rgba(234,76,137,0.15)")};
  }
`;

// Modal
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  padding: 20px;
`;

const Modal = styled.div`
  width: 100%;
  max-width: 480px;
  background: #1a1a2e;
  border: 1px solid rgba(219, 112, 147, 0.3);
  border-radius: 16px;
  padding: 30px;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalTitle = styled.h3`
  color: #fff;
  font-size: 22px;
  margin-bottom: 20px;
`;

const InputGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
  margin-bottom: 5px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  border-radius: 10px;
  border: 2px solid rgba(219, 112, 147, 0.2);
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  font-size: 15px;
  outline: none;
  box-sizing: border-box;
  &:focus { border-color: #ea4c89; }
  &::placeholder { color: rgba(255, 255, 255, 0.3); }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 14px;
  border-radius: 10px;
  border: 2px solid rgba(219, 112, 147, 0.2);
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  font-size: 15px;
  outline: none;
  min-height: 80px;
  font-family: inherit;
  resize: vertical;
  box-sizing: border-box;
  &:focus { border-color: #ea4c89; }
  &::placeholder { color: rgba(255, 255, 255, 0.3); }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 14px;
  border-radius: 10px;
  border: 2px solid rgba(219, 112, 147, 0.2);
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  font-size: 15px;
  outline: none;
  box-sizing: border-box;
  &:focus { border-color: #ea4c89; }
  option { background: #1a1a2e; color: #fff; }
`;

const ModalActions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const SaveBtn = styled.button`
  flex: 1;
  padding: 12px;
  background: linear-gradient(135deg, #ea4c89, #d16ba5);
  border: none;
  border-radius: 10px;
  color: #fff;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

const CancelBtn = styled.button`
  flex: 1;
  padding: 12px;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
`;

const LoadingText = styled.p`
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
  padding: 40px;
`;

const CATEGORIES = ["hoodies", "tshirts", "accessories", "collectibles"];

const emptyProduct = {
    name: "",
    price: "",
    category: "hoodies",
    description: "",
    image: "",
    rating: 4.5,
    reviews: 0,
    inStock: true,
};

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({ ...emptyProduct });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const snap = await getDocs(collection(db, "products"));
            setProducts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        } catch (err) {
            console.error("Error loading products:", err);
        }
        setLoading(false);
    };

    const openAdd = () => {
        setEditing(null);
        setForm({ ...emptyProduct });
        setShowModal(true);
    };

    const openEdit = (product) => {
        setEditing(product.id);
        setForm({
            name: product.name || "",
            price: product.price || "",
            category: product.category || "hoodies",
            description: product.description || "",
            image: product.image || "",
            rating: product.rating || 4.5,
            reviews: product.reviews || 0,
            inStock: product.inStock !== false,
        });
        setShowModal(true);
    };

    const handleSave = async () => {
        if (!form.name || !form.price) return;
        setSaving(true);
        try {
            const data = {
                ...form,
                price: parseFloat(form.price),
                rating: parseFloat(form.rating),
                reviews: parseInt(form.reviews) || 0,
            };
            if (editing) {
                await updateDoc(doc(db, "products", editing), data);
                setProducts((prev) =>
                    prev.map((p) => (p.id === editing ? { ...p, ...data } : p))
                );
            } else {
                const ref = await addDoc(collection(db, "products"), data);
                setProducts((prev) => [...prev, { id: ref.id, ...data }]);
            }
            setShowModal(false);
        } catch (err) {
            alert("Failed to save product.");
        }
        setSaving(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this product?")) return;
        try {
            await deleteDoc(doc(db, "products", id));
            setProducts((prev) => prev.filter((p) => p.id !== id));
        } catch (err) {
            alert("Failed to delete product.");
        }
    };

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    if (loading) return <LoadingText>Loading products...</LoadingText>;

    return (
        <>
            <TopBar>
                <Count>{products.length} products in Firestore</Count>
                <AddBtn onClick={openAdd}>+ Add Product</AddBtn>
            </TopBar>

            <ProductGrid>
                {products.map((p) => (
                    <ProductCardStyled key={p.id}>
                        <PCategory>{p.category}</PCategory>
                        <PName>{p.name}</PName>
                        <PPrice>${parseFloat(p.price).toFixed(2)}</PPrice>
                        <Actions>
                            <ActionBtn onClick={() => openEdit(p)}>Edit</ActionBtn>
                            <ActionBtn danger onClick={() => handleDelete(p.id)}>
                                Delete
                            </ActionBtn>
                        </Actions>
                    </ProductCardStyled>
                ))}
            </ProductGrid>

            {showModal && (
                <Overlay onClick={() => setShowModal(false)}>
                    <Modal onClick={(e) => e.stopPropagation()}>
                        <ModalTitle>{editing ? "Edit Product" : "Add Product"}</ModalTitle>
                        <InputGroup>
                            <Label>Product Name *</Label>
                            <Input name="name" placeholder="Product name" value={form.name} onChange={handleChange} />
                        </InputGroup>
                        <InputGroup>
                            <Label>Price *</Label>
                            <Input name="price" type="number" step="0.01" placeholder="29.99" value={form.price} onChange={handleChange} />
                        </InputGroup>
                        <InputGroup>
                            <Label>Category</Label>
                            <Select name="category" value={form.category} onChange={handleChange}>
                                {CATEGORIES.map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </Select>
                        </InputGroup>
                        <InputGroup>
                            <Label>Description</Label>
                            <TextArea name="description" placeholder="Product description" value={form.description} onChange={handleChange} />
                        </InputGroup>
                        <InputGroup>
                            <Label>Image URL</Label>
                            <Input name="image" placeholder="https://..." value={form.image} onChange={handleChange} />
                        </InputGroup>
                        <ModalActions>
                            <CancelBtn onClick={() => setShowModal(false)}>Cancel</CancelBtn>
                            <SaveBtn onClick={handleSave} disabled={saving}>
                                {saving ? "Saving..." : "Save"}
                            </SaveBtn>
                        </ModalActions>
                    </Modal>
                </Overlay>
            )}
        </>
    );
};

export default AdminProducts;
