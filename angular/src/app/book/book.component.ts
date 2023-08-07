import { ListService, PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { BookService, BookDto, bookTypeOptions } from '@proxy/books';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // add this
import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';
import * as BookSelectors from './store/book.selectors';
import * as BookActions from './store/book.actions';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  providers: [
    ListService,
    { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }
  ],
})
export class BookComponent implements OnInit {
  // books$: Observable<BookDto[]> = this.store.select(BookSelectors.selectBooks);
  book = { items: [], totalCount: 0 } as PagedResultDto<BookDto>;
  selectedBook = {} as BookDto;

  form: FormGroup;

  bookTypes = bookTypeOptions;

  isModalOpen = false;

  constructor(
    // private store: Store,
    public readonly list: ListService,
    private bookService: BookService,
    private confirmation: ConfirmationService,
    private fb: FormBuilder // inject FormBuilder
  ) {}

  ngOnInit() {
    // this.store.dispatch(BookActions.loadBooks());
    // this.store.select(BookSelectors.selectBooks).pipe().subscribe((data: BookDto[]) => {
    //   console.log(data)
    // })
    const bookStreamCreator = (query: PagedAndSortedResultRequestDto) => this.bookService.getList(query);

    this.list.hookToQuery(bookStreamCreator).subscribe((response) => {
      this.book = response;
    });
  }

  // add buildForm method
  buildForm() {
    this.form = this.fb.group({
      name: [this.selectedBook.name || '', Validators.required],
      type: [this.selectedBook.type || null, Validators.required],
      publishDate: [
        this.selectedBook.publishDate ? new Date(this.selectedBook.publishDate) : null,
        Validators.required,
      ],
      price: [this.selectedBook.price || null, Validators.required],
    });
  }

  createBook() {
    this.selectedBook = {} as BookDto;
    this.buildForm(); // add this line
    this.isModalOpen = true;
  }

  editBook(id: string) {
    this.bookService.get(id).subscribe((book) => {
      this.selectedBook = book;
      this.buildForm();
      this.isModalOpen = true;
    });
  }

  // add save method
  save() {
    if (this.form.invalid) {
      return;
    }

    const request = this.selectedBook.id
    ? this.bookService.update(this.selectedBook.id, this.form.value)
    : this.bookService.create(this.form.value);

    request.subscribe(() => {
      this.isModalOpen = false;
      this.form.reset();
      this.list.get();
    });
  }

  delete(id: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.bookService.delete(id).subscribe(() => this.list.get());
      }
    });
  }
}
