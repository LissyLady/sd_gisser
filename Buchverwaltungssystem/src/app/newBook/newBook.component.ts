import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from '../interfaces/book';
import { BookService } from '../services/books.service';

function isNumber(control: AbstractControl): { [key: string]: boolean } | null {
  if (isNaN(control.value)) {
    return { 'notANumber': true };
  }
  return null;
}


@Component({
  selector: 'app-newBook',
  templateUrl: './newBook.component.html',
  styleUrls: ['./newBook.component.scss']
})

export class NewBookComponent {

  newBook!: Book;

  bookForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    author: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    isbn: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    pages: new FormControl(0, [Validators.required, Validators.maxLength(2000), isNumber],),
    summary: new FormControl('', [Validators.required, Validators.maxLength(200)]),
  });

  constructor(private router: Router, private bookService: BookService) { }

  onSubmit() {

    this.newBook = {
      Id: 0,
      Title: this.bookForm.controls['title'].value as string,
      Author: this.bookForm.controls['author'].value as string,
      Isbn: this.bookForm.controls['isbn'].value as string,
      Pages: this.bookForm.controls['pages'].value as number,
      Summary: this.bookForm.controls['summary'].value as string
    };

    this.bookService.createBook(this.newBook);

    this.router.navigate(['/books']);
  }

  onCancel() {
    this.router.navigate(['/books']);
  }
}
