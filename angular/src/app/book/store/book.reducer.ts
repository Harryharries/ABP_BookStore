import { Action, MetaReducer, createReducer, on } from '@ngrx/store';
import * as BookActions from './book.actions';
import { BookState, initialState } from './book.state';

export const bookReducer = createReducer(
  initialState,

  on(BookActions.loadBooks, (state): BookState => {
    return { ...state, loading: true, error: null };
  }),

  on(BookActions.loadBooksSuccess, (state, action): BookState => {
    return { ...state, books: action.books, loading: false };
  }),

  on(BookActions.addBookSuccess, (state): BookState => {
    return { ...state, loading: false };
  }),

  on(BookActions.updateBookSuccess, (state): BookState => {
    return { ...state, loading: false };
  }),

  on(BookActions.deleteBookSuccess, (state): BookState => {
    return { ...state, loading: false };
  }),

  on(BookActions.loadBooksFailure, BookActions.addBookFailure,
    BookActions.updateBookFailure, BookActions.deleteBookFailure,
    (state, action): BookState => {
    return { ...state, loading: false, error: action.error };
  }),
);


export function BookReducer(state: BookState | undefined, action: Action) {
  return bookReducer(state, action);
}

export const metaReducers: MetaReducer<BookState>[] = [];
