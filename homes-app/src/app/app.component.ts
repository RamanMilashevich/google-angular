import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <main>
      <header class="brand-name">
        <img class="brand-log" src="/assets/logo.svg" alt="logo" arial-hidden="true"/>
        <section class="content">
          <app-home></app-home>
        </section>
      </header>


        `,
  styleUrls: ['./app.component.css'],
  imports: [HomeComponent]
})
export class AppComponent {
  title = 'homes';
}
