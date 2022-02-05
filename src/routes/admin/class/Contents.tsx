import React, { createRef, Ref, useEffect, useState } from 'react';
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
  box-shadow: 0 0.1px 0.1px hsl(var(--shadow-color) / 0.09),
    0 0.8px 1.1px -0.1px hsl(var(--shadow-color) / 0.12),
    0 1.4px 1.9px -0.3px hsl(var(--shadow-color) / 0.15),
    0.1px 2.1px 2.8px -0.4px hsl(var(--shadow-color) / 0.18),
    0.1px 3.1px 4.2px -0.6px hsl(var(--shadow-color) / 0.21),
    0.1px 4.5px 6px -0.7px hsl(var(--shadow-color) / 0.24),
    0.2px 6.4px 8.6px -0.9px hsl(var(--shadow-color) / 0.27),
    0.2px 9.1px 12.2px -1px hsl(var(--shadow-color) / 0.3);
  border-radius: 8px;
  width: max-content;
  background: #fff;
`;

const MenuButton = styled.button`
  appearance: none;
  border: 0;
  padding: 12px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  font-size: inherit;
  color: inherit;
  display: block;
  cursor: pointer;
  background: transparent;

  &:not(:last-child) {
    border-bottom: 1px solid #d0d4d7;
  }
`;

const DangerMenuButton = styled(MenuButton)`
  color: #cc3340;
`;

const hasChildren = (item) => item.children && item.children.length > 0;

type ActiveContextMenu = {
  ref: Ref<unknown>;
  type: 'unit' | 'content';
};

const getPositionStyled = (ref: Ref<unknown>) => {
  const rect = ref.current.getBoundingClientRect();
  return {
    left: rect.right - 24,
    top: rect.bottom,
  };
};

const Contents = (props: Props) => {
  const menuRef = createRef();
  const [activeContextMenu, setActiveContextMenu] = useState<ActiveContextMenu | null>(null);
  const [expandedItems, setExpandedItems] = useState(
    props.contents.reduce(
      (acc, item) => ({
        ...acc,
        [item.id]: true,
      }),
      {},
    ),
  );

  useEffect(() => {
    const cb = (e: MouseEvent) => {
      if (menuRef && menuRef.current) {
        if (!menuRef.current.contains(e.target)) {
          setActiveContextMenu(null);
        }
      }
    };
    window.addEventListener('click', cb);
    return () => window.removeEventListener('click', cb);
  }, [menuRef]);

  useEffect(() => {
    const cb = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !!activeContextMenu) {
        setActiveContextMenu(null);
      }
    };
    window.addEventListener('keydown', cb);
    return () => window.removeEventListener('keydown', cb);
  }, [activeContextMenu]);

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
        <ContextMenu ref={menuRef} style={getPositionStyled(activeContextMenu.ref)}>
          {activeContextMenu.type === 'unit' && <MenuButton>Add Content Item</MenuButton>}
          <DangerMenuButton>
            Delete {activeContextMenu.type === 'unit' ? 'Unit' : 'Content Item'}
          </DangerMenuButton>
        </ContextMenu>
      )}
    </aside>
  );
};

export default Contents;
