
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Observable, Subject, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

// models
import { Planets } from '../models/planet.model';
import { Vehicles } from '../models/vehicles.model';

const BACKEND_URL = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class GetSourcesService {

  constructor(private http: HttpClient) {}

  // fetch planet details
  getPlanets(): Observable<Planets[]> {
    return this.http.get<Planets[]>(`${BACKEND_URL}planets`)
      .pipe(
        catchError(this.handleError)
      );
  }


  // fetch available vehicles
  getVehicles(): Observable<Vehicles[]> {
    return this.http.get<Vehicles[]>(`${BACKEND_URL}vehicles`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // find falcone
  findFalcone(data): Observable<any> {
    return this.http.post<any>(`${BACKEND_URL}find`, data, {
      headers : new HttpHeaders({
        'Accept':'application/json'
       })
   })
      .pipe(
        catchError(this.handleError)
      );
  }

  handleError(error: any) {
    return throwError(error.message || 'Something went wrong')
  }
}
