export type JsonAPI<A> = {
  data?: DataItem<A> | DataItem<A>[];
  errors: JsonAPIError[];
};

export type DataItem<A> = {
  type: string;
  id?: string;
  attributes?: A;
};

export type JsonAPIError = {};

// Class, but avoiding a reserved word
export type Course = {
  title: string;
  subtitle: string;
  estimatedLength: number;
};

export type Unit = {
  title: string;
  estimatedLength: number;
  videoCount: number;
  quizCount: number;
  readingCount: number;
} & ({ isIntroduction: true; sequence: 0 } | { isIntroduction: false; sequence: number });

export type Content = {
  title: string;
  sequence: number;
  blocks: Block[];
};

type Video = {
  type: 'video';
  platform: 'youtube' | 'vimeo';
  videoID: string;
};

type Markdown = {
  type: 'markdown';
  content: string;
};

type Heading = {
  type: 'heading';
  title: string;
};

type Quiz = {
  type: 'quiz';
  requiredRight: number;
  skippable: boolean;
};

export type Block = {
  id: string;
} & (Video | Markdown | Heading | Quiz);
