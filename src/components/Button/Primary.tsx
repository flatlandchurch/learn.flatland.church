import styled from 'styled-components';

import Button from './Button';

const Primary = styled(Button)`
  background: #250044;
  color: #fff;
  border-color: #250044;

  &:hover,
  &:focus {
    background: #17002a;
    border-color: #fff;
  }

  &:focus {
    box-shadow: 0 0 1px 3px #5d05a655;
    outline: none;
  }
`;

export default Primary;
