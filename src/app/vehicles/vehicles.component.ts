import { Component, OnInit, Input } from '@angular/core';

import { GetSourcesService } from '../core/services/get-sources.service'

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {

  @Input() vehicleDetails: any;
  @Input() selectedPlanet: any;

  public selectedvehicle: string[] = [];

  constructor(private getSourcesService: GetSourcesService) { }

  ngOnInit(): void {

    this.getSourcesService.getSelectedVehicle().subscribe( vehicle => {

    });
  }

  onVehicleselect(event: any, vehicleName: string) {
    // console.log(event.target.value);
    // console.log(event.target.checked);
    console.log(event);


    console.log('vehicle',vehicleName);
    console.log(this.selectedPlanet);
    this.vehicleDetails.forEach(element => {
      // if(this.prevSelection && element.name == this.prevSelection) {
      //   element.total_no++;
      // }
      if(element.name === vehicleName && event.target.checked) {

        this.getSourcesService.sendSelectedVehicle(element.name);
        element.total_no--;
        this.selectedvehicle.push(element.name);
        return;
      }
    });
  }


}
