import React from "react";
import styled, { keyframes } from "styled-components";

const float1 = keyframes`
  0% { transform: translate(0, 0) rotate(0deg); opacity: 0.6; }
  25% { transform: translate(80px, -120px) rotate(90deg); opacity: 0.8; }
  50% { transform: translate(-60px, -200px) rotate(180deg); opacity: 0.5; }
  75% { transform: translate(100px, -80px) rotate(270deg); opacity: 0.7; }
  100% { transform: translate(0, 0) rotate(360deg); opacity: 0.6; }
`;

const float2 = keyframes`
  0% { transform: translate(0, 0) rotate(0deg); opacity: 0.5; }
  33% { transform: translate(-100px, -150px) rotate(120deg); opacity: 0.7; }
  66% { transform: translate(70px, -100px) rotate(240deg); opacity: 0.4; }
  100% { transform: translate(0, 0) rotate(360deg); opacity: 0.5; }
`;

const float3 = keyframes`
  0% { transform: translate(0, 0) scale(1); opacity: 0.4; }
  50% { transform: translate(50px, -180px) scale(1.2); opacity: 0.7; }
  100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
`;

const ShapesContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
`;

const Circle = styled.div`
  position: absolute;
  width: ${(props) => props.size || 40}px;
  height: ${(props) => props.size || 40}px;
  border: 3px solid rgba(234, 76, 137, 0.4);
  border-radius: 50%;
  top: ${(props) => props.top || "50%"};
  left: ${(props) => props.left || "50%"};
  animation: ${float1} ${(props) => props.duration || "12s"} ease-in-out infinite;
  animation-delay: ${(props) => props.delay || "0s"};
`;

const Triangle = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-left: ${(props) => (props.size || 20)}px solid transparent;
  border-right: ${(props) => (props.size || 20)}px solid transparent;
  border-bottom: ${(props) => (props.size || 20) * 1.7}px solid rgba(234, 76, 137, 0.3);
  top: ${(props) => props.top || "30%"};
  left: ${(props) => props.left || "70%"};
  animation: ${float2} ${(props) => props.duration || "15s"} ease-in-out infinite;
  animation-delay: ${(props) => props.delay || "0s"};
`;

const Square = styled.div`
  position: absolute;
  width: ${(props) => props.size || 30}px;
  height: ${(props) => props.size || 30}px;
  border: 3px solid rgba(219, 112, 147, 0.35);
  top: ${(props) => props.top || "60%"};
  left: ${(props) => props.left || "20%"};
  animation: ${float3} ${(props) => props.duration || "18s"} ease-in-out infinite;
  animation-delay: ${(props) => props.delay || "0s"};
`;

const FloatingShapes = () => {
    return (
        <ShapesContainer>
            {/* Circles */}
            <Circle size={50} top="10%" left="5%" duration="14s" delay="0s" />
            <Circle size={30} top="70%" left="85%" duration="11s" delay="2s" />
            <Circle size={60} top="80%" left="15%" duration="16s" delay="4s" />
            <Circle size={25} top="20%" left="90%" duration="13s" delay="1s" />

            {/* Triangles */}
            <Triangle size={20} top="15%" left="75%" duration="17s" delay="3s" />
            <Triangle size={15} top="60%" left="10%" duration="14s" delay="1s" />
            <Triangle size={25} top="40%" left="50%" duration="19s" delay="5s" />

            {/* Squares */}
            <Square size={35} top="25%" left="30%" duration="15s" delay="2s" />
            <Square size={20} top="75%" left="60%" duration="20s" delay="0s" />
            <Square size={45} top="50%" left="80%" duration="13s" delay="3s" />
        </ShapesContainer>
    );
};

export default FloatingShapes;
