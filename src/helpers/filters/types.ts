import { Book } from '../../store/booksApi';

export type Filter = {
  readonly title: string;
  filterFn: (book: Book) => boolean;
};

export type { Book };
