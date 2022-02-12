import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";

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
`;
const List = styled.li`
  display: inline-block;
  margin: 0.15em;
  position: relative;
  font-size: 1.2em;
  a {
    display: inline-block;

    &:before {
      transformScale(2.2: 1) {
        transform: scale(2.2);
        -ms-transform: scale(2.2);
        -webkit-transform: scale(2.2);
      }
      content: " ";
      width: 60px;
      height: 60px;
      border-radius: 100%;
      display: block;
      background: linear-gradient(45deg, #dd00ff, #002a8f);
      transition: all 256ms ease-out;
    }

    &:hover:before {
      transform: scale(0);
      transition: all 256ms ease-in;
    }

    &:hover i {
      transformScale(2.2: 1) {
        transform: scale(2.2);
        -ms-transform: scale(2.2);
        -webkit-transform: scale(2.2);
      }
      color: #dd00ff;
      background: -webkit-linear-gradient(45deg, #dd00ff, #002a8f);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      transition: all 265ms ease-in;
    }
  }
`;
const Icone = styled.i`
  color: #fff;
  width: 50%;
  position: absolute;
  top: 12px;
  left: 10px;
  transition: all 265ms ease-out;
  &:hover {
    transformScale(2.2: 1) {
      transform: scale(2.2);
      -ms-transform: scale(2.2);
      -webkit-transform: scale(2.2);
    }
    color: #dd00ff;

    background: -webkit-linear-gradient(45deg, #dd00ff, #002a8f);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: all 265ms ease-in;
  }
`;

const Social = () => {
  return (
    <Container>
      <Icons>
        <List>
          <a href="#" className="youtube social">
            <Icone>
              <FontAwesomeIcon icon={faYoutube} size="2x" />
            </Icone>
          </a>
        </List>
        <List>
          <a href="#" className="facebook social">
            <Icone>
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </Icone>
          </a>
        </List>
        <List>
          <a href="#" className="instagram social">
            <Icone>
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </Icone>
          </a>
        </List>
        <List>
          <a href="#" className="twitter social">
            <Icone>
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </Icone>
          </a>
        </List>
      </Icons>
    </Container>
  );
};

export default Social;
