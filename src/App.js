import styled from "styled-components";
import "./App.css";
import BelowNav from "./components/BelowNav";
import Best from "./components/Best";
import Epic from "./components/Epic";
import Navbar from "./components/Navbar";
import Section from "./components/Section";
import Footer from "./components/Footer";

const Container = styled.div`
  height: auto;
  overflow: hidden;
  overflow-x: hidden;
  background: #0d1328;
  background: -webkit-radial-gradient(bottom right, #0d1328, #647082);
  background: -moz-radial-gradient(bottom right, #0d1328, #647082);
  background: radial-gradient(to top left, #0d1328, #647082);
`;
function App() {
  return (
    <>
      <Container>
        <Navbar />
        <BelowNav />
        <Section />
        <Best />
        <Epic />
        <Footer />
      </Container>
    </>
  );
}

export default App;
