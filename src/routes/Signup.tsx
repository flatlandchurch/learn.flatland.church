import React, { useState } from 'react';
import styled from 'styled-components';

import Input from '../components/Input';
import { Container, Video, Overlay } from '../components/Jumbotron';
import { Submit, Form, StyledLink } from './Login';
import { useAuth } from '../auth/Auth';
import { useNavigate } from 'react-router-dom';

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-gap: 8px;

  @media screen and (max-width: 375px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const Signup = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // TODO: report errors

  const handleSubmit = (e) => {
    e.preventDefault();
    auth
      .signup({
        firstName,
        lastName,
        email,
        password,
      })
      .then(([err]) => {
        if (err) {
          console.log(err);
        } else {
          navigate('/');
        }
      });
  };

  return (
    <Container>
      <h1>Sign up to take classes from Flatland Church</h1>
      <Form onSubmit={handleSubmit}>
        <p>
          Already have an account? <StyledLink to="/login">Login</StyledLink>
        </p>
        <Row>
          <Input
            label="First Name"
            value={firstName}
            onChange={setFirstName}
            type="text"
            required
            autoComplete="given-name"
          />
          <Input
            label="Last Name"
            value={lastName}
            onChange={setLastName}
            type="text"
            required
            autoComplete="family-name"
          />
        </Row>
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
          autoComplete="new-password"
        />
        <Submit>Sign Up</Submit>
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

export default Signup;
