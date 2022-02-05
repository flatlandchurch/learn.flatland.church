import React, { Ref, useState } from 'react';
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
  padding-right: 12px;
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

const ContextMenu = styled.div`
  --shadow-color: 240deg 2% 71%;
  display: block;
  position: absolute;
  z-index: 1000;
  box-shadow: 0px 0.1px 0.1px hsl(var(--shadow-color) / 0.09),
    0px 0.8px 1.1px -0.1px hsl(var(--shadow-color) / 0.12),
    0px 1.4px 1.9px -0.3px hsl(var(--shadow-color) / 0.15),
    0.1px 2.1px 2.8px -0.4px hsl(var(--shadow-color) / 0.18),
    0.1px 3.1px 4.2px -0.6px hsl(var(--shadow-color) / 0.21),
    0.1px 4.5px 6px -0.7px hsl(var(--shadow-color) / 0.24),
    0.2px 6.4px 8.6px -0.9px hsl(var(--shadow-color) / 0.27),
    0.2px 9.1px 12.2px -1px hsl(var(--shadow-color) / 0.3);
`;

const hasChildren = (item) => item.children && item.children.length > 0;

type ContextMenu = {
  ref: Ref<unknown>;
  type: 'unit' | 'content';
};

const Contents = (props: Props) => {
  const [activeContextMenu, setActiveContextMenu] = useState<ContextMenu | null>(null);
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
                onContext={(ref) =>
                  setActiveContextMenu({
                    type: 'unit',
                    ref,
                  })
                }
              />
              <>
                {hasChildren(item) &&
                  expandedItems[item.id] &&
                  item.children.map((child) => {
                    const id = `${item.id}.${child.id}`;
                    return (
                      <ListItem
                        active={id === props.active}
                        key={id}
                        title={child.title}
                        onClick={() => props.onChange(id)}
                        onContext={(ref) =>
                          setActiveContextMenu({
                            type: 'content',
                            ref,
                          })
                        }
                      />
                    );
                  })}
              </>
            </>
          ))}
        </div>
      )}
      {!!activeContextMenu && (
        <ContextMenu>
          {activeContextMenu.type === 'unit' && <button>Add Content Item</button>}
          <button>Delete {activeContextMenu.type === 'unit' ? 'Unit' : 'Content Item'}</button>
        </ContextMenu>
      )}
    </aside>
  );
};

export default Contents;
