// reducers/index.ts
import { ActionReducerMap } from '@ngrx/store';
import { RootState } from './app.state';
import { bookReducer } from 'src/app/book/store/book.reducer';

export const appReducers: ActionReducerMap<RootState> = {
  bookState: bookReducer
};
