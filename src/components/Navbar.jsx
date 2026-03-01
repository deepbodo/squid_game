import React, { useState, useEffect, useRef } from "react";
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
  white-space: nowrap;

  &:hover {
    background: #ea4c89;
    transform: translateY(-2px);
  }
`;

/* User Avatar Dropdown */
const AvatarWrapper = styled.div`
  position: relative;
`;

const UserAvatar = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ea4c89, #d16ba5);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 15px rgba(234, 76, 137, 0.5);
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  width: 200px;
  background: rgba(13, 19, 40, 0.97);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(219, 112, 147, 0.25);
  border-radius: 14px;
  padding: 10px 0;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  opacity: ${(p) => (p.open ? 1 : 0)};
  visibility: ${(p) => (p.open ? "visible" : "hidden")};
  transform: translateY(${(p) => (p.open ? "0" : "-10px")});
  transition: all 0.25s ease;
  z-index: 200;
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 10px 20px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(234, 76, 137, 0.1);
    color: #ea4c89;
  }
`;

const DropdownButton = styled.button`
  display: block;
  width: 100%;
  padding: 10px 20px;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 14px;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(234, 76, 137, 0.1);
    color: #ea4c89;
  }
`;

const Divider = styled.div`
  height: 1px;
  background: rgba(219, 112, 147, 0.15);
  margin: 6px 0;
`;

const UserEmail = styled.div`
  padding: 8px 20px 10px;
  color: rgba(255, 255, 255, 0.4);
  font-size: 12px;
  border-bottom: 1px solid rgba(219, 112, 147, 0.15);
  margin-bottom: 4px;
  word-break: break-all;
`;

const AdminBadge = styled.span`
  background: rgba(234, 76, 137, 0.2);
  color: #ea4c89;
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 10px;
  margin-left: 6px;
  font-weight: bold;
  letter-spacing: 1px;
`;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const { currentUser, isAdmin, logout } = useAuth();
  const { cartCount } = useCart();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setDropdownOpen(false);
  }, [location]);

  const isActive = (path) => location.pathname === path;

  return (
    <Container scrolled={scrolled}>
      <Wrapper>
        <Menu>
          <NavItem>
            <NavLink to="/" active={isActive("/") ? 1 : 0}>Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/store" active={isActive("/store") ? 1 : 0}>Store</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/blog" active={isActive("/blog") ? 1 : 0}>Blog</NavLink>
          </NavItem>
          <NavItem>
            <LogoLink to="/">
              <Logo src={logo} />
            </LogoLink>
          </NavItem>
          <NavItem>
            <NavLink to="/about" active={isActive("/about") ? 1 : 0}>About Us</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/cart" active={isActive("/cart") ? 1 : 0}>
              Cart
              {cartCount > 0 && <CartBadge>{cartCount}</CartBadge>}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/contact" active={isActive("/contact") ? 1 : 0}>Contact</NavLink>
          </NavItem>
        </Menu>

        <RightSection>
          {currentUser ? (
            <AvatarWrapper ref={dropdownRef}>
              <UserAvatar onClick={() => setDropdownOpen(!dropdownOpen)}>
                {currentUser.email.charAt(0).toUpperCase()}
              </UserAvatar>
              <Dropdown open={dropdownOpen}>
                <UserEmail>
                  {currentUser.email}
                  {isAdmin && <AdminBadge>ADMIN</AdminBadge>}
                </UserEmail>
                <DropdownItem to="/orders">My Orders</DropdownItem>
                {isAdmin && (
                  <DropdownItem to="/admin">Admin Dashboard</DropdownItem>
                )}
                <Divider />
                <DropdownButton onClick={() => { logout(); setDropdownOpen(false); }}>
                  Logout
                </DropdownButton>
              </Dropdown>
            </AvatarWrapper>
          ) : (
            <>
              <AuthBtn to="/login">Login</AuthBtn>
              <AuthBtn to="/signup" primary={1}>Sign Up</AuthBtn>
            </>
          )}
        </RightSection>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
