import { createAction, createReducer } from '@reduxjs/toolkit';

export const setPriceFilter = createAction<string | undefined>(
  'filters/setPriceFilter'
);
export const setAvailabilityFilter = createAction<string | undefined>(
  'filters/setAvailabilityFilter'
);
export const setFormatFilter = createAction<string | undefined>(
  'filters/setFormatFilter'
);
export const clearFilters = createAction('filters/clearFilters');

const initialFiltersState = {
  price: undefined,
  availability: undefined,
  format: undefined,
};

export const filtersReducer = createReducer(initialFiltersState, (builder) =>
  builder
    .addCase(setPriceFilter, (state, action) => {
      state.price = action.payload;
    })
    .addCase(setAvailabilityFilter, (state, action) => {
      state.availability = action.payload;
    })
    .addCase(setFormatFilter, (state, action) => {
      state.format = action.payload;
    })
    .addCase(clearFilters, (state) => {
      Object.keys(state).forEach((key) => {
        state[key] = undefined;
      });
    })
);
