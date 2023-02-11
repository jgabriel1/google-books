import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type Saleability =
  | 'FOR_SALE'
  | 'SEM CUSTO FINANCEIRO'
  | 'NOT_FOR_SALE'
  | 'FOR_PREORDER';

export type Book = {
  id: string;
  volumeInfo: {
    title: string;
    imageLinks: {
      thumbnail: string;
    };
    authors: string[];
  };
  saleInfo: {
    saleability: Saleability;
    retailPrice: {
      amount: number;
      currencyCode: string;
    };
  };
  accessInfo: {
    epub: {
      isAvailable: boolean;
    };
    pdf: {
      isAvailable: boolean;
    };
  };
};

type BooksQueryParams = {
  query: string;
  page: number;
};

type BooksResponse = {
  items: Book[];
  totalItems: number;
};

const PAGE_SIZE = 40;

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://www.googleapis.com/books/v1/volumes',
  }),
  endpoints: (builder) => ({
    getBooks: builder.query<Book[], BooksQueryParams>({
      query: ({ query, page }) =>
        `?q=${query}&startIndex=${page * PAGE_SIZE}&maxResults=${PAGE_SIZE}`,
      transformResponse: (responseData: BooksResponse) => responseData.items,
      serializeQueryArgs: ({ endpointName, queryArgs }) =>
        `${endpointName}-${queryArgs.query}`,
      merge: (currentCache, newItems) => {
        const existingIds = new Set(currentCache.map((item) => item.id));
        currentCache.push(
          ...newItems.filter((item) => !existingIds.has(item.id))
        );
      },
      forceRefetch: ({ currentArg, previousArg }) =>
        currentArg?.page !== previousArg?.page,
    }),
  }),
});
