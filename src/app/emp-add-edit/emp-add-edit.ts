import { Component } from '@angular/core';
import { MatDialogModule } from "@angular/material/dialog";
import { MatAnchor } from "@angular/material/button";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { Employee } from '../services/employee';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-emp-add-edit',
  imports: [MatDialogModule, MatAnchor,
    MatFormField, MatLabel, MatIcon,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './emp-add-edit.html',
  styleUrl: './emp-add-edit.scss',
})
export class EmpAddEdit {

  empForm: FormGroup;

  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate'
  ]
  constructor(private _fb: FormBuilder, private _empService: Employee, private _dialogRef: DialogRef<EmpAddEdit>) {
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: ''
    })
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      this._empService.addEmployee(this.empForm.value).subscribe({
        next: (val: any) => {
          alert("Employee added successfully")
          this._dialogRef.close();
        },
        error: (err: any) => {
          console.error(err)

        }
      })
    }
  }
}
