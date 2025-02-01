import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SortableColumn, SortIcon, TableModule } from 'primeng/table';
import { AppComponent } from './app.component';
import { UserComponent } from './Pages/user/user.component';
import { PaginatorModule } from 'primeng/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent
  ],
  imports: [
    TableModule,
    PaginatorModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
