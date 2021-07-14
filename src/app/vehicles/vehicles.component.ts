import { GetSourcesService } from './../core/services/get-sources.service';
import { Component, OnInit, Input } from '@angular/core';

import { DataStoreService } from '../core/services/data-store.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {

  @Input() currentPlanet: any;

  public vehicleDetails: any = [];
  public selectedVehicle: any = '';

  constructor(private dataStoreService: DataStoreService) {}

  ngOnInit(): void {
    this.dataStoreService.getSelectedVehicles().subscribe(data => {
      if(data.length > 0 ) {
        this.vehicleDetails = data;
      console.log(this.currentPlanet.name);
      }

    });
   }

  onVehicleselect(event: any, planetName: any, vehicleName: string) {
    this.selectedVehicle = vehicleName;
    this.dataStoreService.setSelectedVehicles(planetName, vehicleName);
  }


}
