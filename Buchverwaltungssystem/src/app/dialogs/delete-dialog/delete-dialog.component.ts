import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Book } from 'src/app/interfaces/book';
import { BookService } from 'src/app/services/books.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent {

  bookToDelete!: Book;

  deleteForm = new FormGroup({
    title: new FormControl({ value: '', disabled: true }),
    author: new FormControl({ value: '', disabled: true }),
    isbn: new FormControl({ value: '', disabled: true }),
    pages: new FormControl({ value: 0, disabled: true }),
    summary: new FormControl({ value: '', disabled: true }),
  });

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Book, private bookService: BookService) {
    this.bookToDelete = data;
  }

  ngOnInit() {
    this.deleteForm.controls['title'].setValue(this.bookToDelete.Title);
    this.deleteForm.controls['author'].setValue(this.bookToDelete.Author);
    this.deleteForm.controls['isbn'].setValue(this.bookToDelete.Isbn);
    this.deleteForm.controls['pages'].setValue(this.bookToDelete.Pages);
    this.deleteForm.controls['summary'].setValue(this.bookToDelete.Summary);
  }

  onSubmit() {

    let bookId = this.bookToDelete.Id;
    this.bookService.deleteBook(bookId);

    this.dialogRef.close();
  }

}
