import React, { useEffect } from 'react';
import styled from 'styled-components';

import { useAuth } from '../../auth/Auth';
import { Link } from 'react-router-dom';

const ImageContainer = styled.div`
  width: 40px;
  height: 40px;
  display: block;
  border: 2px solid #d0d4d7;
  border-radius: 50%;
  overflow: hidden;

  svg {
    width: 100%;
  }
`;

const Block = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-gap: 4px;
  grid-template-columns: 1fr;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, max-content));
  grid-gap: 8px;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
`;

const StyledLink = styled(Link)`
  text-decoration: none;

  * {
    color: #2f3941;
  }
`;

const AdminPill = styled.span`
  display: block;
  padding: 4px 12px;
  font-size: 12px;
  color: #fff !important;
  background: #ad5918;
  width: max-content;
  border-radius: 12px;
`;

const Profile = () => {
  const auth = useAuth();
  useEffect(() => {
    // @ts-ignore
    window.jdenticon();
  }, [auth.user]);

  return (
    <StyledLink to="/profile">
      <Row>
        <ImageContainer>
          <svg width="40" height="40" data-jdenticon-value={`${auth.user?.email}`} />
        </ImageContainer>
        <Block>
          <p>{auth.user?.firstName}</p>
          {!!auth.user?.isAdmin && <AdminPill>Admin</AdminPill>}
        </Block>
      </Row>
    </StyledLink>
  );
};

export default Profile;
