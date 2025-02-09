import { Component } from '@angular/core';
import { NavigationStart, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loading: boolean = false;
  messages: string[] = [
    'Cargando tu panel de control...',
  ];
  loadingMessage: string = this.messages[0];

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loading = true;
        this.loadingMessage = this.messages[Math.floor(Math.random() * this.messages.length)];
      } else if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.loading = false;
        }, 1500);
      }
    });
  }
}