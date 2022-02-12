import React from "react";
import styled from "styled-components";
import Email from "./Email";
import Art from "./image/art.jpg";
import Symbol from "./image/symbolic.png";
const Container = styled.div`
  height: 1000px;
  margin-top: 200px;
  align-items: center;
`;
const Box = styled.div`
  height: 900px;
  margin-left: 40px;
  margin-right: 40px;
  background-image: linear-gradient(
    to right top,
    #d16ba5,
    #c777b9,
    #ba83ca,
    #aa8fd8,
    #9a9ae1,
    #8aa7ec,
    #79b3f4,
    #69bff8,
    #52cffe,
    #41dfff,
    #46eefa,
    #5ffbf1
  );
  display: flex;
`;
const Left = styled.div`
  height: 100%;
  width: 50%;
`;
const Image = styled.img`
  margin-left: 60px;
  margin-top: 40px;
  height: 90%;
`;
const Right = styled.div`
  width: 50%;
  align-items: center;
  justify-content: center;
`;
const Symb = styled.img`
  width: 50%;
  margin-left: 110px;
  margin-top: 50px;
  margin-bottom: -40px;
`;
const Header = styled.h2`
  color: #ffff;
  font-size: 80px;
  width: 550px;
  font-family: Donegal One, serif;
  margin-left: 100px;
  margin-bottom: -5px;
`;
const Para = styled.p`
  margin-left: 100px;
  width: 550px;
  color: #ffff;
  font-size: 20px;
  font-weight: bold;
`;
const Elu = styled.div`
  width: 800px;
  margin-top: 80px;
  margin-left: 180px;
`;

const Epic = () => {
  return (
    <Container>
      <Box>
        <Left>
          <Image src={Art} />
        </Left>
        <Right>
          <Symb src={Symbol} />
          <Header>Ready For The Next Game!</Header>
          <Para>
            Stay Tuned We Are Live Soon.Very Soon You Will Find Us On PlayStore.
          </Para>
          <Elu>
            <Email />
          </Elu>
        </Right>
      </Box>
    </Container>
  );
};

export default Epic;
