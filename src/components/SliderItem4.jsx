import React from "react";
import styled from "styled-components";
import P456 from "./image/p456.png";
const Card = styled.div`
  position: relative;
  max-width: 300px;
  height: 370px;
  background-image: linear-gradient(
    to bottom,
    #471f3e,
    #3c2140,
    #322340,
    #28243e,
    #1f243a
  );
  margin: 30px 10px;
  padding: 20px 15px;

  display: flex;
  flex-direction: column;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
  transition: 0.3s ease-in-out;
  border-radius: 15px;
  &:hover {
    height: 530px;
  }
`;
const CardImage = styled.div`
  position: relative;
  width: 260px;
  height: 350px;
  align-items: center;
  justify-content: center;
  top: -20%;
  background-image: linear-gradient(
    to bottom,
    #471f3e,
    #3c2140,
    #322340,
    #28243e,
    #1f243a
  );
  left: 8px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
`;
const CardImg = styled.img`
  max-width: 100%;
  max-height: 400px;
  border-radius: 15px;
`;
const H3 = styled.h3`
  font-size: 25px;
  text-align: center;
  color: palevioletred;
`;
{
  /*성기훈*/
}
const Para = styled.p`
  opacity: 0.1;

  text-align: center;
  &:hover {
    display: block !important;
    opacity: 2;

    font-weight: bold !important;
    margin-top: 0px;
    color: palevioletred;
  }
`;
const SliderItem4 = () => {
  return (
    <Card>
      <CardImage>
        <CardImg src={P456} />
      </CardImage>
      <H3>456- 성기훈 Doll</H3>
      <Para>
        DIn publishing and graphic design, Lorem ipsum is a placeholder text
        commonly used to demonstrate the visual form of a document or a typeface
        without relying on meaningful content.
      </Para>
    </Card>
  );
};

export default SliderItem4;
