import React from "react";
import styled from "styled-components";
import { useParams, useHistory } from "react-router-dom";
import products from "../../products";
import { useCart } from "../../CartContext";
import ProductCard from "../ProductCard";

const Container = styled.div`
  min-height: 100vh;
  padding: 40px;
  padding-top: 120px;
  max-width: 1200px;
  margin: 0 auto;
`;

const BackBtn = styled.button`
  background: transparent;
  border: 2px solid rgba(219, 112, 147, 0.3);
  color: rgba(255, 255, 255, 0.7);
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 30px;
  transition: all 0.3s ease;

  &:hover {
    border-color: #ea4c89;
    color: #fff;
  }
`;

const ProductSection = styled.div`
  display: flex;
  gap: 50px;
  margin-bottom: 60px;
  flex-wrap: wrap;
`;

const ImageSection = styled.div`
  flex: 1;
  min-width: 300px;
  max-width: 500px;
  background: linear-gradient(
    to bottom,
    #471f3e,
    #3c2140,
    #322340,
    #28243e,
    #1f243a
  );
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

const ProductImage = styled.img`
  max-width: 100%;
  max-height: 400px;
  object-fit: contain;
`;

const InfoSection = styled.div`
  flex: 1;
  min-width: 300px;
`;

const Name = styled.h1`
  color: #fff;
  font-size: 36px;
  margin-bottom: 10px;
  font-family: "Donegal One", serif;
`;

const Rating = styled.div`
  color: #ea4c89;
  font-size: 18px;
  margin-bottom: 20px;
`;

const ReviewCount = styled.span`
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  margin-left: 10px;
`;

const Price = styled.div`
  color: #ea4c89;
  font-size: 42px;
  font-weight: bold;
  margin-bottom: 25px;
`;

const Description = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 16px;
  line-height: 1.8;
  margin-bottom: 30px;
`;

const StockBadge = styled.span`
  display: inline-block;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: bold;
  background: rgba(76, 234, 137, 0.15);
  color: #4cea89;
  border: 1px solid rgba(76, 234, 137, 0.3);
  margin-bottom: 25px;
`;

const AddBtn = styled.button`
  padding: 16px 40px;
  background: linear-gradient(135deg, #ea4c89, #d16ba5);
  border: none;
  border-radius: 12px;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 1px;
  box-shadow: 0 4px 20px rgba(234, 76, 137, 0.4);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(234, 76, 137, 0.6);
  }
`;

const Category = styled.span`
  display: inline-block;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  background: rgba(234, 76, 137, 0.1);
  color: #ea4c89;
  border: 1px solid rgba(234, 76, 137, 0.2);
  margin-bottom: 15px;
`;

const RelatedTitle = styled.h2`
  color: #fff;
  font-size: 28px;
  margin-bottom: 30px;
  font-family: "Donegal One", serif;
`;

const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 25px;
`;

const ProductDetail = () => {
    const { id } = useParams();
    const history = useHistory();
    const { addToCart } = useCart();

    const product = products.find((p) => p.id === id);

    if (!product) {
        return (
            <Container>
                <Name>Product not found</Name>
                <BackBtn onClick={() => history.push("/store")}>
                    Back to Store
                </BackBtn>
            </Container>
        );
    }

    const related = products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    return (
        <Container>
            <BackBtn onClick={() => history.goBack()}>← Back</BackBtn>

            <ProductSection>
                <ImageSection>
                    <ProductImage src={product.image} alt={product.name} />
                </ImageSection>

                <InfoSection>
                    <Category>{product.category}</Category>
                    <Name>{product.name}</Name>
                    <Rating>
                        {"★".repeat(Math.floor(product.rating))}
                        {"☆".repeat(5 - Math.floor(product.rating))}
                        <ReviewCount>{product.reviews} reviews</ReviewCount>
                    </Rating>
                    <Price>${product.price.toFixed(2)}</Price>
                    <StockBadge>In Stock</StockBadge>
                    <Description>{product.description}</Description>
                    <AddBtn onClick={() => addToCart(product)}>Add to Cart</AddBtn>
                </InfoSection>
            </ProductSection>

            {related.length > 0 && (
                <>
                    <RelatedTitle>You May Also Like</RelatedTitle>
                    <RelatedGrid>
                        {related.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </RelatedGrid>
                </>
            )}
        </Container>
    );
};

export default ProductDetail;
