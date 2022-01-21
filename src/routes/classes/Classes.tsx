import React from 'react';

import { useAuth } from '../../auth/Auth';
import Header from '../../components/Header';

const Classes = () => {
  const auth = useAuth();

  return (
    <div>
      <Header />
    </div>
  );
};

export default Classes;
