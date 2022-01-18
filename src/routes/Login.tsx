import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Input from '../components/Input';
import { PrimaryButton } from '../components/Button';
import { useAuth } from '../auth/Auth';

const Form = styled.form`
  --shadow-color: 273deg 100% 18%;
  display: grid;
  max-width: 500px;
  margin: 0 auto;
  width: 95%;
  border-radius: 12px;
  background: #fff;
  grid-template-columns: 1fr;
  grid-gap: 8px;
  padding: 24px;
  box-shadow: 0.1px 0.7px 0.5px hsl(var(--shadow-color) / 0.67),
    0.1px 0.8px 0.6px -0.7px hsl(var(--shadow-color) / 0.59),
    0.2px 2.2px 1.7px -1.4px hsl(var(--shadow-color) / 0.5),
    0.6px 5.8px 4.4px -2.1px hsl(var(--shadow-color) / 0.42),
    1.2px 12.8px 9.6px -2.9px hsl(var(--shadow-color) / 0.34),
    2.3px 24.3px 18.3px -3.6px hsl(var(--shadow-color) / 0.25),
    4px 41.5px 31.3px -4.3px hsl(var(--shadow-color) / 0.17),
    6.3px 65.6px 49.4px -5px hsl(var(--shadow-color) / 0.08);
`;

const Submit = styled(PrimaryButton)`
  margin-left: auto;
`;

const Container = styled.div`
  height: 100vh;
  position: relative;
  width: 100%;
  display: block;
  overflow: hidden;

  h1 {
    max-width: 500px;
    margin: 56px auto 24px;
    width: 95%;
    font-weight: 800;
    color: #fff;
  }
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  object-fit: cover;
  z-index: -2;
  filter: blur(10%);

  @media (prefers-reduced-motion) {
    display: none;
  }
`;

const Overlay = styled.div`
  background: #5d05a6;
  background: linear-gradient(
    320deg,
    hsl(273deg 94% 34%) 0%,
    hsl(277deg 97% 33%) 16%,
    hsl(281deg 100% 32%) 27%,
    hsl(284deg 100% 32%) 37%,
    hsl(287deg 100% 32%) 45%,
    hsl(290deg 100% 32%) 54%,
    hsl(293deg 100% 32%) 62%,
    hsl(296deg 100% 32%) 72%,
    hsl(299deg 98% 32%) 83%,
    hsl(302deg 94% 34%) 100%
  );
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
  opacity: 0.8;
`;

const StyledLink = styled(Link)`
  color: #5d05a6;
`;

const Login = () => {
  const auth = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    auth.login(email, password);
  };

  return (
    <Container>
      <h1>Login to take classes from Flatland Church</h1>
      <Form onSubmit={handleSubmit}>
        <p>
          Don't have an account yet? <StyledLink to="/sign-up">Sign Up</StyledLink>
        </p>
        <Input
          label="Email Address"
          value={email}
          onChange={setEmail}
          type="email"
          required
          autoComplete="username"
        />
        <Input
          label="Password"
          value={password}
          onChange={setPassword}
          type="password"
          required
          autoComplete="current-password"
        />
        <Submit>Login</Submit>
      </Form>
      <Overlay />
      <Video
        src="https://firebasestorage.googleapis.com/v0/b/flatland-api.appspot.com/o/2021%20Website%20Loop.mp4?alt=media&amp;token=f66630a2-303d-43e2-acce-98bd95788ae2"
        autoPlay
        loop
        muted
      />
    </Container>
  );
};

export default Login;
