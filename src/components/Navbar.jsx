import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "./image/logo.png";

const Container = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  transition: box-shadow 0.3s ease, background 0.3s ease;
  background: ${(props) =>
    props.scrolled
      ? "rgba(13, 19, 40, 0.95)"
      : "transparent"};
  backdrop-filter: ${(props) => (props.scrolled ? "blur(12px)" : "none")};
  -webkit-backdrop-filter: ${(props) =>
    props.scrolled ? "blur(12px)" : "none"};
  box-shadow: ${(props) =>
    props.scrolled
      ? "0 4px 30px rgba(0, 0, 0, 0.4)"
      : "none"};
`;
const Wrapper = styled.div`
  display: flex;
  background: transparent;
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
  transition: color 0.3s ease, transform 0.3s ease;

  &:hover,
  &:focus {
    color: palevioletred;
  }
  &:active {
    color: red;
  }
  &:hover {
    transform: scale(1.1);
  }
`;
const Logo = styled.img`
  width: 10%;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: rotate(10deg) scale(1.05);
  }
`;
const Right = styled.div`
  width: 30;
`;
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Container scrolled={scrolled}>
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
