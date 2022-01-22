import React from 'react';
import styled, { keyframes } from 'styled-components';

import { useAuth } from '../../auth/Auth';
import { Link } from 'react-router-dom';

const slide = keyframes`
  from {
    right: -360px;
  }
  
  to {
    right: 0;
  }
`;

const MenuStyled = styled.div`
  width: 85%;
  max-width: 360px;
  display: block;
  background: #5d05a6;
  z-index: 100;
  top: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  animation: ${slide} 0.2s linear;
  animation-fill-mode: forwards;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: minmax(0, max-content);
  justify-content: end;
  padding: 24px;
  width: 100%;
`;

const Close = styled.button`
  color: #fff;
  border: 0;
  background: transparent;
  appearance: none;
  cursor: pointer;
`;

const Column = styled.div`
  width: 100%;
  padding: 0 32px 32px;
`;

const List = styled.ul`
  list-style: none;

  &:not(:last-child) {
    border-bottom: 2px solid #fff;
    margin-bottom: 24px;
  }

  li {
    font-size: 20px;
    font-weight: 400;
    color: #f2f2f2;
    margin: 24px 0;
  }
`;

const StyledLink = styled(Link)`
  color: #f2f2f2;
  text-decoration: none;
`;

const ListTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #fff;
`;

type Props = {
  onClose: () => void;
};

const Menu = (props: Props) => {
  const auth = useAuth();

  return (
    <MenuStyled>
      <Row>
        <Close onClick={props.onClose}>
          <span className="material-icons-outlined">close</span>
        </Close>
      </Row>
      <Column>
        <List>
          <li>
            <StyledLink to="/">Home</StyledLink>
          </li>
          <li>
            <StyledLink to="/classes">All Classes</StyledLink>
          </li>
          <li>
            <StyledLink to="/profile">My Profile</StyledLink>
          </li>
        </List>
        {auth.user?.isAdmin && (
          <>
            <ListTitle>Admin</ListTitle>
            <List>
              <li>
                <StyledLink to="/admin">Dashboard</StyledLink>
              </li>
              <li>
                <StyledLink to="/admin/classes">Classes</StyledLink>
              </li>
              <li>
                <StyledLink to="/admin/users">Users</StyledLink>
              </li>
            </List>
          </>
        )}
      </Column>
    </MenuStyled>
  );
};

export default Menu;
