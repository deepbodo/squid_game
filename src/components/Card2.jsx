import React from "react";
import styled from "styled-components";
import Refresh from "./image/refresh.png";
const Container = styled.div`
  background: rgba(255, 255, 255, -180);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  margin-left: 100px;
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
  font-size: 23px;
  letter-spacing: 5px;
  text-align: center;
`;

const Card2 = () => {
  return (
    <Container>
      <C src={Refresh} />
      <Title>30 Day-Return</Title>
      <Text>
        <Details>
          When returning the order we do a refund of the order.If you wish to
          exchange for another item or color.
        </Details>
      </Text>
    </Container>
  );
};

export default Card2;
