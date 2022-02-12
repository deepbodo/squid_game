import React from "react";
import styled from "styled-components";
import lofti from "./image/lefti.png";
import plr from "./image/imagee.png";
import kyoo from "./image/kyoo.png";
import sq from "./image/sq.png";
const Container = styled.div`
  display: flex;
  height: 100vh;
`;
const Left = styled.div`
  width: 20%;
`;
const Lefti = styled.img`
  position: relative;
  margin-left: 120px;
`;
const Leck = styled.img`
  margin-top: 350px;
`;
const Center = styled.div`
  width: 60%;
  margin-top: 100px;
  height: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Cimage = styled.img`
  align-items: center;
  margin-top: 100px;
  margin-bottom: 30px;
  justify-content: center;
  padding-left: 70px;
`;
const Spb = styled.button`
  height: 8%;
  width: 20%;
  margin-top: 30px;
  border-radius: 9px;
  background-color: #ea4c89;
  border-style: none;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial,
    sans-serif;
  font-size: 30px;
  font-weight: bold;
  line-height: 20px;
  list-style: none;
  outline: none;
  padding: 10px 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: color 100ms;
  vertical-align: baseline;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  &:hover {
    transform: scale(1.4);
  }
`;

const Right = styled.div`
  width: 20%;
`;
const Righti = styled.h2`
  margin-top: 50px;
  position: relative;
  color: #fff;
  font-family: Georgia, serif;
  font-size: 25px;
  margin-right: 20px;
  word-spacing: 2px;

  font-weight: normal;
  text-decoration: none;
  font-style: normal;
  font-variant: normal;
  text-transform: none;
  border-bottom: 5px solid #ea4c89;
  padding-bottom: 30px;
`;
const Reck = styled.img`
  margin-top: 400px;
`;

const BelowNav = () => {
  return (
    <Container>
      <Left>
        <Lefti src={lofti} />
        <Leck src={kyoo} />
      </Left>
      <Center>
        <Cimage src={sq}></Cimage>
        <Spb>Shop Now</Spb>
      </Center>
      <Right>
        <Righti>All the Squid Game merchandise available here.</Righti>
        <Reck src={plr} />
      </Right>
    </Container>
  );
};

export default BelowNav;
