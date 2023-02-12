import { State } from '../store';
import { Book } from '../store/booksApi';

type Filter = {
  readonly title: string;
  filterFn: (book: Book) => boolean;
};

const getPrice = (book: Book) => book.saleInfo?.retailPrice?.amount;

const isSaleable = (book: Book) => {
  const { saleability } = book.saleInfo;
  return (
    saleability === 'FOR_PREORDER' ||
    saleability === 'SEM CUSTO FINANCEIRO' ||
    saleability === 'FOR_SALE'
  );
};

export const PRICE_FILTERS = {
  FROM_0_TO_30: {
    title: 'de R$0 até R$30',
    filterFn: (book) => getPrice(book) && getPrice(book) < 30,
  },
  FROM_31_TO_50: {
    title: 'de R$31 até R$50',
    filterFn: (book) =>
      getPrice(book) && getPrice(book) >= 30 && getPrice(book) < 50,
  },
  FROM_51_TO_100: {
    title: 'de R$51 até R$100',
    filterFn: (book) =>
      getPrice(book) && getPrice(book) >= 50 && getPrice(book) < 100,
  },
  MORE_THAN_100: {
    title: 'Mais de R$100',
    filterFn: (book) => getPrice(book) && getPrice(book) >= 100,
  },
} as const satisfies Record<string, Filter>;

export const ORDERED_PRICE_FILTERS = [
  { id: 'FROM_0_TO_30', ...PRICE_FILTERS['FROM_0_TO_30'] },
  { id: 'FROM_31_TO_50', ...PRICE_FILTERS['FROM_31_TO_50'] },
  { id: 'FROM_51_TO_100', ...PRICE_FILTERS['FROM_51_TO_100'] },
  { id: 'MORE_THAN_100', ...PRICE_FILTERS['MORE_THAN_100'] },
] as const;

export const AVAILABILITY_FILTERS = {
  AVAILABLE: {
    title: 'Disponível',
    filterFn: (book) => isSaleable(book),
  },
  UNAVAILABLE: {
    title: 'Indisponível',
    filterFn: (book) => !isSaleable(book),
  },
} as const satisfies Record<string, Filter>;

export const ORDERED_AVAILABILITY_FILTERS = [
  { id: 'AVAILABLE', ...AVAILABILITY_FILTERS['AVAILABLE'] },
  { id: 'UNAVAILABLE', ...AVAILABILITY_FILTERS['UNAVAILABLE'] },
] as const;

export const FORMAT_FILTERS = {
  EPUB: {
    title: 'e-pub',
    filterFn: (book) => book.accessInfo.epub.isAvailable,
  },
  PDF: {
    title: 'PDF',
    filterFn: (book) => book.accessInfo.pdf.isAvailable,
  },
} as const satisfies Record<string, Filter>;

export const ORDERED_FORMAT_FILTERS = [
  { id: 'EPUB', ...FORMAT_FILTERS['EPUB'] },
  { id: 'PDF', ...FORMAT_FILTERS['PDF'] },
] as const;

export const applyFilters = (books: Book[] = [], filters: State['filters']) => {
  let filteredBooks = books;

  if (filters.price && PRICE_FILTERS[filters.price])
    filteredBooks = filteredBooks.filter(
      PRICE_FILTERS[filters.price as keyof typeof PRICE_FILTERS].filterFn
    );

  if (filters.availability && AVAILABILITY_FILTERS[filters.availability])
    filteredBooks = filteredBooks.filter(
      AVAILABILITY_FILTERS[
        filters.availability as keyof typeof AVAILABILITY_FILTERS
      ].filterFn
    );

  if (filters.format && FORMAT_FILTERS[filters.format])
    filteredBooks = filteredBooks.filter(
      FORMAT_FILTERS[filters.format as keyof typeof FORMAT_FILTERS].filterFn
    );

  return filteredBooks;
};
