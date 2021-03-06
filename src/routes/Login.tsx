import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Input from '../components/Input';
import { PrimaryButton } from '../components/Button';
import { Container, Video, Overlay } from '../components/Jumbotron';
import { useAuth } from '../auth/Auth';

export const Form = styled.form`
  --shadow-color: 273deg 100% 18%;
  display: grid;
  max-width: 500px;
  margin: 0 auto;
  width: 95%;
  border-radius: 12px;
  background: #fff;
  grid-template-columns: minmax(0, 1fr);
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

export const Submit = styled(PrimaryButton)`
  margin-left: auto;
`;

export const StyledLink = styled(Link)`
  color: #5d05a6;
`;

export const ErrorContainer = styled.div`
  width: 100%;
  display: block;
  padding: 8px;
  font-weight: 400;
  font-size: 14px;
  border-radius: 8px;
  background: #cc3340;
  color: #fff;
  margin: 8px 0;
`;

const ERROR_MESSAGE_MAP = {
  UserNotFoundError:
    'A user with that email does not exist in our system. Feel free to sign up above.',
  InvalidPasswordError: 'Email address and password do not match.',
};

const Login = () => {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    auth.login(email, password).then(([err]) => {
      if (err) {
        setErrors(err.errors.map(({ code }) => ERROR_MESSAGE_MAP[code]));
      } else {
        // @ts-ignore
        const url = location.state && location.state.from ? location.state.from.pathname : '/';
        navigate(url);
      }
    });
  };

  return (
    <Container>
      <h1>Login to take classes from Flatland Church</h1>
      <Form onSubmit={handleSubmit}>
        <p>
          Don't have an account yet? <StyledLink to="/sign-up">Sign Up</StyledLink>
        </p>
        {errors.length > 0 && (
          <ErrorContainer>
            {errors.map((e) => (
              <p key={e}>{e}</p>
            ))}
          </ErrorContainer>
        )}
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
