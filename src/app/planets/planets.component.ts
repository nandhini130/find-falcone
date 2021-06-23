import { Component,
  OnInit,
  Input,
  ViewChild,
  Renderer2,
  ElementRef,
  DoCheck } from '@angular/core';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.css']
})
export class PlanetsComponent implements OnInit, DoCheck {

  @Input() planetDetails: any;
  @Input() vehicleDetails: any;
  @Input() gameReset: boolean;

  @ViewChild('Donlon') donlon: ElementRef;
  @ViewChild('Enchai') enchai: ElementRef;
  @ViewChild('Jebing') jebing: ElementRef;
  @ViewChild('Sapir') sapir: ElementRef;
  @ViewChild('Lerbin') lerbin: ElementRef;
  @ViewChild('Pingasor') pingasor: ElementRef;

  public planetCounter: number = 0;
  public selectedPlanets: any = [];
  public unselectedPlanets: any = [];

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.selectedPlanets = 4;
    // }, 3000);
  }

  ngDoCheck() {
    // console.log(this.selectedPlanets);
    // console.log(this.enchai);
    // console.log(this.donlon);

    // console.log(this.lerbin);


    // if(this.selectedPlanets == 4) {
      // this.renderer.addClass(this.enchai.nativeElement, 'animOut');
      // this.renderer.addClass(this.lerbin.nativeElement, 'animOut');
      // setTimeout(() => {

        //  this.enchai.nativeElement.remove();
      // // this.lerbin.nativeElement.remove();
      // this.renderer.addClass(this.donlon.nativeElement, 'selectedCards');
      // this.renderer.addClass(this.jebing.nativeElement, 'selectedCards');
      // this.renderer.addClass(this.sapir.nativeElement, 'selectedCards');
      // this.renderer.addClass(this.pingasor.nativeElement, 'selectedCards');
      // },2000);

    // }
  }

  onPlanetSelect($event: any, planetName: string) {
    console.log($event);
    console.log(planetName);
if(!this.selectedPlanets.includes(planetName)) {


    if(this.planetCounter == 3) {

      this.selectedPlanets.push(planetName);

      this.unselectedPlanets =  this.planetDetails.filter(item => !(this.selectedPlanets.includes(item.name)));
      console.log(this.unselectedPlanets);

      this.unselectedPlanets.forEach((unselectedPlanet) => {
        let element = document.getElementById(unselectedPlanet.name);
        element.classList.add('animOut');
        setTimeout(() => {
          element.classList.add('hideElements');
          // this.selectedPlanets.forEach((selectedPlanet) => {
          //   let planetRef = document.getElementById(selectedPlanet);
          //   planetRef.classList.add('selectedCards');
          // });
        },2000);
      });




    } else {
      this.selectedPlanets.push(planetName);
      this.planetCounter++;
    }
  } else {
    console.log('selectd already');

  }

  }

  resetGame() {
    if(this.gameReset) {
      this.planetCounter = 0;
      this.unselectedPlanets.forEach((unselectedPlanet) => {
        let element = document.getElementById(unselectedPlanet.name);
        element.classList.remove('animOut');
        element.classList.remove('hideElements');

          // this.selectedPlanets.forEach((selectedPlanet) => {
          //   let planetRef = document.getElementById(selectedPlanet);
          //   planetRef.classList.remove('selectedCards');
          // });

      });
    }
  }

}
