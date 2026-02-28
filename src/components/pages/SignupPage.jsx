import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../AuthContext";
import { useHistory, Link } from "react-router-dom";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

const FormCard = styled.div`
  width: 100%;
  max-width: 420px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(219, 112, 147, 0.2);
  border-radius: 20px;
  padding: 50px 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h1`
  color: #fff;
  font-size: 32px;
  font-family: "Donegal One", serif;
  margin-bottom: 8px;
  text-align: center;
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  text-align: center;
  margin-bottom: 35px;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
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

const SubmitBtn = styled.button`
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #ea4c89, #d16ba5);
  border: none;
  border-radius: 12px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
  letter-spacing: 1px;

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

const ErrorMsg = styled.div`
  background: rgba(255, 68, 68, 0.1);
  border: 1px solid rgba(255, 68, 68, 0.3);
  color: #ff6b6b;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 14px;
  margin-bottom: 20px;
`;

const BottomText = styled.p`
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  text-align: center;
  margin-top: 25px;

  a {
    color: #ea4c89;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const SignupPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            return setError("Passwords do not match.");
        }

        if (password.length < 6) {
            return setError("Password must be at least 6 characters.");
        }

        setLoading(true);

        try {
            await signup(email, password);
            history.push("/");
        } catch (err) {
            setError(
                err.code === "auth/email-already-in-use"
                    ? "An account with this email already exists."
                    : "Failed to create account. Please try again."
            );
        }

        setLoading(false);
    };

    return (
        <Container>
            <FormCard>
                <Title>Join the Game</Title>
                <Subtitle>Create your Squid Game Store account</Subtitle>

                {error && <ErrorMsg>{error}</ErrorMsg>}

                <form onSubmit={handleSubmit}>
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
                        <Label>Password</Label>
                        <Input
                            type="password"
                            placeholder="At least 6 characters"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </InputGroup>

                    <InputGroup>
                        <Label>Confirm Password</Label>
                        <Input
                            type="password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </InputGroup>

                    <SubmitBtn type="submit" disabled={loading}>
                        {loading ? "Creating Account..." : "Create Account"}
                    </SubmitBtn>
                </form>

                <BottomText>
                    Already have an account? <Link to="/login">Sign In</Link>
                </BottomText>
            </FormCard>
        </Container>
    );
};

export default SignupPage;
