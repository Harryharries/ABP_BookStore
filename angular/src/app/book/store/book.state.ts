import { BookDto } from '@proxy/books';

export interface BookState {
  books: BookDto[];
  loading: boolean;
  error: any;
}

export const initialState: BookState = {
  books: [],
  loading: false,
  error: null
};
