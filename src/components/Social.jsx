import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import styled, { keyframes } from "styled-components";

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 5px rgba(221, 0, 255, 0.3); }
  50% { box-shadow: 0 0 20px rgba(221, 0, 255, 0.6); }
`;

const Container = styled.div`
  width: 400px;
  margin: 40vh auto;
  text-align: center;
  margin-left: -70px;
`;
const Icons = styled.ul`
  padding: 0;
  list-style: none;
  margin: 1em;
  display: flex;
  justify-content: center;
  gap: 20px;
`;
const List = styled.li`
  display: inline-block;
  position: relative;
  font-size: 1.2em;
`;

const SocialLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(45deg, #dd00ff, #002a8f);
  color: #fff;
  font-size: 24px;
  transition: all 0.3s ease;
  text-decoration: none;

  &:hover {
    transform: scale(1.2) translateY(-5px);
    animation: ${glow} 1.5s ease-in-out infinite;
    background: linear-gradient(45deg, #002a8f, #dd00ff);
  }

  svg {
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: scale(1.1);
  }
`;

const Social = () => {
  return (
    <Container>
      <Icons>
        <List>
          <SocialLink href="#" aria-label="YouTube">
            <FontAwesomeIcon icon={faYoutube} size="lg" />
          </SocialLink>
        </List>
        <List>
          <SocialLink href="#" aria-label="Facebook">
            <FontAwesomeIcon icon={faFacebook} size="lg" />
          </SocialLink>
        </List>
        <List>
          <SocialLink href="#" aria-label="Instagram">
            <FontAwesomeIcon icon={faInstagram} size="lg" />
          </SocialLink>
        </List>
        <List>
          <SocialLink href="#" aria-label="Twitter">
            <FontAwesomeIcon icon={faTwitter} size="lg" />
          </SocialLink>
        </List>
      </Icons>
    </Container>
  );
};

export default Social;
