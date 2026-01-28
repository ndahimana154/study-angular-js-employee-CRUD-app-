import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
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
export class EmpAddEdit implements OnInit {

  empForm: FormGroup;
  isEditMode: boolean = false;

  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate'
  ]
  constructor(private _fb: FormBuilder, private _empService: Employee, private _dialogRef: MatDialogRef<EmpAddEdit>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
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
  ngOnInit(): void {
    if (this.data && this.data.id) {
      this.isEditMode = true;
      this.empForm.patchValue(this.data);
    }
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.isEditMode && this.data && this.data.id) {
        this._empService.updateEmployee(this.data.id, this.empForm.value).subscribe({
          next: (val: any) => {
            alert("Employee updated successfully")
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err)
          }
        })
      } else {
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            alert("Employee added successfully")
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err)
          }
        })
      }
    }
  }
}
