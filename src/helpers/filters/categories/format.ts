import { Filter } from '../types';

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
