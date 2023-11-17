export type Table<Result> = {
  results: Result[];
  page: number;
  pages: number;
  size: number;
  total: number;
};

export type QueryParams = {
  id: string;
};
