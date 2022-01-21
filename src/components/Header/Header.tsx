import React from 'react';
import styled from 'styled-components';

import Profile from './Profile';

const MenuButton = styled.button`
  appearance: none;
  border: 1px solid #5d05a6;
  background: #5d05a6;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  cursor: pointer;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, max-content));
  grid-gap: 12px;
  align-items: center;
`;

const HeaderStyled = styled.header`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, max-content));
  justify-content: space-between;
  width: 100%;
  background: transparent;

  @media screen and (max-width: 411px) {
    background: #fff;
  }
`;

type Props = {
  onClassMenuClick?: () => void;
};

const Header = (props: Props) => {
  return (
    <HeaderStyled>
      {!!props.onClassMenuClick ? <div>Menu</div> : <div />}
      <Row>
        <Profile />
        <MenuButton>
          <span className="material-icons-outlined">menu_open</span>
        </MenuButton>
      </Row>
    </HeaderStyled>
  );
};

export default Header;
