import React from "react";
import styled, { keyframes } from "styled-components";
import useScrollReveal from "../../useScrollReveal";
import symbolic from "../image/symbolic.png";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  min-height: 100vh;
  padding: 40px;
  padding-top: 120px;
  max-width: 900px;
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

const SymbolImage = styled.img`
  display: block;
  width: 150px;
  margin: 0 auto 40px;
  opacity: 0.8;
`;

const Section = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(219, 112, 147, 0.15);
  border-radius: 20px;
  padding: 40px;
  margin-bottom: 30px;
  animation: ${fadeIn} 0.6s ease-out forwards;
  animation-delay: ${(props) => props.delay || "0s"};
  opacity: 0;
`;

const SectionTitle = styled.h2`
  color: #ea4c89;
  font-size: 24px;
  margin-bottom: 15px;
`;

const Text = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 16px;
  line-height: 1.8;
`;

const ValueGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const ValueCard = styled.div`
  background: rgba(234, 76, 137, 0.08);
  border: 1px solid rgba(234, 76, 137, 0.2);
  border-radius: 14px;
  padding: 25px;
  text-align: center;
`;

const ValueIcon = styled.div`
  font-size: 36px;
  margin-bottom: 10px;
`;

const ValueName = styled.h3`
  color: #fff;
  font-size: 16px;
  margin-bottom: 8px;
`;

const ValueDesc = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
  line-height: 1.6;
`;

const AboutPage = () => {
    const revealRef = useScrollReveal();

    return (
        <Container ref={revealRef} className="scroll-reveal">
            <SymbolImage src={symbolic} alt="Squid Game" />
            <Title>About Us</Title>
            <Subtitle>The Official Squid Game Franchise Store</Subtitle>

            <Section delay="0s">
                <SectionTitle>Our Story</SectionTitle>
                <Text>
                    Born from the global phenomenon that captivated 142 million households
                    worldwide, the Squid Game Store is the ultimate destination for fans
                    who want to bring the world of Squid Game into their everyday lives.
                    We curate and create premium merchandise that captures the essence of
                    the show - from the iconic green tracksuits to the mysterious guard
                    masks and everything in between.
                </Text>
            </Section>

            <Section delay="0.15s">
                <SectionTitle>Our Mission</SectionTitle>
                <Text>
                    We believe that great fandom deserves great merchandise. Every product
                    in our store is designed with meticulous attention to detail, using
                    premium materials that honor the artistry of the show. We're not just
                    selling products - we're creating pieces that connect fans to the
                    moments, characters, and stories they love.
                </Text>
            </Section>

            <Section delay="0.3s">
                <SectionTitle>Our Values</SectionTitle>
                <ValueGrid>
                    <ValueCard>
                        <ValueIcon>&#9733;</ValueIcon>
                        <ValueName>Premium Quality</ValueName>
                        <ValueDesc>
                            Every product meets our rigorous standards for materials and
                            craftsmanship.
                        </ValueDesc>
                    </ValueCard>
                    <ValueCard>
                        <ValueIcon>&#10003;</ValueIcon>
                        <ValueName>Authenticity</ValueName>
                        <ValueDesc>
                            Designs true to the show's aesthetic with fine attention to detail.
                        </ValueDesc>
                    </ValueCard>
                    <ValueCard>
                        <ValueIcon>&#9829;</ValueIcon>
                        <ValueName>Fan First</ValueName>
                        <ValueDesc>
                            Built by fans, for fans. Your satisfaction is our top priority.
                        </ValueDesc>
                    </ValueCard>
                    <ValueCard>
                        <ValueIcon>&#127757;</ValueIcon>
                        <ValueName>Global Shipping</ValueName>
                        <ValueDesc>
                            Free shipping worldwide on orders over $50. We deliver everywhere.
                        </ValueDesc>
                    </ValueCard>
                </ValueGrid>
            </Section>
        </Container>
    );
};

export default AboutPage;
