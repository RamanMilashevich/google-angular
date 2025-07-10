import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  template: `
    <article>
      <img class="listing-photo" [src]="housingLocation?.photo" alt="">
      <section class="listing-description">
        <h2 class="listing-heading">{{housingLocation?.name}}</h2>
        <p class="listing-location">{{housingLocation?.city}}, {{housingLocation?.state}}</p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul class="">
          <li>Units available: {{housingLocation?.availableUnits}}</li>
          <li>Does this location have wifi: {{housingLocation?.wifi}}</li>
          <li>Does this location have lounfry: {{housingLocation?.laundry}}</li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">
          Apply now to live here!
        </h2>
        <form [formGroup]="applyForm" (submit)="submitAplication()">
            <label for="first-name">First name</label>
            <input type="text" id="first-name" formControlName="firstName">

            <label for="last-name">Last name</label>
            <input type="text" id="last-name" formControlName="lastName">

            <label for="phone">Your phone</label>
            <input type="tel" id="phone" formControlName="phoneNumber">

            <label for="email-info">Your email</label>
            <input type="text" id="email-info" formControlName="email">
            <button type="submit" class="primary">Aply now</button>
          </form>
          <h2 class="section-heading">New input</h2>
          <input type="text" [(ngModel)]="name" placeholder="Enter your name">
          <p>Your name is: {{name}}</p>
      </section>
    </article>
  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phoneNumber: new FormControl(''),
    email: new FormControl(''),
  });

  name = 'Raman Milashevich';
  
  constructor() {
    const housingLocationId = Number(this.route.snapshot.paramMap.get('id'));
    this.housingLocation = this.housingService.getHousingLocationById(housingLocationId);
  }

  submitAplication() {
    this.housingService.submitAplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.phoneNumber ?? '',
      this.applyForm.value.email  ?? '',
    );
  }
}
