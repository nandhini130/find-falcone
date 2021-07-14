import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public newstory = [
    'Our problem is set in the planet of Lengaburu in the far galaxy of',
    'Tara B. After the recent war with neighbouring planet Falicornia',
    'King Shan has exiled the Queen of Falicornia for 15 years.',
    '<br>',
    'Queen Al Falcone is now in hiding. But if King Shan can find her',
    'before the years are up, she will be exiled for another 15 years.',
    '<br>',
    'King Shan has received intelligence that Al Falcone is hiding in',
    'one of these 6 planets - DonLon, Enchai, Jebing, Sapir, Lerbin & ',
    'Pingasor. However he has limited resources at his disposal & ',
    'can send his army to only 4 of these planets.'
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
