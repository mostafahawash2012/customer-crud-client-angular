import { Injectable } from '@angular/core';
import {Customer} from './models/customer';
import { from, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {catchError} from 'rxjs/operators'
import {EmptyError} from 'rxjs';
import {  throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class CustomerServiceService {

  headers={
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    }),
}

  private customerAPI:string;
  constructor(private http: HttpClient) {
    this.customerAPI = 'http://localhost:8080/api/customers';

  }
  getCustomers(): Observable<any>{
    return this.http.get<Customer[]>(this.customerAPI)
    .pipe(catchError(this.handleError))
  }
  getCustomer(id:number):Observable<any>{
    return this.http.get(`${this.customerAPI}/${id}`, this.headers)
    .pipe(catchError(this.handleError));
  }
  updateCustomer(value:Customer):Observable<any>{
   // return this.http.put(`${this.customerAPI}/${id}`,value);
   return this.http.put(this.customerAPI,value,this.headers)
   .pipe(catchError(this.handleError));
   
  }
  saveCustomer(customer: Customer):Observable<any>{
      return this.http.post<Customer>(this.customerAPI, customer,this.headers)
      .pipe(catchError(this.handleError))
  }
  deleteCustomer(id: number):Observable<any>{
    return this.http.delete(this.customerAPI+'/'+id, {responseType:'text'})
    .pipe(catchError(this.handleError));
  }

  private handleError(error : HttpErrorResponse){
    //return 'something went wrong '+error.message;
    console.log('error '+error.message)
 //   console.log('error'+${error.message})
    return throwError(error)
  }
}
