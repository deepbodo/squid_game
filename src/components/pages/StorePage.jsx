import React, { useState } from "react";
import styled from "styled-components";
import products from "../../products";
import ProductCard from "../ProductCard";
import useScrollReveal from "../../useScrollReveal";

const Container = styled.div`
  min-height: 100vh;
  padding: 40px;
  padding-top: 120px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 50px;
`;

const Title = styled.h1`
  color: #fff;
  font-size: 48px;
  font-family: "Donegal One", serif;
  margin-bottom: 10px;
  text-shadow: 0 0 20px rgba(234, 76, 137, 0.5);
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 18px;
  letter-spacing: 2px;
`;

const Filters = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 40px;
  flex-wrap: wrap;
`;

const FilterBtn = styled.button`
  padding: 10px 24px;
  border-radius: 25px;
  border: 2px solid ${(props) => (props.active ? "#ea4c89" : "rgba(219, 112, 147, 0.3)")};
  background: ${(props) => (props.active ? "#ea4c89" : "transparent")};
  color: ${(props) => (props.active ? "#fff" : "rgba(255, 255, 255, 0.7)")};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    border-color: #ea4c89;
    color: #fff;
    background: rgba(234, 76, 137, 0.2);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

const NoResults = styled.p`
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
  font-size: 18px;
  grid-column: 1 / -1;
  padding: 60px;
`;

const SearchBar = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 14px 24px;
  border-radius: 30px;
  border: 2px solid rgba(219, 112, 147, 0.3);
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  font-size: 16px;
  outline: none;
  margin: 0 auto 30px;
  display: block;
  transition: border-color 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }

  &:focus {
    border-color: #ea4c89;
  }
`;

const categories = ["all", "hoodies", "tshirts", "accessories", "collectibles"];

const StorePage = () => {
    const revealRef = useScrollReveal();
    const [activeCategory, setActiveCategory] = useState("all");
    const [search, setSearch] = useState("");

    const filtered = products.filter((p) => {
        const matchCategory =
            activeCategory === "all" || p.category === activeCategory;
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
        return matchCategory && matchSearch;
    });

    return (
        <Container ref={revealRef} className="scroll-reveal">
            <Header>
                <Title>Store</Title>
                <Subtitle>Official Squid Game Merchandise</Subtitle>
            </Header>

            <SearchBar
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <Filters>
                {categories.map((cat) => (
                    <FilterBtn
                        key={cat}
                        active={activeCategory === cat}
                        onClick={() => setActiveCategory(cat)}
                    >
                        {cat === "tshirts" ? "T-Shirts" : cat}
                    </FilterBtn>
                ))}
            </Filters>

            <Grid>
                {filtered.length > 0 ? (
                    filtered.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <NoResults>No products found matching your search.</NoResults>
                )}
            </Grid>
        </Container>
    );
};

export default StorePage;
