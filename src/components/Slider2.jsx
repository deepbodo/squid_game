import React from "react";
import Slider from "react-styled-carousel";
import styled from "styled-components";
import SliderItem1 from "./SliderItem1";
import SliderItem2 from "./SliderItem2";
const Container = styled.div`
  max-width: 950px;
  width: 100%;
  overflow: hidden;
  padding: 80px 0;
`;
const MainCard = styled.div`
 display: flex;
justify-content: space-evenly;
width: 200%;
transition: 1s;
}`;
const Cards = styled.div`
  width: calc(100% / 2 - 10px);
  display: flex;
  flex-wrap: wrap;
  margin: 0 20px;
  justify-content: space-between;
`;
const Slider2 = () => {
  return (
    <Container>
      <MainCard>
        <Cards>
          <SliderItem1 />
          <SliderItem1 />
          <SliderItem1 />
          <SliderItem2 />
        </Cards>
      </MainCard>
    </Container>
  );
};

export default Slider2;
