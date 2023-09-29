import { TestBed } from '@angular/core/testing';
import { BookService } from './books.service';

describe('BookService', () => {
  let service: BookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the list of books', () => {
    const books = service.getContacts();
    expect(books.length).toBeGreaterThan(0);
  });

  it('should create a new book', () => {
    const initialLength = service.getContacts().length;
    const newBook = {
      Id: 2,
      Title: 'New Book',
      Author: 'New Author',
      Isbn: '67890',
      Pages: 50,
      Summary: 'Summary of the new book',
    };
    service.createBook(newBook);
    const updatedLength = service.getContacts().length;
    expect(updatedLength).toBe(initialLength + 1);
  });

  it('should update an existing book', () => {
    const updatedBook = {
      Id: 1,
      Title: 'Updated Title',
      Author: 'Updated Author',
      Isbn: '54321',
      Pages: 30,
      Summary: 'Updated Summary',
    };
    service.updateBook(updatedBook);
    const updatedBookFromService = service.getContacts().find((book) => book.Id === 1);
    expect(updatedBookFromService).toEqual(updatedBook);
  });

  it('should delete an existing book', () => {
    const initialLength = service.getContacts().length;
    const bookIdToDelete = 1;
    service.deleteBook(bookIdToDelete);
    const updatedLength = service.getContacts().length;
    const deletedBook = service.getContacts().find((book) => book.Id === bookIdToDelete);
    expect(updatedLength).toBe(initialLength - 1);
    expect(deletedBook).toBeUndefined();
  });
});
