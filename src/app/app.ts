import { Component, Inject, OnInit, signal, AfterViewInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEdit } from './emp-add-edit/emp-add-edit';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Employee } from './services/employee';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DialogRef } from '@angular/cdk/dialog';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('crud-app');

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'package', 'experience', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private _dialog: MatDialog, private _empService: Employee) {

  }

  ngOnInit(): void {
    this.getEmployeeList();
  }

  openEditAddForm() {
    const dialogRef = this._dialog.open(EmpAddEdit)
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      }
    })
  }

  getEmployeeList() {
    this._empService.getEmployeeList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        console.log(res);
      },
      error: console.log
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id: number) {
    this._empService.deleteEmployee(id).subscribe({
      next: (res) => {
        alert('Employee deleted successfully');
        this.getEmployeeList();
      },
      error: console.log
    })
  }

  openEditForm(data: any) {
    this._dialog.open(EmpAddEdit, {
      data,
    }).afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      }
    })
  }
}