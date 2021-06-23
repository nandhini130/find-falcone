import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '../models/token.model';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private http: HttpClient) { }

  getUserToken(): any {
    return this.http.post<Token>('https://findfalcone.herokuapp.com/token', '' ,
    {
       headers : new HttpHeaders({
         'Accept':'application/json'
        })
    });
  }

  // validate user authenticity
  authenticationUser(): any{
    return !!localStorage.getItem('token');
  }
}
