import React, { useState } from 'react';
import styled from 'styled-components';

import ListItem from './components/ListItem';

type Item = {
  title: string;
  id: string;
  children?: Item[];
};

type Props = {
  active: string;
  contents: Item[];
  onAddContent: (parentID?: string) => void;
  onChange: (id: string) => void;
};

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.col || 2}, minmax(0, max-content));
  grid-gap: 8px;
  align-items: center;
`;

const AddRow = styled(Row)`
  justify-content: space-between;
`;

const Button = styled.button`
  appearance: none;
  border: 0;
  background: transparent;
  padding: 8px;
  margin-right: -8px;
  cursor: pointer;
  font-size: 24px;
  color: #929496;
`;

const ContentHeader = styled.strong`
  color: #929496;
  padding-left: 12px;
`;

const hasChildren = (item) => item.children && item.children.length > 0;

const Contents = (props: Props) => {
  const [expandedItems, setExpandedItems] = useState(
    props.contents.reduce(
      (acc, item) => ({
        ...acc,
        [item.id]: true,
      }),
      {},
    ),
  );

  return (
    <aside>
      <ListItem
        active={props.active === '_details'}
        icon="info"
        title="Class Description"
        onClick={() => props.onChange('_details')}
      />
      <AddRow>
        <ContentHeader>Contents</ContentHeader> <Button>+</Button>
      </AddRow>
      {!!props.contents.length && (
        <div>
          {props.contents.map((item) => (
            <>
              <ListItem
                active={item.id === props.active}
                key={item.id}
                title={item.title}
                open={expandedItems[item.id]}
                onClick={() => props.onChange(item.id)}
                onCollapse={() => setExpandedItems((s) => ({ ...s, [item.id]: !s[item.id] }))}
                onContext={() => {}}
              />
              <>
                {hasChildren(item) &&
                  item.children.map((child) => {
                    const id = `${item.id}.${child.id}`;
                    return (
                      <ListItem
                        active={id === props.active}
                        key={id}
                        title={child.title}
                        onClick={() => props.onChange(id)}
                        onContext={() => {}}
                      />
                    );
                  })}
              </>
            </>
          ))}
        </div>
      )}
    </aside>
  );
};

export default Contents;
