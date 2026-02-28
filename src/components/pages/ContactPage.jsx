import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import useScrollReveal from "../../useScrollReveal";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  min-height: 100vh;
  padding: 40px;
  padding-top: 120px;
  max-width: 700px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #fff;
  font-size: 48px;
  font-family: "Donegal One", serif;
  margin-bottom: 10px;
  text-align: center;
  text-shadow: 0 0 20px rgba(234, 76, 137, 0.5);
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 18px;
  text-align: center;
  margin-bottom: 50px;
  letter-spacing: 2px;
`;

const FormCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(219, 112, 147, 0.2);
  border-radius: 20px;
  padding: 40px;
  animation: ${fadeIn} 0.6s ease-out;
`;

const InputGroup = styled.div`
  margin-bottom: 22px;
`;

const Label = styled.label`
  display: block;
  color: rgba(255, 255, 255, 0.7);
  font-size: 13px;
  margin-bottom: 6px;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 18px;
  border-radius: 12px;
  border: 2px solid rgba(219, 112, 147, 0.2);
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease;
  box-sizing: border-box;

  &:focus {
    border-color: #ea4c89;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 14px 18px;
  border-radius: 12px;
  border: 2px solid rgba(219, 112, 147, 0.2);
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease;
  resize: vertical;
  min-height: 150px;
  font-family: inherit;
  box-sizing: border-box;

  &:focus {
    border-color: #ea4c89;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

const SubmitBtn = styled.button`
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #ea4c89, #d16ba5);
  border: none;
  border-radius: 12px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 1px;
  margin-top: 10px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(234, 76, 137, 0.5);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const SuccessMsg = styled.div`
  background: rgba(76, 234, 137, 0.1);
  border: 1px solid rgba(76, 234, 137, 0.3);
  color: #4cea89;
  padding: 16px 20px;
  border-radius: 12px;
  font-size: 16px;
  text-align: center;
  margin-bottom: 20px;
`;

const ErrorMsg = styled.div`
  background: rgba(255, 68, 68, 0.1);
  border: 1px solid rgba(255, 68, 68, 0.3);
  color: #ff6b6b;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 14px;
  margin-bottom: 20px;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  margin-top: 40px;
`;

const InfoCard = styled.div`
  background: rgba(234, 76, 137, 0.08);
  border: 1px solid rgba(234, 76, 137, 0.2);
  border-radius: 14px;
  padding: 20px;
  text-align: center;
`;

const InfoIcon = styled.div`
  font-size: 28px;
  margin-bottom: 8px;
`;

const InfoLabel = styled.div`
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 4px;
`;

const InfoValue = styled.div`
  color: #fff;
  font-size: 14px;
`;

const ContactPage = () => {
    const revealRef = useScrollReveal();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess(false);
        setLoading(true);

        try {
            await addDoc(collection(db, "contacts"), {
                name,
                email,
                message,
                createdAt: serverTimestamp(),
            });
            setSuccess(true);
            setName("");
            setEmail("");
            setMessage("");
        } catch (err) {
            setError("Failed to send message. Please try again.");
        }

        setLoading(false);
    };

    return (
        <Container ref={revealRef} className="scroll-reveal">
            <Title>Contact Us</Title>
            <Subtitle>We'd love to hear from you</Subtitle>

            <FormCard>
                {success && (
                    <SuccessMsg>
                        Message sent successfully! We'll get back to you soon.
                    </SuccessMsg>
                )}
                {error && <ErrorMsg>{error}</ErrorMsg>}

                <form onSubmit={handleSubmit}>
                    <InputGroup>
                        <Label>Name</Label>
                        <Input
                            type="text"
                            placeholder="Your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </InputGroup>

                    <InputGroup>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </InputGroup>

                    <InputGroup>
                        <Label>Message</Label>
                        <TextArea
                            placeholder="How can we help you?"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        />
                    </InputGroup>

                    <SubmitBtn type="submit" disabled={loading}>
                        {loading ? "Sending..." : "Send Message"}
                    </SubmitBtn>
                </form>
            </FormCard>

            <InfoGrid>
                <InfoCard>
                    <InfoIcon>&#9993;</InfoIcon>
                    <InfoLabel>Email</InfoLabel>
                    <InfoValue>support@squidgamestore.com</InfoValue>
                </InfoCard>
                <InfoCard>
                    <InfoIcon>&#9742;</InfoIcon>
                    <InfoLabel>Response Time</InfoLabel>
                    <InfoValue>Within 24 hours</InfoValue>
                </InfoCard>
                <InfoCard>
                    <InfoIcon>&#127757;</InfoIcon>
                    <InfoLabel>Shipping</InfoLabel>
                    <InfoValue>Worldwide delivery</InfoValue>
                </InfoCard>
            </InfoGrid>
        </Container>
    );
};

export default ContactPage;
