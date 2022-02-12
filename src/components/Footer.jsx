import React from "react";
import styled from "styled-components";
import Ufo from "./image/ufo.png";
import Cr from "./image/cr.png";
import Lgt from "./image/light.png";
import Social from "./Social";

const Container = styled.div`
  height: 1000px;
  display: flex;
  background-image: linear-gradient(
    to right top,
    #0a3576,
    #633380,
    #9f2976,
    #ca2c5b,
    #df4d35
  );
`;
const Left = styled.div`
  width: 50%;
`;
const Right = styled.div`
  width: 20%;
`;

const Image = styled.img`
  transform: rotate(330deg);
  margin-top: 50px;
  margin-left: 390px;
  width: 40%;
`;
const Light = styled.img`
  margin-left: 520px;
  transform: rotate(10deg);
  margin-top: 10px;
  height: 80%;
  opacity: 0;
  transparency: 0.1;

  &:hover {
    opacity: 0.6;
  }
`;
const Crot = styled.img`
  margin-top: 440px;
  margin-left: -150px;
`;
const Flw = styled.div`
  widht: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Header = styled.h1`
  font-size: 80px;
  color: #ffff;
  margin-top: 180px;
  margin-left: -150px;
  margin-bottom: -230px;
`;
const Footer = () => {
  return (
    <Container>
      <Left>
        <Image src={Ufo} />
        <Light src={Lgt} />
      </Left>
      <Right>
        <Crot src={Cr} />
      </Right>
      <Flw>
        <Header>❝𝐅𝐨𝐥𝐥𝐨𝐰 𝐔𝐬 𝐎𝐧❞</Header>
        <Social />
      </Flw>
    </Container>
  );
};

export default Footer;
