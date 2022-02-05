import React from 'react';
import styled from 'styled-components';

const Item = styled.div`
  margin-bottom: 12px;
  cursor: pointer;
  background: ${(props) => props.active && '#084cfe'};
  color: ${(props) => (props.active ? '#fff' : '#242d2f')};
  border-radius: 8px;
  padding: 12px;
  user-select: none;
  appearance: none;
  font-size: 16px;
  border: 0;
  display: flex;
  width: 100%;
`;

const ContextMenu = styled.span`
  margin-left: auto;
  cursor: pointer;
`;

const Expand = styled.span`
  margin-right: 8px;
  cursor: pointer;
`;

const Spacer = styled.div`
  width: 32px;
  display: block;
  margin-right: 8px;
`;

const Button = styled.button`
  width: 100%;
  appearance: none;
  border: 0;
  background: transparent;
  color: inherit;
  font-size: inherit;
  font-weight: inherit;
  text-align: left;
  cursor: pointer;
`;

type Props = React.IntrinsicElements & {
  active?: boolean;
  icon?: string;
  open?: boolean;
  title: string;
  onClick: () => void;
  onCollapse?: () => void;
  onContext?: (ref: React.Ref) => void;
};

const ListItem = (props: Props) => {
  const ref = React.createRef();

  return (
    <Item active={props.active}>
      {!!props.icon && (
        <Expand role="button" className="material-icons" tabIndex={0} onClick={props.onClick}>
          {props.icon}
        </Expand>
      )}
      {!!props.onCollapse ? (
        <Expand role="button" className="material-icons" onClick={props.onCollapse} tabIndex={0}>
          {props.open === true ? 'expand_less' : 'expand_more'}
        </Expand>
      ) : (
        <>{!props.icon && <Spacer />}</>
      )}
      <Button onClick={props.onClick}>{props.title}</Button>
      {!!props.onContext && (
        <ContextMenu
          role="button"
          className="material-icons"
          onClick={() => props.onContext(ref)}
          tabIndex={0}
          ref={ref}
        >
          more_horiz
        </ContextMenu>
      )}
    </Item>
  );
};

export default ListItem;
