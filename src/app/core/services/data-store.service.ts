import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

// models
import { Planets } from '../models/planet.model';
import { Vehicles } from '../models/vehicles.model';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  private vehicle = new BehaviorSubject<Vehicles[]>([]);
  private timeTaken = new BehaviorSubject<any>(0);

  public planetDetails: Planets[] = [];
  public vehicleDetails: Vehicles[] = [];

  public selectedPlanets: any = [];
  public selectedVehicles: any = [];
  public selectedItems: any = {};

  public result: any = {};

  constructor() { }

  setPlanetDetails(planets: any){
    this.planetDetails = planets;
  }

  setVehicleDetails(vehichles: any){
    this.vehicleDetails = vehichles;
    this.vehicle.next(vehichles);
  }

  setSelectedVehicles(planetName, vehicleName) {
    let key = '';
    this.selectedPlanets.push(planetName)
    this.selectedVehicles.push(vehicleName)

    // remove duplicates
    this.selectedPlanets = [...new Set(this.selectedPlanets)];


    if(this.selectedItems[planetName]) {
      let index = this.selectedVehicles.indexOf(this.selectedItems[planetName])
      this.selectedVehicles.splice(index, 1);
      this.selectedItems[planetName] = vehicleName

    } else {
      this.selectedItems[planetName] = vehicleName
    }

    let updateVehicles =  JSON.parse(JSON.stringify(this.vehicleDetails))
    if(this.selectedVehicles.length > 0) {
      this.selectedVehicles.forEach(element => {
        let vehicleIndex = updateVehicles.findIndex(item => item.name == element)
        updateVehicles[vehicleIndex].total_no = updateVehicles[vehicleIndex].total_no - 1;

       });
       this.claculateTime();
    }

    console.log(this.selectedItems);
    console.log(updateVehicles);


    this.vehicle.next(updateVehicles);
  }

  getSelectedVehicles(): Observable<Vehicles[]> {
    return this.vehicle.asObservable();
  }

  // time taken to reach destination planet
  claculateTime() {
    let reqtime = 0;
    for (const [key, value] of Object.entries(this.selectedItems)) {
      console.log(`${key}: ${value}`);

      const planet = this.planetDetails.find(element => element.name == key);
      const vehicle = this.vehicleDetails.find(element => element.name == value);

      // Time = Distance / Speed.
      reqtime = (planet.distance / vehicle.speed) + reqtime;
    }

    console.log(reqtime);
    this.timeTaken.next(reqtime);
  }

  getTimeTaken(): Observable<string> {
    return this.timeTaken.asObservable();
  }

  gameReset() {
    this.selectedVehicles = [];
    this.selectedItems = {};
    this.result = {}
    this.timeTaken.next(0);
    this.vehicle.next([]);
  }

}
