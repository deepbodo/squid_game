import React from "react";
import styled from "styled-components";
import logo from "./image/logo.png";

const Container = styled.div`
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  display: flex;

  background: trasparent;
`;

const Menu = styled.ul`
  display: flex;
  width: 100%;
  align-items: center;
  padding-left: 13%;
`;
const LeftMenuItems = styled.li`
  font-size: 20px;
  list-style: none;
  font-weight: bold;
  color: white;
  display: inline;
  margin-right: 40px;
  position: relative;

  padding-left: 50px;
  padding-right: 30px;
  align-items: right;
  cursor: pointer;
  &:hover,
  &:focus {
    color: palevioletred;
  }
  &:active {
    color: red;
  }
  &:hover {
    transform: scale(1.7);
  }
`;
const Logo = styled.img`
  width: 10%;

  align-items: center;
  justify-content: center;
`;
const Right = styled.div`
  width: 30;
`;
const Navbar = () => {
  return (
    <Container>
      <Wrapper>
        <Menu>
          <LeftMenuItems></LeftMenuItems>
          <LeftMenuItems>Home</LeftMenuItems>
          <LeftMenuItems>Store</LeftMenuItems>
          <LeftMenuItems>Blog</LeftMenuItems>
          <Logo src={logo} />
          <LeftMenuItems>About Us</LeftMenuItems>
          <LeftMenuItems>Cart</LeftMenuItems>
          <LeftMenuItems>Contact</LeftMenuItems>
        </Menu>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
