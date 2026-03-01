import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Ufo from "./image/ufo.png";
import Cr from "./image/cr.png";
import Lgt from "./image/light.png";
import Social from "./Social";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(
    to right top,
    #0a3576,
    #633380,
    #9f2976,
    #ca2c5b,
    #df4d35
  );
  position: relative;
  overflow: hidden;
  color: white;
`;

const VisualSection = styled.div`
  height: 700px;
  display: flex;
  position: relative;
`;

const Left = styled.div`
  width: 50%;
  position: relative;
`;
const Right = styled.div`
  width: 20%;
`;

const Image = styled.img`
  transform: rotate(330deg);
  margin-top: 50px;
  margin-left: 390px;
  width: 40%;
  position: absolute;
  z-index: 2;
`;
const Light = styled.img`
  margin-left: 520px;
  transform: rotate(10deg);
  margin-top: 10px;
  height: 80%;
  opacity: 0;
  position: absolute;
  z-index: 1;

  &:hover {
    opacity: 0.6;
  }
`;
const Crot = styled.img`
  margin-top: 440px;
  margin-left: -150px;
`;
const Flw = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Header = styled.h1`
  font-size: 80px;
  color: #ffff;
  margin-left: -50px;
  margin-bottom: 20px;
  text-shadow: 0 4px 10px rgba(0,0,0,0.3);
`;

const BottomSection = styled.div`
  padding: 0px 20px 20px;
  margin-top: -60px; /* Bring the text slightly closer to the visual elements if needed, or zero */
  z-index: 10;
  position: relative;
`;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 25px;
  color: #fff;
  position: relative;
  
  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -8px;
    width: 40px;
    height: 3px;
    background: #ea4c89;
    border-radius: 2px;
  }
`;

const FooterList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FooterLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 14px;
  transition: all 0.3s ease;
  
  &:hover {
    color: #fff;
    padding-left: 5px;
    text-shadow: 0 0 10px rgba(255,255,255,0.5);
  }
`;

const ContactItem = styled.div`
  display: flex;
  gap: 10px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  margin-bottom: 15px;
  align-items: center;
`;

const BottomBar = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const PaymentIcons = styled.div`
  display: flex;
  gap: 10px;
  
  span {
    background: rgba(255, 255, 255, 0.1);
    padding: 5px 10px;
    border-radius: 4px;
    font-weight: bold;
    font-size: 12px;
  }
`;

const Footer = () => {
  return (
    <Container>
      <VisualSection>
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
      </VisualSection>

      <BottomSection>
        <Wrapper>
          <Column>
            <FooterTitle>Quick Links</FooterTitle>
            <FooterList>
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/store">Our Store</FooterLink>
              <FooterLink to="/blog">Latest News</FooterLink>
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
            </FooterList>
          </Column>

          <Column>
            <FooterTitle>My Account</FooterTitle>
            <FooterList>
              <FooterLink to="/login">Sign In</FooterLink>
              <FooterLink to="/cart">View Cart</FooterLink>
              <FooterLink to="/orders">Order History</FooterLink>
              <FooterLink to="/orders">Track Order</FooterLink>
              <FooterLink to="/contact">Help & Support</FooterLink>
            </FooterList>
          </Column>

          <Column>
            <FooterTitle>Contact Info</FooterTitle>
            <ContactItem>
              <span>📍</span> 456 Player Lane, Private Island, South Korea
            </ContactItem>
            <ContactItem>
              <span>📞</span> +82 1-800-456-0000
            </ContactItem>
            <ContactItem>
              <span>✉️</span> frontdesk@squidgame.inc
            </ContactItem>
            <ContactItem>
              <span>⏰</span> Mon - Sun / 9:00 AM - 8:00 PM
            </ContactItem>
          </Column>
        </Wrapper>

        <BottomBar>
          <div>© {new Date().getFullYear()} Squid Game Store. All Rights Reserved.</div>
          <PaymentIcons>
            <span>VISA</span>
            <span>MASTERCARD</span>
            <span>PAYPAL</span>
          </PaymentIcons>
        </BottomBar>
      </BottomSection>
    </Container>
  );
};

export default Footer;
