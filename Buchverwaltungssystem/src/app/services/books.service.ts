import { Injectable } from '@angular/core';
import { Book } from '../interfaces/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  books: Book[] = [
    { Id: 1, Title: 'Test', Author: 'Buch', Isbn: '12345', Pages: 20, Summary: 'Zusammenfasung des Buches' },
  ]

  constructor() { }

  getContacts() {
    return this.books;
  }

  createBook(newBook: Book) {

    let highestId = 0;
    this.books.forEach(obj => {
      if (obj.Id > highestId) {
        highestId = obj.Id;
      }
    })

    this.books.push(
      {
        Id: highestId + 1,
        Title: newBook.Title,
        Author: newBook.Author,
        Isbn: newBook.Isbn,
        Pages: newBook.Pages,
        Summary: newBook.Summary
      }
    );

  }

  updateBook(updateBook: Book) {
    const index = this.books.findIndex(b => b.Id == updateBook.Id);
    this.books[index].Title = updateBook.Title;
    this.books[index].Author = updateBook.Author;
    this.books[index].Isbn = updateBook.Isbn;
    this.books[index].Pages = updateBook.Pages;
    this.books[index].Summary = updateBook.Summary;
  }

  deleteBook(id: number) {
    const index = this.books.findIndex(b => b.Id == id);
    this.books.splice(index, 1);
  }
}
