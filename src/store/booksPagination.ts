import { createAction, createReducer } from '@reduxjs/toolkit';

const initialBooksPaginationState = {
  cachedPages: {},
};

export const initPagination = createAction<string>(
  'booksPagination/initPagination'
);
export const increasePagination = createAction<string>(
  'booksPagination/increasePagination'
);

export const booksPaginationReducer = createReducer(
  initialBooksPaginationState,
  (builder) =>
    builder
      .addCase(initPagination, (state, action) => {
        const queryKey = action.payload;
        if (!state.cachedPages[queryKey]) {
          state.cachedPages[queryKey] = 0;
        }
      })
      .addCase(increasePagination, (state, action) => {
        const queryKey = action.payload;
        state.cachedPages[queryKey]++;
      })
);
