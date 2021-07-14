import { DataStoreService } from './../core/services/data-store.service';
import { Component, OnInit } from '@angular/core';
import {
  Route,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  public timeTaken: string;
  public planetName: string;
  public status: string;

  constructor(private dataStoreService: DataStoreService, private router: Router) { }

  ngOnInit(): void {

    this.status = this.dataStoreService.result.status;
    this.planetName = this.dataStoreService.result.planet_name;

    this.dataStoreService.getTimeTaken().subscribe(value => {
      this.timeTaken = value;
    });
  }


  restartGame() {
    this.dataStoreService.gameReset();
    this.router.navigate(['/find-falcone']);
  }
}
