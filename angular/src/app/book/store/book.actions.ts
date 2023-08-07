import { createAction, props } from '@ngrx/store';
import { BookDto, CreateUpdateBookDto } from '@proxy/books';

export const loadBooks = createAction(
  '[Book] Load Books'
);

export const loadBooksSuccess = createAction(
  '[Book] Load Books Success',
  props<{ books: BookDto[] }>()
);

export const loadBooksFailure = createAction(
  '[Book] Load Books Failure',
  props<{ error: any }>()
);

export const addBook = createAction(
  '[Book] Add Book',
  props<{ book: CreateUpdateBookDto }>()
);

export const addBookSuccess = createAction(
  '[Book] Add Book Success',
  props<{ book: BookDto }>()
);

export const addBookFailure = createAction(
  '[Book] Add Book Failure',
  props<{ error: any }>()
);

export const updateBook = createAction(
  '[Book] Update Book',
  props<{ id: string, book: CreateUpdateBookDto }>() // include id in payload
);

export const updateBookSuccess = createAction(
  '[Book] Update Book Success',
  props<{ id: string, book: BookDto }>() // include id in payload
);

export const updateBookFailure = createAction(
  '[Book] Update Book Failure',
  props<{ error: any }>()
);

export const deleteBook = createAction(
  '[Book] Delete Book',
  props<{ id: string }>()
);

export const deleteBookSuccess = createAction(
  '[Book] Delete Book Success',
  props<{ id: string }>() // include id in payload
);

export const deleteBookFailure = createAction(
  '[Book] Delete Book Failure',
  props<{ error: any }>()
);
