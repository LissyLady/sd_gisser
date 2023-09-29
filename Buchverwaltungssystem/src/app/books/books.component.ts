import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/books.service';
import { Book } from '../interfaces/book';
import { MatDialog } from '@angular/material/dialog';
import { UpdateDialogComponent } from '../dialogs/update-dialog/update-dialog.component';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
})
export class BooksComponent implements OnInit {

  booksDataArray: Book[] = [];

  dataSource = new MatTableDataSource<Book>();

  columnsToDisplay = ['Title', 'Autor', 'ISBN', 'Seitenanzahl', 'Zusammenfassung', 'Bearbeiten', 'Delete'];

  constructor(private booksService: BookService, private dialog: MatDialog) {

  }

  ngOnInit() {
    this.booksDataArray = this.booksService.getContacts();
    this.dataSource = new MatTableDataSource<Book>(this.booksDataArray);
    console.log(this.booksDataArray);
  }

  onUpdate(book: Book) {
    let dialogRef = this.dialog.open(UpdateDialogComponent, {
      height: '500px',
      width: '500px',
      data: book,
    });
  }

  onDelete(book: Book) {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      height: '500px',
      width: '500px',
      data: book,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.updateDataSource(this.booksDataArray);
    });
  }

  updateDataSource(dataArray: Book[]) {
    this.dataSource.connect().next(dataArray);
  }

}
