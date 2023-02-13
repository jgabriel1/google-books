import { State } from '../../store';
import { AVAILABILITY_FILTERS } from './categories/availability';
import { FORMAT_FILTERS } from './categories/format';
import { PRICE_FILTERS } from './categories/price';
import { Book } from './types';

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

export * from './categories/availability';
export * from './categories/format';
export * from './categories/price';
