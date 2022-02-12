import React from "react";
import styled from "styled-components";
import Star from "./image/star.png";
const Container = styled.div`
  background: rgba(255, 255, 255, -170);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  margin-left: 100px;
  margin-right: 100px;
  width: 550px;
  border-radius: 30px;
  height: 560px;
  margin-bottom: 40px;
  align-items: center;
  justify-content: center;
  &:hover {
    transform: scale(1.1);
  }
`;
const C = styled.img`
  width: 13%;
  position: relative;
  margin-top: 120px;
  margin-bottom: 0px;
`;
const Title = styled.h2`
  text-decoration: underline;
  font-size: 25px;
`;
const Text = styled.div`
  align-items: center;
  margin-left: 60px;
  margin-right: 60px;

  justify-content: center;
`;
const Details = styled.p`
  font-family: "Lucida Console", "Courier New", monospace;
  font-size: 24px;
  letter-spacing: 5px;
  text-align: center;
`;
const Card3 = () => {
  return (
    <Container>
      <C src={Star} />
      <Title>Best-Quality</Title>
      <Text>
        <Details>
          We use the best quality material in our product.You can find the best
          quality product in our store.
        </Details>
      </Text>
    </Container>
  );
};

export default Card3;
