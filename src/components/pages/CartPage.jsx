import React from "react";
import styled from "styled-components";
import { useCart } from "../../CartContext";
import { Link, useHistory } from "react-router-dom";

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

const CartItem = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(219, 112, 147, 0.15);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 16px;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: rgba(234, 76, 137, 0.4);
  }
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
  border-radius: 10px;
  background: linear-gradient(to bottom, #471f3e, #1f243a);
  padding: 8px;
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.h3`
  color: #fff;
  font-size: 16px;
  margin: 0 0 4px;
`;

const ItemPrice = styled.span`
  color: #ea4c89;
  font-size: 18px;
  font-weight: bold;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const QtyBtn = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid rgba(219, 112, 147, 0.3);
  background: transparent;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    border-color: #ea4c89;
    background: rgba(234, 76, 137, 0.2);
  }
`;

const Qty = styled.span`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  min-width: 24px;
  text-align: center;
`;

const RemoveBtn = styled.button`
  background: transparent;
  border: none;
  color: rgba(255, 100, 100, 0.7);
  cursor: pointer;
  font-size: 20px;
  padding: 5px;
  transition: color 0.3s ease;

  &:hover {
    color: #ff4444;
  }
`;

const Summary = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(219, 112, 147, 0.2);
  border-radius: 16px;
  padding: 30px;
  margin-top: 30px;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 16px;
`;

const TotalRow = styled(SummaryRow)`
  color: #fff;
  font-size: 22px;
  font-weight: bold;
  border-top: 1px solid rgba(219, 112, 147, 0.2);
  padding-top: 15px;
  margin-bottom: 0;
`;

const TotalPrice = styled.span`
  color: #ea4c89;
`;

const CheckoutBtn = styled.button`
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #ea4c89, #d16ba5);
  border: none;
  border-radius: 12px;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;
  transition: all 0.3s ease;
  letter-spacing: 1px;
  box-shadow: 0 4px 20px rgba(234, 76, 137, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(234, 76, 137, 0.6);
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 80px 20px;
`;

const EmptyText = styled.p`
  color: rgba(255, 255, 255, 0.5);
  font-size: 18px;
  margin-bottom: 30px;
`;

const ShopLink = styled(Link)`
  display: inline-block;
  padding: 14px 30px;
  background: linear-gradient(135deg, #ea4c89, #d16ba5);
  border-radius: 12px;
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  font-size: 16px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(234, 76, 137, 0.6);
  }
`;

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, cartCount } =
    useCart();
  const history = useHistory();

  if (cartItems.length === 0) {
    return (
      <Container>
        <Title>Your Cart</Title>
        <EmptyCart>
          <EmptyText>Your cart is empty. Start shopping!</EmptyText>
          <ShopLink to="/store">Browse Store</ShopLink>
        </EmptyCart>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Your Cart</Title>
      <Subtitle>{cartCount} item{cartCount !== 1 ? "s" : ""} in your cart</Subtitle>

      {cartItems.map((item) => (
        <CartItem key={item.id}>
          <ItemImage src={item.image} alt={item.name} />
          <ItemInfo>
            <ItemName>{item.name}</ItemName>
            <ItemPrice>${(item.price * item.quantity).toFixed(2)}</ItemPrice>
          </ItemInfo>
          <QuantityControls>
            <QtyBtn onClick={() => updateQuantity(item.id, item.quantity - 1)}>
              -
            </QtyBtn>
            <Qty>{item.quantity}</Qty>
            <QtyBtn onClick={() => updateQuantity(item.id, item.quantity + 1)}>
              +
            </QtyBtn>
          </QuantityControls>
          <RemoveBtn onClick={() => removeFromCart(item.id)}>✕</RemoveBtn>
        </CartItem>
      ))}

      <Summary>
        <SummaryRow>
          <span>Subtotal</span>
          <span>${cartTotal.toFixed(2)}</span>
        </SummaryRow>
        <SummaryRow>
          <span>Shipping</span>
          <span>{cartTotal >= 50 ? "Free" : "$5.99"}</span>
        </SummaryRow>
        <TotalRow>
          <span>Total</span>
          <TotalPrice>
            ${(cartTotal >= 50 ? cartTotal : cartTotal + 5.99).toFixed(2)}
          </TotalPrice>
        </TotalRow>
      </Summary>

      <CheckoutBtn onClick={() => history.push("/checkout")}>
        Proceed to Checkout
      </CheckoutBtn>
    </Container>
  );
};

export default CartPage;
