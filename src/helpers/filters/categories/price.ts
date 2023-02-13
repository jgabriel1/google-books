import { Book, Filter } from '../types';

const getPrice = (book: Book) => book.saleInfo?.retailPrice?.amount;

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
