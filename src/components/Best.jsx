import React from "react";
import styled from "styled-components";
import Brest from "./image/best.png";
import SlideBar from "./SlideBar";
import SliderItem1 from "./SliderItem1";
import SliderItem2 from "./SliderItem2";
import SliderItem3 from "./SliderItem3";
import SliderItem4 from "./SliderItem4";
import SliderItem5 from "./SliderItem5";

const Container = styled.div`
  height: auto;
`;
const Header = styled.img`
  width: 50%;
  margin-left: 60px;
  margin-top: 40px;
  &:hover {
    transform: scale(0.9);
  }
  margin-bottom: 30px;
`;
const Box = styled.div`
  width: 100%;
  display: flex;
  margin-top: 50px;
  align-items: center;
  justify-content: center;
`;

const Best = () => {
  return (
    <Container>
      <Header src={Brest} />
      <Box>
        <SliderItem1 />
        <SliderItem2 />
        <SliderItem3 />
        <SliderItem4 />
        <SliderItem5 />
      </Box>
    </Container>
  );
};

export default Best;
