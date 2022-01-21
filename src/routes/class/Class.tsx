import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import Header from '../../components/Header';

const Class = () => {
  const params = useParams();
  console.log(params);

  return (
    <div>
      <Header />
      <aside>Hello</aside>
      <div>Class {params.id}</div>
    </div>
  );
};

export default Class;
