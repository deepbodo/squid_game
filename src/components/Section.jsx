import React from "react";
import styled from "styled-components";
import Card from "./Card";
import Card2 from "./Card2";
import Card3 from "./Card3";

const Container = styled.div`
  height: 100%;
`;
const Box = styled.div`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 0.5em 1em;
  padding: 0.25em 1em;
  height: auto;
  text-align: center;
  justify-content: center;
`;
const Features = styled.div`
  width: 100%;
  display: flex;
  margin-top: 50px;
`;
const Card1 = styled.div`
  background-color: palevioletred;
  margin-: 80px;
  width: 500px;
  border-radius: 30px;
  height: 700px;
  margin-bottom: 60px;
`;

const Title = styled.h1``;
const Section = () => {
  return (
    <Container>
      <Box>
        <Features>
          <Card />
          <Card2 />
          <Card3 />
        </Features>
      </Box>
    </Container>
  );
};

export default Section;
