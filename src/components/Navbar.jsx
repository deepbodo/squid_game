import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "./image/logo.png";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { useCart } from "../CartContext";

const Container = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  transition: box-shadow 0.3s ease, background 0.3s ease;
  background: ${(props) =>
    props.scrolled ? "rgba(13, 19, 40, 0.95)" : "transparent"};
  backdrop-filter: ${(props) => (props.scrolled ? "blur(12px)" : "none")};
  -webkit-backdrop-filter: ${(props) =>
    props.scrolled ? "blur(12px)" : "none"};
  box-shadow: ${(props) =>
    props.scrolled ? "0 4px 30px rgba(0, 0, 0, 0.4)" : "none"};
`;

const Wrapper = styled.div`
  display: flex;
  background: transparent;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  position: relative;
`;

const Menu = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 1;
`;

const NavItem = styled.li`
  position: relative;
`;

const NavLink = styled(Link)`
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => (props.active ? "#ea4c89" : "white")};
  text-decoration: none;
  padding: 20px 22px;
  display: inline-block;
  cursor: pointer;
  transition: color 0.3s ease, transform 0.3s ease;
  position: relative;

  &:hover {
    color: palevioletred;
    transform: scale(1.05);
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%) scaleX(${(props) => (props.active ? 1 : 0)});
    width: 60%;
    height: 3px;
    background: #ea4c89;
    border-radius: 2px;
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: translateX(-50%) scaleX(1);
  }
`;

const Logo = styled.img`
  width: 60px;
  height: auto;
  margin: 0 20px;
  transition: transform 0.3s ease;

  &:hover {
    transform: rotate(10deg) scale(1.05);
  }
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
`;

const CartBadge = styled.span`
  position: absolute;
  top: 8px;
  right: 8px;
  background: #ea4c89;
  color: #fff;
  font-size: 11px;
  font-weight: bold;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AuthBtn = styled(Link)`
  padding: 8px 20px;
  border-radius: 20px;
  border: 2px solid #ea4c89;
  background: ${(props) =>
    props.primary ? "#ea4c89" : "transparent"};
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-block;

  &:hover {
    background: #ea4c89;
    transform: translateY(-2px);
  }
`;

const UserBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fff;
  font-size: 14px;
`;

const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ea4c89, #d16ba5);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
`;

const LogoutBtn = styled.button`
  padding: 6px 16px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: transparent;
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #ea4c89;
    color: #fff;
  }
`;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <Container scrolled={scrolled}>
      <Wrapper>
        <Menu>
          <NavItem>
            <NavLink to="/" active={isActive("/") ? 1 : 0}>
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/store" active={isActive("/store") ? 1 : 0}>
              Store
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/blog" active={isActive("/blog") ? 1 : 0}>
              Blog
            </NavLink>
          </NavItem>

          <NavItem>
            <LogoLink to="/">
              <Logo src={logo} />
            </LogoLink>
          </NavItem>

          <NavItem>
            <NavLink to="/about" active={isActive("/about") ? 1 : 0}>
              About Us
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/cart" active={isActive("/cart") ? 1 : 0}>
              Cart
              {cartCount > 0 && <CartBadge>{cartCount}</CartBadge>}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/contact" active={isActive("/contact") ? 1 : 0}>
              Contact
            </NavLink>
          </NavItem>
        </Menu>

        <RightSection>
          {currentUser ? (
            <UserBadge>
              <UserAvatar>
                {currentUser.email.charAt(0).toUpperCase()}
              </UserAvatar>
              <LogoutBtn onClick={() => logout()}>Logout</LogoutBtn>
            </UserBadge>
          ) : (
            <>
              <AuthBtn to="/login">Login</AuthBtn>
              <AuthBtn to="/signup" primary={1}>
                Sign Up
              </AuthBtn>
            </>
          )}
        </RightSection>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
