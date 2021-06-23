import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../core/services/authentication.service';
import { GetSourcesService } from '../core/services/get-sources.service';

// models

@Component({
  selector: 'app-find-falcone',
  templateUrl: './find-falcone.component.html',
  styleUrls: ['./find-falcone.component.css']
})
export class FindFalconeComponent implements OnInit {
  public authToken: string;
  public planetDetails: any;
  public vehicleDetails: any;
  public resetFlag: boolean = false;


  public newstory = [
    'Our problem is set in the planet of Lengaburu in the distant ',
    'galaxy of Tara B. After the recent war with neighbouring planet',
    'Falicornia, King Shan has exiled the Queen of Falicornia for 15 years.',
    '<br>',
    'Queen Al Falcone is now in hiding. But if King Shan can find',
    'her before the years are up, she will be exiled for another 15 years.',
    '<br>',
    'King Shan has received intelligence that Al Falcone is in hiding in one',
    'of these 6 planets - DonLon, Enchai, Jebing, Sapir, Lerbin & Pingasor.',
     'However he has limited resources at his disposal & can send his army',
     'to only 4 of these planets.'
  ];

  constructor( private authenticationService: AuthenticationService,
    private getSourcesService: GetSourcesService) { }

  ngOnInit(): void {
    // this.tokenInstallation();
    this.fetchPlanets();
    this.fetchVehicles();
  }

  tokenInstallation() {
    this.authenticationService.getUserToken().subscribe( response => {
      this.authToken =  response.token;
      localStorage.setItem('token', this.authToken);
    }, error => {
      console.log(error);

      // const errorMessage: any = error.error.error ? error.error.error.errorMessage : error.message;
      // const summary: any = error.error.error ? error.error.error.errorStack : error.statusText;
    });
  }

  fetchPlanets() {
    this.getSourcesService.getPlanet().subscribe( response => {
      if(response) {
        this.planetDetails = response;
      }

    }, error => {
      console.log(error);
    });
  }

  fetchVehicles() {
    this.getSourcesService.getVehicles().subscribe( response => {
      if(response) {
        this.vehicleDetails = response;
      }

    }, error => {
      console.log(error);
    });
  }

  gameReset() {
    this.resetFlag = true;
  }

}
