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
  content: string;
} & (
  | { type: 'text' | 'introduction' }
  | { type: 'video'; platform: 'youtube' | 'vimeo'; videoID: string }
  | { type: 'quiz'; quizID: string }
);
