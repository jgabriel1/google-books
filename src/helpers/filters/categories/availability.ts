import { Book, Filter } from '../types';

const isSaleable = (book: Book) => {
  const { saleability } = book.saleInfo;
  return (
    saleability === 'FOR_PREORDER' ||
    saleability === 'SEM CUSTO FINANCEIRO' ||
    saleability === 'FOR_SALE'
  );
};

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
