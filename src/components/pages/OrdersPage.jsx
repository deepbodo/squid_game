import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useCart } from "../../CartContext";
import { useAuth } from "../../AuthContext";
import { Link } from "react-router-dom";

const Container = styled.div`
  min-height: 100vh;
  padding: 40px;
  padding-top: 120px;
  max-width: 900px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #fff;
  font-size: 42px;
  font-family: "Donegal One", serif;
  margin-bottom: 10px;
  text-shadow: 0 0 20px rgba(234, 76, 137, 0.4);
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.5);
  font-size: 16px;
  margin-bottom: 40px;
`;

const OrderCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(219, 112, 147, 0.15);
  border-radius: 16px;
  padding: 25px;
  margin-bottom: 20px;
  transition: border-color 0.3s ease;
  &:hover { border-color: rgba(234, 76, 137, 0.4); }
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  flex-wrap: wrap;
  gap: 10px;
`;

const OrderId = styled.span`
  color: rgba(255, 255, 255, 0.5);
  font-size: 13px;
  font-family: monospace;
`;

const StatusBadge = styled.span`
  padding: 5px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
  background: ${(props) => {
        switch (props.status) {
            case "Processing": return "rgba(255, 193, 7, 0.15)";
            case "In Transit": return "rgba(33, 150, 243, 0.15)";
            case "Delivered": return "rgba(76, 234, 137, 0.15)";
            case "Cancelled": return "rgba(255, 68, 68, 0.15)";
            default: return "rgba(255, 255, 255, 0.1)";
        }
    }};
  color: ${(props) => {
        switch (props.status) {
            case "Processing": return "#ffc107";
            case "In Transit": return "#2196f3";
            case "Delivered": return "#4cea89";
            case "Cancelled": return "#ff4444";
            default: return "#fff";
        }
    }};
  border: 1px solid ${(props) => {
        switch (props.status) {
            case "Processing": return "rgba(255, 193, 7, 0.3)";
            case "In Transit": return "rgba(33, 150, 243, 0.3)";
            case "Delivered": return "rgba(76, 234, 137, 0.3)";
            case "Cancelled": return "rgba(255, 68, 68, 0.3)";
            default: return "rgba(255, 255, 255, 0.2)";
        }
    }};
`;

const OrderDate = styled.span`
  color: rgba(255, 255, 255, 0.4);
  font-size: 13px;
`;

const ItemsList = styled.div`
  margin-bottom: 15px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
`;

const ItemImg = styled.img`
  width: 45px;
  height: 45px;
  object-fit: contain;
  border-radius: 8px;
  background: linear-gradient(to bottom, #471f3e, #1f243a);
  padding: 4px;
`;

const ItemInfo = styled.div`
  flex: 1;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
`;

const ItemQty = styled.span`
  color: rgba(255, 255, 255, 0.4);
  font-size: 13px;
`;

const ItemPrice = styled.span`
  color: #ea4c89;
  font-weight: bold;
  font-size: 14px;
`;

const OrderFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid rgba(219, 112, 147, 0.15);
`;

const ShipTo = styled.div`
  color: rgba(255, 255, 255, 0.5);
  font-size: 13px;
`;

const OrderTotal = styled.div`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  span { color: #ea4c89; }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 18px;
`;

const ShopLink = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  padding: 14px 30px;
  background: linear-gradient(135deg, #ea4c89, #d16ba5);
  border-radius: 12px;
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;
  &:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(234, 76, 137, 0.6); }
`;

const LoginPrompt = styled.div`
  text-align: center;
  padding: 60px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 18px;
  a { color: #ea4c89; text-decoration: none; font-weight: bold; }
`;

const OrdersPage = () => {
    const { currentUser } = useAuth();
    const { getUserOrders } = useCart();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const data = await getUserOrders();
            setOrders(data);
            setLoading(false);
        };
        if (currentUser) load();
        else setLoading(false);
        // eslint-disable-next-line
    }, [currentUser]);

    if (!currentUser) {
        return (
            <Container>
                <Title>My Orders</Title>
                <LoginPrompt>
                    Please <Link to="/login">sign in</Link> to view your orders.
                </LoginPrompt>
            </Container>
        );
    }

    if (loading) {
        return (
            <Container>
                <Title>My Orders</Title>
                <Subtitle>Loading your orders...</Subtitle>
            </Container>
        );
    }

    if (orders.length === 0) {
        return (
            <Container>
                <Title>My Orders</Title>
                <EmptyState>
                    You haven't placed any orders yet.
                    <br />
                    <ShopLink to="/store">Start Shopping</ShopLink>
                </EmptyState>
            </Container>
        );
    }

    const formatDate = (ts) => {
        if (!ts) return "";
        const d = ts.toDate ? ts.toDate() : new Date(ts);
        return d.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <Container>
            <Title>My Orders</Title>
            <Subtitle>{orders.length} order{orders.length !== 1 ? "s" : ""}</Subtitle>

            {orders.map((order) => (
                <OrderCard key={order.id}>
                    <OrderHeader>
                        <div>
                            <OrderId>#{order.id.slice(0, 8).toUpperCase()}</OrderId>
                            <OrderDate> — {formatDate(order.createdAt)}</OrderDate>
                        </div>
                        <StatusBadge status={order.status}>{order.status}</StatusBadge>
                    </OrderHeader>

                    <ItemsList>
                        {order.items.map((item, i) => (
                            <Item key={i}>
                                <ItemImg src={item.image} alt={item.name} />
                                <ItemInfo>{item.name}</ItemInfo>
                                <ItemQty>x{item.quantity}</ItemQty>
                                <ItemPrice>${(item.price * item.quantity).toFixed(2)}</ItemPrice>
                            </Item>
                        ))}
                    </ItemsList>

                    <OrderFooter>
                        <ShipTo>
                            Ship to: {order.shippingInfo?.fullName}, {order.shippingInfo?.city}
                        </ShipTo>
                        <OrderTotal>
                            Total: <span>${order.total?.toFixed(2)}</span>
                        </OrderTotal>
                    </OrderFooter>
                </OrderCard>
            ))}
        </Container>
    );
};

export default OrdersPage;
