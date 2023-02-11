import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { booksApi } from './booksApi';
import { booksPaginationReducer } from './booksPagination';
import { filtersReducer } from './filters';

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    [booksApi.reducerPath]: booksApi.reducer,
    booksPagination: booksPaginationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware),
});

setupListeners(store.dispatch);

export type State = ReturnType<typeof store.getState>;
