import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-simple',
  standalone: true,
  imports: [],
  templateUrl: './header-simple.component.html',
  styleUrl: './header-simple.component.scss'
})
export class HeaderSimpleComponent {
  constructor(private router : Router) {}

  sendAgendCita(event : Event) {
    event.preventDefault();
    this.router.navigate(['/agendar-cita']);
  }

  sendLogin(event : Event) {
    event.preventDefault();
    this.router.navigate(['register']);
  }

  sendAbout(event : Event) {}
  sendNews(event : Event) {}

  sendHome(event : Event) {
    event.preventDefault();
    this.router.navigate([''])
  }
}
