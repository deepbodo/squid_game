import React from "react";
import styled from "styled-components";
const Container = styled.div`
  height: 100%;
`;

const Form = styled.form``;
const Btn = styled.button`
  width: 140px;
  height: 50px;
  background: #d16ba5;
  border: 1px solid #d16ba5;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-family: Donegal One, serif;
  font-size: 40px;
  line-height: 16px;
  min-height: 40px;
  outline: 0;
  padding: 12px 14px;
  text-align: center;
  text-rendering: geometricprecision;
  text-transform: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  &:hover,
  &:active {
    background-color: initial;
    background-position: 0 0;
    color: #ff4742;
  }
`;
const Input = styled.input`
  width: 220px;
  border-radius: 15px;
  background: transparent;
  color: #fff;
  font-family: Donegal One, serif;
  font-size: 20px;
  box-shadow: none;
  outline: none;
  border: none;
  -webkit-appearance: none;
  padding: 22px 18px;
  &:hover {
    border-color: linear-gradient(21deg, #10abff, #1beabd);
    border: 1;
  }
`;
const Email = () => {
  return (
    <Container>
      <div className="container__item">
        <Form>
          <Input
            type="email"
            className="form__field"
            placeholder="Your E-Mail Address"
          />
          <Btn type="button" className="btn btn--primary btn--inside uppercase">
            Enter
          </Btn>
        </Form>
      </div>
    </Container>
  );
};

export default Email;
