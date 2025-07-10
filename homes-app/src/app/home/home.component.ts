import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <div class="container">
      <section class="form-container">
        <form class="search-form" (submit)="$event.preventDefault()">
          <input type="text" placeholder="Filter by city" #filter>
          <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
        </form>
      </section>
      <section class="results">
        <app-housing-location *ngFor="let housingLocation of filteredlocationList" [housingLocation]="housingLocation"></app-housing-location>
      </section> 
    </div> 
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  filteredlocationList: HousingLocation[] = [];

  constructor() {
    this.housingService.getAllHousingLocations()
      .then((housingLocationList: HousingLocation[]) => {
        this.housingLocationList = housingLocationList;
        this.filteredlocationList = housingLocationList;
      })
  }

  filterResults(text: string) {
    if(!text) {
      this.filteredlocationList = this.housingLocationList;
    }

    this.filteredlocationList= this.housingLocationList.filter(housingLocation => 
      housingLocation.city.toLowerCase().includes(text.toLowerCase())
    );
  } 
}
