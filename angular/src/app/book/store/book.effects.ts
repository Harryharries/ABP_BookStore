import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { BookDto, BookService } from '@proxy/books';
import * as BookActions from './book.actions';
import { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';

@Injectable()
export class BookEffects {

  loadBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookActions.loadBooks),
      switchMap(() =>
        this.bookService.getList({} as PagedAndSortedResultRequestDto).pipe(
          map((response : PagedResultDto<BookDto>) => BookActions.loadBooksSuccess({ books: response.items })),
          catchError(error => of(BookActions.loadBooksFailure({ error })))
        )
      )
    );
  });


  addBook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookActions.addBook),
      mergeMap((action) =>
        this.bookService.create(action.book).pipe(
          map((book: BookDto) => BookActions.addBookSuccess({ book })),
          catchError(error => of(BookActions.addBookFailure({ error })))
        )
      )
    );
  });

  updateBook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookActions.updateBook),
      mergeMap((action) =>
        this.bookService.update(action.id, action.book).pipe(
          map((book: BookDto) => BookActions.updateBookSuccess({ id: action.id, book })),
          catchError(error => of(BookActions.updateBookFailure({ error })))
        )
      )
    );
  });

  deleteBook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookActions.deleteBook),
      mergeMap((action) =>
        this.bookService.delete(action.id).pipe(
          map(() => BookActions.deleteBookSuccess({ id: action.id })),
          catchError(error => of(BookActions.deleteBookFailure({ error })))
        )
      )
    );
  });

// Trigger loadBooks action after add, update, or delete operation
refetchBooks$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(BookActions.addBookSuccess, BookActions.updateBookSuccess, BookActions.deleteBookSuccess),
    switchMap(() => of(BookActions.loadBooks()))
  );
});

  constructor(
    private actions$: Actions,
    private bookService: BookService
  ) {}
}
