import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
    collection,
    getDocs,
    doc,
    updateDoc,
    orderBy,
    query,
} from "firebase/firestore";
import { db } from "../../firebase";

const OrderCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(219, 112, 147, 0.15);
  border-radius: 14px;
  padding: 22px;
  margin-bottom: 16px;
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 14px;
`;

const OrderMeta = styled.div``;

const OrderIdText = styled.div`
  color: #ea4c89;
  font-family: monospace;
  font-size: 14px;
  font-weight: bold;
`;

const OrderEmail = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
  margin-top: 2px;
`;

const OrderDate = styled.div`
  color: rgba(255, 255, 255, 0.4);
  font-size: 12px;
  margin-top: 2px;
`;

const StatusSelect = styled.select`
  padding: 8px 16px;
  border-radius: 8px;
  border: 2px solid rgba(219, 112, 147, 0.3);
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  outline: none;
  &:focus { border-color: #ea4c89; }
  option { background: #1a1a2e; color: #fff; }
`;

const ItemsList = styled.div`
  margin-bottom: 12px;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  border-top: 1px solid rgba(219, 112, 147, 0.1);
`;

const ShipInfo = styled.div`
  color: rgba(255, 255, 255, 0.5);
  font-size: 13px;
  line-height: 1.5;
`;

const Total = styled.div`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  span { color: #ea4c89; }
`;

const LoadingText = styled.p`
  color: rgba(255, 255, 255, 0.5);
  font-size: 16px;
  text-align: center;
  padding: 40px;
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
  margin-bottom: 25px;
`;

const StatCard = styled.div`
  background: rgba(234, 76, 137, 0.08);
  border: 1px solid rgba(234, 76, 137, 0.2);
  border-radius: 12px;
  padding: 16px;
  text-align: center;
`;

const StatValue = styled.div`
  color: #ea4c89;
  font-size: 28px;
  font-weight: bold;
`;

const StatLabel = styled.div`
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 4px;
`;

const STATUSES = ["Processing", "In Transit", "Delivered", "Cancelled"];

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
            const snap = await getDocs(q);
            setOrders(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        } catch (err) {
            console.error("Error loading orders:", err);
        }
        setLoading(false);
    };

    const updateStatus = async (orderId, newStatus) => {
        try {
            await updateDoc(doc(db, "orders", orderId), { status: newStatus });
            setOrders((prev) =>
                prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
            );
        } catch (err) {
            alert("Failed to update status.");
        }
    };

    const formatDate = (ts) => {
        if (!ts) return "";
        const d = ts.toDate ? ts.toDate() : new Date(ts);
        return d.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    if (loading) return <LoadingText>Loading orders...</LoadingText>;

    const stats = {
        total: orders.length,
        processing: orders.filter((o) => o.status === "Processing").length,
        inTransit: orders.filter((o) => o.status === "In Transit").length,
        delivered: orders.filter((o) => o.status === "Delivered").length,
    };

    return (
        <>
            <Stats>
                <StatCard>
                    <StatValue>{stats.total}</StatValue>
                    <StatLabel>Total</StatLabel>
                </StatCard>
                <StatCard>
                    <StatValue>{stats.processing}</StatValue>
                    <StatLabel>Processing</StatLabel>
                </StatCard>
                <StatCard>
                    <StatValue>{stats.inTransit}</StatValue>
                    <StatLabel>In Transit</StatLabel>
                </StatCard>
                <StatCard>
                    <StatValue>{stats.delivered}</StatValue>
                    <StatLabel>Delivered</StatLabel>
                </StatCard>
            </Stats>

            {orders.length === 0 ? (
                <LoadingText>No orders yet.</LoadingText>
            ) : (
                orders.map((order) => (
                    <OrderCard key={order.id}>
                        <OrderHeader>
                            <OrderMeta>
                                <OrderIdText>#{order.id.slice(0, 8).toUpperCase()}</OrderIdText>
                                <OrderEmail>{order.userEmail}</OrderEmail>
                                <OrderDate>{formatDate(order.createdAt)}</OrderDate>
                            </OrderMeta>
                            <StatusSelect
                                value={order.status}
                                onChange={(e) => updateStatus(order.id, e.target.value)}
                            >
                                {STATUSES.map((s) => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </StatusSelect>
                        </OrderHeader>

                        <ItemsList>
                            {order.items?.map((item, i) => (
                                <Item key={i}>
                                    <span>{item.name} x{item.quantity}</span>
                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </Item>
                            ))}
                        </ItemsList>

                        <Footer>
                            <ShipInfo>
                                {order.shippingInfo?.fullName}<br />
                                {order.shippingInfo?.address}, {order.shippingInfo?.city}<br />
                                {order.shippingInfo?.phone}
                            </ShipInfo>
                            <Total>
                                <span>${order.total?.toFixed(2)}</span>
                            </Total>
                        </Footer>
                    </OrderCard>
                ))
            )}
        </>
    );
};

export default AdminOrders;
