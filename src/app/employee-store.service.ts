import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
// import { HttpClientModule } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmployeeStoreService {

  private behaviourSubject = new BehaviorSubject<any>([]);
  employee$: Observable<any[]> = this.behaviourSubject.asObservable();


  constructor(private httpClient: HttpClient,
    private router: Router) {
    this._getEmployees();
  }

  url = 'https://jsonplaceholder.typicode.com/users';

  private _getEmployees() {
    const user = this.httpClient.get(this.url).pipe(
      catchError(this.handleError));
    return user.subscribe(response => {
      this.behaviourSubject.next(response)
    })
  }

  deleteEmployee(id) {
    const list = this.behaviourSubject.getValue();
    const newList = list.slice(0);
    const result = this._arrayRemove(newList, id);
    this.behaviourSubject.next(result);
    return this.httpClient.delete(this.url + '/' + id);
  }

  addEmployee(newEmployee) {
    const list = this.behaviourSubject.getValue();
    const lastEmployee = list[list.length - 1];
    let lastId = lastEmployee.id;
    const nextId = lastId + 1;
    newEmployee['id'] = nextId;
    const newDataList = [...list, newEmployee];
    const newList = newDataList.slice(0);
    this.behaviourSubject.next(newList);
    this.router.navigate(['/list']);
    return this.httpClient.post(this.url, newEmployee)
  }

  _arrayRemove(arr, value) {
    return arr.filter(function (ele) {
      return ele.id != value;
    });
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
