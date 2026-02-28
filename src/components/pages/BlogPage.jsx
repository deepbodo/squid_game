import React from "react";
import styled, { keyframes } from "styled-components";
import useScrollReveal from "../../useScrollReveal";

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

const PostCard = styled.article`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(219, 112, 147, 0.15);
  border-radius: 20px;
  padding: 40px;
  margin-bottom: 30px;
  animation: ${fadeIn} 0.6s ease-out forwards;
  animation-delay: ${(props) => props.delay || "0s"};
  opacity: 0;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: rgba(234, 76, 137, 0.4);
  }
`;

const PostDate = styled.span`
  color: #ea4c89;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 600;
`;

const PostTitle = styled.h2`
  color: #fff;
  font-size: 26px;
  margin: 10px 0 15px;
`;

const PostContent = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 16px;
  line-height: 1.8;
`;

const Tag = styled.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  background: rgba(234, 76, 137, 0.1);
  color: #ea4c89;
  border: 1px solid rgba(234, 76, 137, 0.2);
  margin-right: 8px;
  margin-top: 15px;
`;

const posts = [
    {
        title: "Squid Game Season 2: Everything We Know",
        date: "February 28, 2026",
        content:
            "The highly anticipated second season of Squid Game is returning with new games, new characters, and even higher stakes. Director Hwang Dong-hyuk has confirmed that Gi-hun will return as the protagonist, but this time he's not just playing the game - he's fighting back against the system. Expect new twists on classic Korean children's games, deeper exploration of the organization behind the games, and merchandise that captures every thrilling moment.",
        tags: ["News", "Season 2"],
    },
    {
        title: "Behind the Design: Our Guard Mask Collection",
        date: "February 20, 2026",
        content:
            "Our design team spent months perfecting every detail of the Guard Mask Collection. Each mask - circle, triangle, and square - is crafted from premium resin with hand-finished details that match the screen-used props. We consulted reference materials from the show's production team to ensure authenticity, from the exact shade of pink to the geometric precision of each symbol.",
        tags: ["Behind the Scenes", "Products"],
    },
    {
        title: "Top 5 Ways to Style Your Squid Game Merch",
        date: "February 12, 2026",
        content:
            "Squid Game merchandise isn't just for display - it's wearable art. Pair the Player 456 tee with distressed jeans and sneakers for a casual streetwear look. Layer the Cartoon Hoodie over a collared shirt for a smart-casual vibe. The Guard Mask makes an incredible wall display when mounted in a shadow box. Our Logo Patch works perfectly on denim jackets or canvas bags for subtle fan signaling.",
        tags: ["Style Guide", "Tips"],
    },
    {
        title: "Limited Edition: Dalgona Candy Challenge Kit",
        date: "February 5, 2026",
        content:
            "We're excited to announce our new Dalgona Candy Challenge Kit! Each kit includes traditional dalgona candy molds in all four shapes (circle, triangle, star, umbrella), premium sugar ingredients, and an illustrated recipe card. Challenge your friends and family to recreate the iconic scene. Available in limited quantities - once they're gone, they're eliminated!",
        tags: ["New Product", "Limited Edition"],
    },
];

const BlogPage = () => {
    const revealRef = useScrollReveal();

    return (
        <Container ref={revealRef} className="scroll-reveal">
            <Title>Blog</Title>
            <Subtitle>News, Updates & Behind the Scenes</Subtitle>

            {posts.map((post, index) => (
                <PostCard key={index} delay={`${index * 0.15}s`}>
                    <PostDate>{post.date}</PostDate>
                    <PostTitle>{post.title}</PostTitle>
                    <PostContent>{post.content}</PostContent>
                    {post.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                    ))}
                </PostCard>
            ))}
        </Container>
    );
};

export default BlogPage;
