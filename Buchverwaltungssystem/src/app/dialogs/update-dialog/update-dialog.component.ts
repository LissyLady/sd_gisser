import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Book } from 'src/app/interfaces/book';
import { BookService } from 'src/app/services/books.service';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.scss']
})
export class UpdateDialogComponent implements OnInit {

  updateBook!: Book;

  updateForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    author: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    isbn: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    pages: new FormControl(0, [Validators.required, Validators.maxLength(2000)]),
    summary: new FormControl('', [Validators.required, Validators.maxLength(200)]),
  });


  bookToUpdate!: Book;

  constructor(public dialogRef: MatDialogRef<UpdateDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Book, private contactService: BookService) {
    this.bookToUpdate = data;
  }

  ngOnInit() {
    this.updateForm.controls['title'].setValue(this.bookToUpdate.Title);
    this.updateForm.controls['author'].setValue(this.bookToUpdate.Author);
    this.updateForm.controls['isbn'].setValue(this.bookToUpdate.Isbn);
    this.updateForm.controls['pages'].setValue(this.bookToUpdate.Pages);
    this.updateForm.controls['summary'].setValue(this.bookToUpdate.Summary);
  }

  onSubmit() {

    this.updateBook = {
      Id: this.bookToUpdate.Id,
      Title: this.updateForm.controls['title'].value as string,
      Author: this.updateForm.controls['author'].value as string,
      Isbn: this.updateForm.controls['isbn'].value as string,
      Pages: this.updateForm.controls['pages'].value as number,
      Summary: this.updateForm.controls['summary'].value as string,
    };

    this.contactService.updateBook(this.updateBook);

    this.dialogRef.close();
  }
}