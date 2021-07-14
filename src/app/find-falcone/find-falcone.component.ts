import { ThrowStmt } from '@angular/compiler';
import { Component,
  OnInit,
  ViewChild,
  QueryList,
  ViewChildren,
  Renderer2,
  ElementRef,
  DoCheck  } from '@angular/core';
  import {
    Route,
    Router,
    RouterStateSnapshot,
  } from '@angular/router';

import { AuthenticationService } from '../core/services/authentication.service';
import { GetSourcesService } from '../core/services/get-sources.service';
import { DataStoreService } from '../core/services/data-store.service'

// models

@Component({
  selector: 'app-find-falcone',
  templateUrl: './find-falcone.component.html',
  styleUrls: ['./find-falcone.component.css']
})
export class FindFalconeComponent implements OnInit {

  @ViewChild('spaceVehicleBtn') spaceVehicleBtn: ElementRef;
  @ViewChild('vehicleZone') vehicleZone: ElementRef;
  @ViewChild('sendMsg') sendMsg: ElementRef;
  @ViewChild('sendBtn') sendBtn: ElementRef;

  @ViewChildren('planets') planets: QueryList<ElementRef>;

  public authToken: string;
  public planetDetails: any;
  public vehicleDetails: any;
  public resetFlag: boolean;
  public timeTaken: any;
  public invadePlanets: any = [];

  constructor( private authenticationService: AuthenticationService, private getSourcesService: GetSourcesService,
    private dataStoreService: DataStoreService, private renderer: Renderer2, private router: Router,) {
      this.resetFlag = false;
      this.timeTaken = 0;
    }

  ngOnInit(): void {
    this.tokenInstallation();
    this.dataStoreService.getTimeTaken().subscribe(value => {
      this.timeTaken = value;
    });
    this.fetchPotentialHideouts();
    this.fetchAvailableVehicles();
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

  fetchPotentialHideouts() {
    this.getSourcesService.getPlanets().subscribe( response => {
      if(response) {
        this.planetDetails = response;
        this.dataStoreService.setPlanetDetails(this.planetDetails);
      }
    }, error => {
      console.log(error);
    });
  }

  fetchAvailableVehicles() {
    this.getSourcesService.getVehicles().subscribe( response => {
      if(response) {
        this.vehicleDetails = response;
        this.dataStoreService.setVehicleDetails(this.vehicleDetails);
      }
    }, error => {
      console.log(error);
    });
  }



  onPlanetSelect(event, planet) {
    let planetName = planet.name;
    console.log('elements');

    if(this.invadePlanets.length < 4 && !(this.invadePlanets.includes(planet))) {
      let ele =  this.planets.find( data => data.nativeElement.id  == planetName)
      this.invadePlanets.push(planet)
      this.renderer.addClass(ele.nativeElement, 'selectedPlanets');
      if(this.invadePlanets.length == 4) {
        this.planets.forEach( data => {
          if(!this.invadePlanets.some(element => element.name === data.nativeElement.id)) {
            console.log(data.nativeElement.id);
            this.renderer.addClass(data.nativeElement, 'disablePlanets');
          }
        })
        this.renderer.setStyle(this.spaceVehicleBtn.nativeElement, 'display', 'block');
      }
    }
  }

  onPlanetReset() {

    this.renderer.setStyle(this.spaceVehicleBtn.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.vehicleZone.nativeElement, 'display', 'none');
    this.planets.forEach( data => {
      if(!this.invadePlanets.some(element => element.name === data.nativeElement.id)) {
        console.log(data.nativeElement.id);
        this.renderer.removeClass(data.nativeElement, 'disablePlanets');
      } else {
        this.renderer.removeClass(data.nativeElement, 'selectedPlanets');
      }
    });

    this.invadePlanets = [];
  }

  displayVehichles() {
    this.renderer.setStyle(this.vehicleZone.nativeElement, 'display', 'block');
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  findFalcone() {
    let reqObj = {
      token: this.authToken,
      planet_names: this.dataStoreService.selectedPlanets,
      vehicle_names: this.dataStoreService.selectedVehicles
    }

    console.log(reqObj);


    this.renderer.setProperty(this.sendMsg.nativeElement, 'innerHTML', 'Sending');
    this.renderer.addClass(this.sendMsg.nativeElement, 'sending');
    this.renderer.addClass(this.sendBtn.nativeElement, 'sending');


    this.getSourcesService.findFalcone(reqObj).subscribe( response => {
      this.dataStoreService.result = response;
      this.renderer.setProperty(this.sendMsg.nativeElement, 'innerHTML', 'Sent');
      this.renderer.addClass(this.sendMsg.nativeElement, 'sent');
      this.renderer.addClass(this.sendBtn.nativeElement, 'sent');
      this.router.navigate(['/search-result']);
    }, error => {
      console.log(error);
    });
  }

}
