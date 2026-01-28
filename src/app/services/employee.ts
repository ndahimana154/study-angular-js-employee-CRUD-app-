import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_API_URL = 'http://localhost:3000'

@Injectable({
  providedIn: 'root',
})
export class Employee {
  constructor(private _http: HttpClient) { }
  addEmployee(data: any): Observable<any> {
    return this._http.post(`${BASE_API_URL}/employees`, data);
  }
  getEmployeeList(): Observable<any> {
    return this._http.get(`${BASE_API_URL}/employees`);
  }
  deleteEmployee(id: number): Observable<any> {
    return this._http.delete(`${BASE_API_URL}/employees/${id}`);
  }
  updateEmployee(id: number, data: any): Observable<any> {
    return this._http.put(`${BASE_API_URL}/employees/${id}`, data);
  }
}
