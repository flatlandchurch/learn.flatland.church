import React from 'react';
import styled from 'styled-components';

import Header from '../../components/Header';

const Section = styled.section`
  width: 100%;
  display: block;
  background: #f2f2f3;
`;

const Admin = () => {
  return (
    <Section>
      <Header />
    </Section>
  );
};

export default Admin;
