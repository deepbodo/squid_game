import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes, css } from "styled-components";
import { useAuth } from "../AuthContext";
import maski from "./image/maski.png";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(234, 76, 137, 0.7); }
  70% { box-shadow: 0 0 0 15px rgba(234, 76, 137, 0); }
  100% { box-shadow: 0 0 0 0 rgba(234, 76, 137, 0); }
`;

const ChatWrapper = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ChatBubble = styled.button`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: #ea4c89;
  border: 4px solid #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: ${pulse} 2s infinite;
  padding: 0;
  overflow: hidden;

  &:hover {
    transform: scale(1.1) rotate(5deg);
    background: #d16ba5;
  }

  img {
    width: 80%;
    height: 80%;
    object-fit: contain;
  }
`;

const ChatWindow = styled.div`
  width: 400px;
  height: 600px;
  background: rgba(13, 19, 40, 0.95);
  backdrop-filter: blur(15px);
  border: 2px solid rgba(234, 76, 137, 0.4);
  border-radius: 20px;
  margin-bottom: 20px;
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.6);
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  flex-direction: column;
  animation: ${fadeIn} 0.4s ease-out;
  overflow: hidden;

  @media (max-width: 480px) {
    width: 320px;
    height: 500px;
    right: 15px;
  }
`;

const ChatHeader = styled.div`
  padding: 15px 20px;
  background: linear-gradient(135deg, #ea4c89, #d16ba5);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-weight: bold;
    font-family: "Donegal One", serif;
    letter-spacing: 1px;
  }
`;

const CloseBtn = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  line-height: 1;

  &:hover {
    color: #1a1a2e;
  }
`;

const IframeWrapper = styled.div`
  flex: 1;
  width: 100%;
  background: transparent;
  overflow: hidden;
  border-radius: 0 0 18px 18px;
`;

const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
  
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useAuth();
  const [userName, setUserName] = useState("Player 456");
  const [uid, setUid] = useState("anonymous");

  useEffect(() => {
    if (currentUser) {
      const name = currentUser.displayName || currentUser.email.split("@")[0];
      setUserName(name);
      setUid(currentUser.uid);
    } else {
      setUserName("Player 456");
      setUid("anonymous");
    }
  }, [currentUser]);

  // HF Space URL with dynamic query parameters
  const HF_SPACE_URL = `https://diki2001-squidchat.hf.space?uid=${encodeURIComponent(uid)}&name=${encodeURIComponent(userName)}`;

  return (
    <ChatWrapper>
      <ChatWindow isOpen={isOpen}>
        <ChatHeader>
          <span>YOUNG-HEE ASSISTANT</span>
          <CloseBtn onClick={() => setIsOpen(false)}>×</CloseBtn>
        </ChatHeader>
        <IframeWrapper>
          {isOpen && (
            <StyledIframe
              src={HF_SPACE_URL}
              title="Squid Game Chatbot"
              allow="microphone"
            />
          )}
        </IframeWrapper>
      </ChatWindow>
      <ChatBubble onClick={() => setIsOpen(!isOpen)} title="Chat with Young-hee">
        <img src={maski} alt="Assistant" />
      </ChatBubble>
    </ChatWrapper>
  );
};

export default ChatAssistant;
