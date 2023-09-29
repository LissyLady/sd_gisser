import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { NewBookComponent } from './newBook/newBook.component';

const routes: Routes = [
  { path: 'books', component: BooksComponent },
  { path: 'newbook', component: NewBookComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
