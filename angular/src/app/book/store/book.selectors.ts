import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookState } from './book.state';

export const bookFeatureKey = 'book';
export const selectBooksFeature = createFeatureSelector<BookState>(bookFeatureKey);

export const selectBooks = createSelector(
  selectBooksFeature,
  (state: BookState) => state.books
);

export const selectLoading = createSelector(
  selectBooksFeature,
  (state: BookState) => state.loading
);

export const selectError = createSelector(
  selectBooksFeature,
  (state: BookState) => state.error
);
