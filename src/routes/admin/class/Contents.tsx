import React, { useState } from 'react';
import styled from 'styled-components';

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

const ListHeaderRow = styled(Row)`
  padding: 12px 0;
  border-radius: 8px;
  background: ${(props) => props.active && '#084cfe'};
  color: ${(props) => (props.active ? '#fff' : '#242d2f')};
`;

const AddRow = styled(Row)`
  justify-content: space-between;
`;

const ListItem = styled.li`
  margin-bottom: 12px;
  cursor: pointer;
  background: ${(props) => props.active && '#084cfe'};
  color: ${(props) => (props.active ? '#fff' : '#242d2f')};
  border-radius: 8px;
  padding: 12px;
  user-select: none;
`;

const List = styled.ul`
  list-style: none;

  ul ${ListItem} {
    padding-left: 32px;
  }
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
        [item.title]: true,
      }),
      {},
    ),
  );

  return (
    <aside>
      <List>
        <ListItem
          key={'_details'}
          onClick={() => props.onChange('_details')}
          active={props.active === '_details'}
        >
          <Row>
            <span className="material-icons">info</span>
            Class Description
          </Row>
        </ListItem>
      </List>
      <AddRow>
        <ContentHeader>Contents</ContentHeader> <Button>+</Button>
      </AddRow>
      {!!props.contents.length && (
        <List>
          {props.contents.map((item) => (
            <ListItem role="button" key={item.id}>
              <ListHeaderRow
                col={4}
                tabIndex={0}
                onClick={() => props.onChange(item.id)}
                active={props.active === item.id}
              >
                <span
                  role="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedItems((s) => ({ ...s, [item.title]: !s[item.title] }));
                  }}
                  className="material-icons"
                >
                  {expandedItems[item.title] ? 'expand_less' : 'expand_more'}
                </span>
                <span className="material-icons">folder</span>
                {item.title}
              </ListHeaderRow>
              {hasChildren(item) && expandedItems[item.title] && (
                <List>
                  {item.children.map((child) => (
                    <ListItem
                      key={`${item.id}.${child.id}`}
                      onClick={() => props.onChange(`${item.id}.${child.id}`)}
                      role="button"
                      tabIndex={0}
                      active={props.active === `${item.id}.${child.id}`}
                    >
                      <Row>
                        <span className="material-icons">description</span>
                        {child.title}
                      </Row>
                    </ListItem>
                  ))}
                </List>
              )}
            </ListItem>
          ))}
        </List>
      )}
    </aside>
  );
};

export default Contents;
