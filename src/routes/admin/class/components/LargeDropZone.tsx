import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDrop } from 'react-dnd';

const DropZone = styled.div`
  border-radius: 8px;
  border: 4px dashed ${(props) => (props.highlighted ? '#092dfd' : '#d0d4d7')};
  padding: 48px 24px;
  text-align: center;
  color: ${(props) => (props.highlighted ? '#092dfd' : '#d0d4d7')};
`;

type Props = {
  onAdd: (id: string) => void;
};

const LargeDropZone = (props: Props) => {
  const [collected, drop] = useDrop(() => ({
    accept: 'block',
    collect: (monitor) => ({
      highlighted: monitor.canDrop() && monitor.isOver(),
      dropped: monitor.didDrop(),
      item: monitor.getItem(),
    }),
  }));

  useEffect(() => {
    if (collected.dropped) {
      // @ts-ignore
      props.onAdd(collected.item.id);
    }
  }, [collected.dropped, collected.item]);

  return (
    <DropZone ref={drop} {...collected}>
      Drop New Blocks Here
    </DropZone>
  );
};

export default LargeDropZone;
