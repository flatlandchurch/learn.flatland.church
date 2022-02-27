import React, { IntrinsicElements, useContext, useState } from 'react';
import { klona } from 'klona';

type ContentContextType = {
  content: {
    title: string;
    subtitle: string;
    description: string;
    units: [];
  };
  addBlockToContent: (id: string, block: { type: string }) => void;
};

export const ContentContext = React.createContext<Partial<ContentContextType>>({
  content: {
    title: '',
    subtitle: '',
    description: '',
    units: [],
  },
});

type ProviderProps = IntrinsicElements & {};

const ContentProvider = (props: ProviderProps) => {
  const [contents, setContents] = useState({});

  const addBlockToContent = (id: string, block) => {
    const [parent, child] = id.split('.');
    const clonedContents = klona(contents);

    const parentIdx = clonedContents.findIndex((item) => item.id === parent);

    if (!child) {
      clonedContents[parentIdx].blocks.push({ type: block.type });
    } else {
      const childIdx = clonedContents[parentIdx].contents.findIndex((item) => item.id === child);
      clonedContents[parentIdx].contents[childIdx].blocks.push({ type: block.type });
    }

    setContents(clonedContents);
  };

  // Units/Contents always start with a `heading` block

  const updateBlock = (parentID: string, id: string) => {};

  const addUnit = () => {};

  const addContent = () => {};

  const value = {
    addBlockToContent,
  };

  return <ContentContext.Provider value={value}>{props.children}</ContentContext.Provider>;
};

export const useContent = () => useContext(ContentContext);

export default ContentProvider;

// addUnit

// addContent
