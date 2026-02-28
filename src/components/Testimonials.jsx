import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import useScrollReveal from "../useScrollReveal";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  padding: 80px 40px;
  text-align: center;
`;

const Title = styled.h2`
  color: #fff;
  font-size: 42px;
  font-family: "Donegal One", serif;
  margin-bottom: 50px;
  text-shadow: 0 0 20px rgba(234, 76, 137, 0.4);
`;

const QuoteCard = styled.div`
  max-width: 700px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(219, 112, 147, 0.25);
  border-radius: 20px;
  padding: 40px 50px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 0.6s ease-out;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const QuoteText = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 20px;
  line-height: 1.7;
  font-style: italic;
  margin-bottom: 25px;

  &::before {
    content: """;
    font-size: 50px;
    color: #ea4c89;
    line-height: 0;
    vertical-align: -15px;
    margin-right: 5px;
  }

  &::after {
    content: """;
    font-size: 50px;
    color: #ea4c89;
    line-height: 0;
    vertical-align: -15px;
    margin-left: 5px;
  }
`;

const Author = styled.div`
  color: #ea4c89;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 1px;
`;

const Dots = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 30px;
`;

const Dot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid #ea4c89;
  background: ${(props) => (props.active ? "#ea4c89" : "transparent")};
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;

  &:hover {
    background: #ea4c89;
    transform: scale(1.3);
  }
`;

const testimonials = [
    {
        text: "The hoodie quality is insane! Feels like I'm actually in the game. Best merch store I've found.",
        author: "— Player 456",
    },
    {
        text: "Shipping was super fast and the t-shirt design is spot on. My friends are jealous!",
        author: "— Player 067",
    },
    {
        text: "Bought the full collection — mask, hoodie, and tee. Everything arrived perfectly. 10/10!",
        author: "— Player 218",
    },
    {
        text: "The attention to detail on these products is amazing. You can tell they're made by real fans.",
        author: "— Player 199",
    },
];

const Testimonials = () => {
    const revealRef = useScrollReveal();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Container ref={revealRef} className="scroll-reveal">
            <Title>⭐ What Players Say</Title>
            <QuoteCard key={current}>
                <QuoteText>{testimonials[current].text}</QuoteText>
                <Author>{testimonials[current].author}</Author>
            </QuoteCard>
            <Dots>
                {testimonials.map((_, i) => (
                    <Dot
                        key={i}
                        active={i === current}
                        onClick={() => setCurrent(i)}
                    />
                ))}
            </Dots>
        </Container>
    );
};

export default Testimonials;
