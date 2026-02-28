import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import useScrollReveal from "../useScrollReveal";

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const Container = styled.div`
  padding: 80px 40px;
  text-align: center;
`;

const Title = styled.h2`
  color: #fff;
  font-size: 48px;
  font-family: "Donegal One", serif;
  margin-bottom: 10px;
  text-shadow: 0 0 20px rgba(234, 76, 137, 0.5);
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 18px;
  margin-bottom: 50px;
  letter-spacing: 2px;
`;

const TimerWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
`;

const TimeBlock = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(234, 76, 137, 0.3);
  border-radius: 16px;
  padding: 30px 25px;
  min-width: 120px;
  box-shadow: 0 8px 32px rgba(234, 76, 137, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(234, 76, 137, 0.3);
    animation: ${pulse} 1s ease-in-out;
  }
`;

const TimeValue = styled.div`
  font-size: 56px;
  font-weight: bold;
  color: #ea4c89;
  font-family: "Courier New", monospace;
  line-height: 1;
  margin-bottom: 8px;
`;

const TimeLabel = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 3px;
`;

const Countdown = () => {
    const revealRef = useScrollReveal();

    // Set target date to 60 days from now
    const [targetDate] = useState(() => {
        const d = new Date();
        d.setDate(d.getDate() + 60);
        return d.getTime();
    });

    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const diff = targetDate - now;

            if (diff <= 0) {
                clearInterval(interval);
                return;
            }

            setTimeLeft({
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((diff % (1000 * 60)) / 1000),
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    const pad = (n) => String(n).padStart(2, "0");

    return (
        <Container ref={revealRef} className="scroll-reveal">
            <Title>🔺 Next Season Drop</Title>
            <Subtitle>Exclusive merch arriving soon — don't get eliminated</Subtitle>
            <TimerWrapper>
                <TimeBlock>
                    <TimeValue>{pad(timeLeft.days)}</TimeValue>
                    <TimeLabel>Days</TimeLabel>
                </TimeBlock>
                <TimeBlock>
                    <TimeValue>{pad(timeLeft.hours)}</TimeValue>
                    <TimeLabel>Hours</TimeLabel>
                </TimeBlock>
                <TimeBlock>
                    <TimeValue>{pad(timeLeft.minutes)}</TimeValue>
                    <TimeLabel>Minutes</TimeLabel>
                </TimeBlock>
                <TimeBlock>
                    <TimeValue>{pad(timeLeft.seconds)}</TimeValue>
                    <TimeLabel>Seconds</TimeLabel>
                </TimeBlock>
            </TimerWrapper>
        </Container>
    );
};

export default Countdown;
