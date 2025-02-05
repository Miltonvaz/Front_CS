import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  constructor(private router: Router) {}

  sendDashboard(event : Event) {
    event.preventDefault();
    this.router.navigate(['/dashboard'])
  }

  agregarCarros(event : Event) {
    event.preventDefault();
    this.router.navigate(['/agregar-carros']);
  }

  verCarros(event : Event) {
    event.preventDefault();
    this.router.navigate(['/ver-carros']);
  }

  verCitas(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/ver-citas']); 
  }
}
