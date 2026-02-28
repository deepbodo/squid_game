import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px) scale(0.8); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`;

const fadeOut = keyframes`
  from { opacity: 1; transform: translateY(0) scale(1); }
  to   { opacity: 0; transform: translateY(20px) scale(0.8); }
`;

const Button = styled.button`
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 2px solid #ea4c89;
  background: rgba(234, 76, 137, 0.15);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: #ea4c89;
  font-size: 24px;
  cursor: pointer;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(234, 76, 137, 0.3);
  transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  animation: ${(props) => (props.visible ? fadeIn : fadeOut)} 0.3s ease forwards;

  &:hover {
    background: #ea4c89;
    color: #fff;
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(234, 76, 137, 0.5);
  }
`;

const Arrow = styled.span`
  font-size: 22px;
  line-height: 1;
`;

const BackToTop = () => {
    const [visible, setVisible] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 400) {
                setVisible(true);
                setShouldRender(true);
            } else {
                setVisible(false);
                setTimeout(() => setShouldRender(false), 300);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (!shouldRender) return null;

    return (
        <Button visible={visible} onClick={scrollToTop} aria-label="Back to top">
            <Arrow>▲</Arrow>
        </Button>
    );
};

export default BackToTop;
