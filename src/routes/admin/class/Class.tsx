import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import Section from '../../../components/Section';
import Header from '../../../components/Header';
import Contents from './Contents';
import BlockDrag from './components/BlockDrag';
import LargeDropZone from './components/LargeDropZone';

// @ts-ignore
import test from './test.json';

type Props = {
  new?: boolean;
};

const EditorContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 250px) minmax(0, 1fr) minmax(0, 250px);
  grid-gap: 12px;
  margin: 24px auto 0;
  width: 100%;
  padding: 0 48px;
  align-items: start;
`;

const ToolboxContainer = styled.div`
  width: 100%;
  background: #201e2c;
  border-radius: 8px;
  padding: 12px;

  h2 {
    color: #fff;
    font-size: 18px;
    width: 100%;
    margin: 0 auto;
    text-align: center;
  }
`;

const ToolboxGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-gap: 8px;
  margin-top: 12px;
`;

const blocks = [
  {
    title: 'Heading',
    id: 'heading',
    icon: 'title',
  },
  {
    title: 'Paragraph',
    id: 'markdown',
    icon: 'notes',
  },
  {
    title: 'Video',
    id: 'video',
    icon: 'ondemand_video',
  },
  {
    title: 'Quiz',
    id: 'quiz',
    icon: 'list_alt',
  },
];

// Use Vest
// Figure out what fields are needed

const AdminClass = (props: Props) => {
  const [activeItem, setActiveItem] = useState('_details');
  const [details, setDetails] = useState({});
  const [contents, setContents] = useState(test.units);

  // Fetch class details
  useEffect(() => {}, []);

  // Update db on content change
  useEffect(() => {}, []);

  console.log(contents);

  /** TODO:
   *  1. Rewrite the list item components to
   *     handle adding
   *  2. Add unit
   *  3. Add content
   *  4. Context provider
   */

  return (
    <Section>
      <Header />
      <DndProvider backend={HTML5Backend}>
        <EditorContainer>
          <Contents
            active={activeItem}
            contents={contents.map((unit) => ({
              id: unit.id,
              title: unit.title,
              children: unit.contents,
            }))}
            onAddContent={() => {}}
            onChange={setActiveItem}
          />
          <div>
            {activeItem !== '_details' && (
              <LargeDropZone
                onAdd={(id) => {
                  setContents((s) => [...s, { type: id }]);
                }}
              />
            )}
          </div>
          {activeItem !== '_details' ? (
            <ToolboxContainer>
              <h2>Blocks</h2>
              <ToolboxGrid>
                {blocks.map((block) => (
                  <BlockDrag {...block} />
                ))}
              </ToolboxGrid>
            </ToolboxContainer>
          ) : (
            <div />
          )}
        </EditorContainer>
      </DndProvider>
    </Section>
  );
};

export default AdminClass;
