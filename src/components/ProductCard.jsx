import React from "react";
import styled from "styled-components";
import { useCart } from "../CartContext";
import { Link } from "react-router-dom";

const Card = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(219, 112, 147, 0.2);
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(234, 76, 137, 0.25);
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 220px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    to bottom,
    #471f3e,
    #3c2140,
    #322340,
    #28243e,
    #1f243a
  );
  padding: 15px;
`;

const ProductImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: transform 0.4s ease;

  ${Card}:hover & {
    transform: scale(1.08);
  }
`;

const Info = styled.div`
  padding: 20px;
`;

const Name = styled.h3`
  color: #fff;
  font-size: 16px;
  margin: 0 0 8px;
  font-weight: 600;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
`;

const Price = styled.span`
  color: #ea4c89;
  font-size: 20px;
  font-weight: bold;
`;

const Rating = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
`;

const AddBtn = styled.button`
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #ea4c89, #d16ba5);
  border: none;
  border-radius: 0 0 16px 16px;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.3s ease;
  letter-spacing: 1px;

  &:hover {
    opacity: 0.85;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <Card>
            <StyledLink to={`/product/${product.id}`}>
                <ImageWrapper>
                    <ProductImage src={product.image} alt={product.name} />
                </ImageWrapper>
                <Info>
                    <Name>{product.name}</Name>
                    <Rating>
                        {"★".repeat(Math.floor(product.rating))} ({product.reviews})
                    </Rating>
                    <PriceRow>
                        <Price>${product.price.toFixed(2)}</Price>
                    </PriceRow>
                </Info>
            </StyledLink>
            <AddBtn
                onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                }}
            >
                ADD TO CART
            </AddBtn>
        </Card>
    );
};

export default ProductCard;
