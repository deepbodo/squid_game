import styled from "styled-components";
import "./App.css";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import { CartProvider } from "./CartContext";
import Navbar from "./components/Navbar";
import BackToTop from "./components/BackToTop";
import HomePage from "./components/pages/HomePage";
import StorePage from "./components/pages/StorePage";
import ProductDetail from "./components/pages/ProductDetail";
import CartPage from "./components/pages/CartPage";
import LoginPage from "./components/pages/LoginPage";
import SignupPage from "./components/pages/SignupPage";
import BlogPage from "./components/pages/BlogPage";
import AboutPage from "./components/pages/AboutPage";
import ContactPage from "./components/pages/ContactPage";

const Container = styled.div`
  height: auto;
  min-height: 100vh;
  overflow-x: hidden;
  background: #0d1328;
  background: -webkit-radial-gradient(bottom right, #0d1328, #647082);
  background: -moz-radial-gradient(bottom right, #0d1328, #647082);
  background: radial-gradient(to top left, #0d1328, #647082);
`;

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Container>
            <Navbar />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/store" component={StorePage} />
              <Route path="/product/:id" component={ProductDetail} />
              <Route path="/cart" component={CartPage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/signup" component={SignupPage} />
              <Route path="/blog" component={BlogPage} />
              <Route path="/about" component={AboutPage} />
              <Route path="/contact" component={ContactPage} />
            </Switch>
            <BackToTop />
          </Container>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
