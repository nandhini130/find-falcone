import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Observable, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

// models
import { Planets } from '../models/planet.model';
import { Vehicles } from '../models/vehicles.model';

const BACKEND_URL = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class GetSourcesService {

  private planets = new BehaviorSubject<string>('');
  private vehicles = new BehaviorSubject<string>('');

  public selectedPlanets: any = [];
  public selectedVehicles: any = [];
  public timeTaken: any = [];

  constructor(private http: HttpClient) { }

  // planet
  sendSelectedPlanet(key: string) {
    this.selectedPlanets.push(key);
    this.planets.next(key);
  }

  getSelectedPlanet(): Observable<string> {
    return this.planets.asObservable();
  }

  // vehicle
  sendSelectedVehicle(key: string) {
    this.selectedVehicles.push(key);
    this.vehicles.next(key);
  }

  getSelectedVehicle(): Observable<string> {
    return this.vehicles.asObservable();
  }

  // time taken calculation


  // fetch planet details
  getPlanet() {
    return this.http.get<Planets>(`${BACKEND_URL}planets`);
  }


  // fetch available vehicles
  getVehicles() {
    return this.http.get<Vehicles>(`${BACKEND_URL}vehicles`);
  }

}
