import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "../../AuthContext";
import { useHistory } from "react-router-dom";
import AdminProducts from "../admin/AdminProducts";
import AdminOrders from "../admin/AdminOrders";

const Container = styled.div`
  min-height: 100vh;
  padding: 40px;
  padding-top: 120px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #fff;
  font-size: 42px;
  font-family: "Donegal One", serif;
  margin-bottom: 30px;
  text-shadow: 0 0 20px rgba(234, 76, 137, 0.4);
`;

const Tabs = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 30px;
`;

const Tab = styled.button`
  padding: 12px 28px;
  border: 2px solid ${(p) => (p.active ? "#ea4c89" : "rgba(219,112,147,0.3)")};
  background: ${(p) => (p.active ? "#ea4c89" : "transparent")};
  color: #fff;
  font-size: 15px;
  font-weight: bold;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 1px;
  &:hover { border-color: #ea4c89; }
`;

const AccessDenied = styled.div`
  text-align: center;
  padding: 80px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 20px;
`;

const AdminDashboard = () => {
    const { currentUser, isAdmin } = useAuth();
    const history = useHistory();
    const [tab, setTab] = useState("orders");

    useEffect(() => {
        if (!currentUser) {
            history.push("/login");
        }
    }, [currentUser, history]);

    if (!isAdmin) {
        return (
            <Container>
                <AccessDenied>
                    Access Denied. Admin privileges required.
                </AccessDenied>
            </Container>
        );
    }

    return (
        <Container>
            <Title>Admin Dashboard</Title>
            <Tabs>
                <Tab active={tab === "orders"} onClick={() => setTab("orders")}>
                    Orders
                </Tab>
                <Tab active={tab === "products"} onClick={() => setTab("products")}>
                    Products
                </Tab>
            </Tabs>

            {tab === "orders" && <AdminOrders />}
            {tab === "products" && <AdminProducts />}
        </Container>
    );
};

export default AdminDashboard;
