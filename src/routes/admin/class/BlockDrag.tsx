import React from 'react';
import styled from 'styled-components';
import { useDrag } from 'react-dnd';

type Props = {
  id: string;
  title: string;
  icon: string;
};

const Card = styled.div`
  background: #fff;
  --shadow-color: 253deg 29% 3%;
  box-shadow: 0 0.1px 0.1px hsl(var(--shadow-color) / 0.4),
    0.1px 0.4px 0.4px -1px hsl(var(--shadow-color) / 0.36),
    0.3px 0.9px 1px -2px hsl(var(--shadow-color) / 0.33),
    0.7px 2.3px 2.5px -3px hsl(var(--shadow-color) / 0.3);
  border-radius: 8px;
  cursor: ${(props) => (props.dragging ? 'grabbing' : 'grab')};
  color: #191721;
  padding: 12px 8px;

  h2,
  span {
    display: block;
    margin: 0 auto;
    width: max-content;
  }

  h2 {
    color: #393741 !important;
    font-size: 14px !important;
  }

  span {
    color: #191721 !important;
    font-size: 48px;
    margin-bottom: 12px;
  }
`;

const BlockDrag = (props: Props) => {
  const [collected, drag, dragPreview] = useDrag(() => ({
    type: 'block',
    item: {
      id: props.id,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return collected.isDragging ? (
    <Card ref={dragPreview} dragging>
      <span className="material-icons-outlined">{props.icon}</span>
      <h2>{props.title}</h2>
    </Card>
  ) : (
    <Card ref={drag} {...collected}>
      <span className="material-icons-outlined">{props.icon}</span>
      <h2>{props.title}</h2>
    </Card>
  );
};

export default BlockDrag;
