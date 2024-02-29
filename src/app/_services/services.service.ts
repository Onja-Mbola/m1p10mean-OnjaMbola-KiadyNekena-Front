import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  baseUri: string = 'https://m1p10mean-onjambola-kiadynekena-back-2.onrender.com/api/services';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) {}
  // Get all employees
  // Get all service
  getService(id): Observable<any> {
    return this.http.get(`${this.baseUri}/read/${id}`).pipe(
      map((res: Response) => {
        return res || {};
      })
    );
  }
  getServices() {
   
    return this.http.get(`${this.baseUri}`).pipe(
      map((res: Response) => {
        return res || {};
      })
    );
  }
}