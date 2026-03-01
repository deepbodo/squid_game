import React, { useState } from "react";
import styled from "styled-components";
import { useCart } from "../../CartContext";
import { useAuth } from "../../AuthContext";
import { useHistory, Link } from "react-router-dom";

const Container = styled.div`
  min-height: 100vh;
  padding: 40px;
  padding-top: 120px;
  max-width: 1000px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #fff;
  font-size: 42px;
  font-family: "Donegal One", serif;
  margin-bottom: 40px;
  text-shadow: 0 0 20px rgba(234, 76, 137, 0.4);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 30px;
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

const FormSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(219, 112, 147, 0.15);
  border-radius: 16px;
  padding: 30px;
`;

const SectionTitle = styled.h2`
  color: #ea4c89;
  font-size: 20px;
  margin-bottom: 20px;
  letter-spacing: 1px;
`;

const InputGroup = styled.div`
  margin-bottom: 18px;
`;

const Label = styled.label`
  display: block;
  color: rgba(255, 255, 255, 0.7);
  font-size: 13px;
  margin-bottom: 6px;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const Input = styled.input`
  width: 100%;
  padding: 13px 16px;
  border-radius: 10px;
  border: 2px solid rgba(219, 112, 147, 0.2);
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  font-size: 15px;
  outline: none;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
  &:focus { border-color: #ea4c89; }
  &::placeholder { color: rgba(255, 255, 255, 0.3); }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
`;

const Summary = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(219, 112, 147, 0.2);
  border-radius: 16px;
  padding: 30px;
  height: fit-content;
  position: sticky;
  top: 100px;
`;

const ItemRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

const ItemImg = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
  border-radius: 8px;
  background: linear-gradient(to bottom, #471f3e, #1f243a);
  padding: 4px;
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.div`
  color: #fff;
  font-size: 14px;
  margin-bottom: 2px;
`;

const ItemQty = styled.div`
  color: rgba(255, 255, 255, 0.4);
  font-size: 12px;
`;

const ItemPrice = styled.div`
  color: #ea4c89;
  font-weight: bold;
  font-size: 15px;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 15px;
`;

const TotalRow = styled(SummaryRow)`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  border-top: 1px solid rgba(219, 112, 147, 0.2);
  padding-top: 15px;
  margin-top: 10px;
  margin-bottom: 0;
`;

const TotalPrice = styled.span`
  color: #ea4c89;
`;

const PlaceOrderBtn = styled.button`
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #ea4c89, #d16ba5);
  border: none;
  border-radius: 12px;
  color: #fff;
  font-size: 17px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;
  transition: all 0.3s ease;
  letter-spacing: 1px;
  box-shadow: 0 4px 20px rgba(234, 76, 137, 0.4);
  &:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(234, 76, 137, 0.6); }
  &:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
`;

const ErrorMsg = styled.div`
  background: rgba(255, 68, 68, 0.1);
  border: 1px solid rgba(255, 68, 68, 0.3);
  color: #ff6b6b;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 14px;
  margin-bottom: 20px;
`;

const LoginPrompt = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 18px;
  a { color: #ea4c89; text-decoration: none; font-weight: bold; }
`;

const SuccessBox = styled.div`
  text-align: center;
  padding: 60px 30px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(76, 234, 137, 0.3);
  border-radius: 20px;
`;

const SuccessIcon = styled.div`
  font-size: 64px;
  margin-bottom: 20px;
`;

const SuccessTitle = styled.h2`
  color: #4cea89;
  font-size: 28px;
  margin-bottom: 10px;
`;

const SuccessText = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 16px;
  margin-bottom: 5px;
`;

const OrderId = styled.p`
  color: #ea4c89;
  font-size: 14px;
  font-family: monospace;
  margin-bottom: 25px;
`;

const ContinueLink = styled(Link)`
  display: inline-block;
  padding: 14px 30px;
  background: linear-gradient(135deg, #ea4c89, #d16ba5);
  border-radius: 12px;
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;
  &:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(234, 76, 137, 0.6); }
`;

const CheckoutPage = () => {
    const { currentUser } = useAuth();
    const { cartItems, cartTotal, placeOrder } = useCart();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [orderSuccess, setOrderSuccess] = useState(null);
    const [form, setForm] = useState({
        fullName: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
    });

    if (!currentUser) {
        return (
            <Container>
                <Title>Checkout</Title>
                <LoginPrompt>
                    Please <Link to="/login">sign in</Link> to proceed with checkout.
                </LoginPrompt>
            </Container>
        );
    }

    if (cartItems.length === 0 && !orderSuccess) {
        return (
            <Container>
                <Title>Checkout</Title>
                <LoginPrompt>
                    Your cart is empty. <Link to="/store">Browse Store</Link>
                </LoginPrompt>
            </Container>
        );
    }

    if (orderSuccess) {
        return (
            <Container>
                <SuccessBox>
                    <SuccessIcon>&#10003;</SuccessIcon>
                    <SuccessTitle>Order Placed Successfully!</SuccessTitle>
                    <SuccessText>Thank you for your purchase.</SuccessText>
                    <SuccessText>A confirmation has been sent to {currentUser.email}</SuccessText>
                    <OrderId>Order ID: {orderSuccess.id}</OrderId>
                    <ContinueLink to="/orders">View My Orders</ContinueLink>
                </SuccessBox>
            </Container>
        );
    }

    const shipping = cartTotal >= 50 ? 0 : 5.99;
    const total = cartTotal + shipping;

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (!form.fullName || !form.phone || !form.address || !form.city || !form.zip) {
            return setError("Please fill in all required fields.");
        }
        setLoading(true);
        try {
            const order = await placeOrder(form);
            setOrderSuccess(order);
        } catch (err) {
            setError("Failed to place order. Please try again.");
        }
        setLoading(false);
    };

    return (
        <Container>
            <Title>Checkout</Title>
            {error && <ErrorMsg>{error}</ErrorMsg>}
            <form onSubmit={handleSubmit}>
                <Grid>
                    <FormSection>
                        <SectionTitle>Shipping Information</SectionTitle>
                        <InputGroup>
                            <Label>Full Name *</Label>
                            <Input name="fullName" placeholder="Your full name" value={form.fullName} onChange={handleChange} required />
                        </InputGroup>
                        <InputGroup>
                            <Label>Phone Number *</Label>
                            <Input name="phone" type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={handleChange} required />
                        </InputGroup>
                        <InputGroup>
                            <Label>Address *</Label>
                            <Input name="address" placeholder="Street address" value={form.address} onChange={handleChange} required />
                        </InputGroup>
                        <Row>
                            <InputGroup>
                                <Label>City *</Label>
                                <Input name="city" placeholder="City" value={form.city} onChange={handleChange} required />
                            </InputGroup>
                            <InputGroup>
                                <Label>State</Label>
                                <Input name="state" placeholder="State" value={form.state} onChange={handleChange} />
                            </InputGroup>
                        </Row>
                        <InputGroup>
                            <Label>ZIP Code *</Label>
                            <Input name="zip" placeholder="ZIP / Postal code" value={form.zip} onChange={handleChange} required />
                        </InputGroup>
                    </FormSection>

                    <Summary>
                        <SectionTitle>Order Summary</SectionTitle>
                        {cartItems.map((item) => (
                            <ItemRow key={item.id}>
                                <ItemImg src={item.image} alt={item.name} />
                                <ItemInfo>
                                    <ItemName>{item.name}</ItemName>
                                    <ItemQty>Qty: {item.quantity}</ItemQty>
                                </ItemInfo>
                                <ItemPrice>${(item.price * item.quantity).toFixed(2)}</ItemPrice>
                            </ItemRow>
                        ))}
                        <SummaryRow>
                            <span>Subtotal</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </SummaryRow>
                        <SummaryRow>
                            <span>Shipping</span>
                            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                        </SummaryRow>
                        <TotalRow>
                            <span>Total</span>
                            <TotalPrice>${total.toFixed(2)}</TotalPrice>
                        </TotalRow>
                        <PlaceOrderBtn type="submit" disabled={loading}>
                            {loading ? "Placing Order..." : "Place Order"}
                        </PlaceOrderBtn>
                    </Summary>
                </Grid>
            </form>
        </Container>
    );
};

export default CheckoutPage;
