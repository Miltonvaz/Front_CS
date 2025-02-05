import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CarsService } from '../../services/cars/cars.service';
import { Car } from '../../models/car/car';
import { HeaderSimpleComponent } from "../../components/header-simple/header-simple.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { CardAutoComponent } from "../../components/card-auto/card-auto.component";

@Component({
  selector: 'app-ver-carros',
  standalone: true,
  imports: [CommonModule, HeaderSimpleComponent, SidebarComponent, CardAutoComponent],
  templateUrl: './ver-carros.component.html',
  styleUrls: ['./ver-carros.component.scss']
})
export class VerCarrosComponent implements OnInit, OnDestroy {
  cars: Car[] = [];
  private pollingSubscription!: Subscription;

  constructor(private carsService: CarsService) {}

  ngOnInit(): void {
    this.fetchCars();

    this.pollingSubscription = interval(5000)
      .pipe(switchMap(() => this.carsService.getCars()))
      .subscribe({
        next: (response) => {
          if (response && Array.isArray(response.cars)) {
            this.cars = response.cars;
          } else {
            console.error('Respuesta inesperada de la API:', response);
          }
        },
        error: (err) => console.error('Error fetching cars:', err)
      });
  }

  fetchCars(): void {
    this.carsService.getCars().subscribe({
      next: (response) => {
        if (response && Array.isArray(response.cars)) {
          this.cars = response.cars;
        } else {
          console.error('La propiedad "cars" no es un array:', response);
        }
      },
      error: (err: any) => console.error('Error fetching cars:', err)
    });
  }

  onAvailabilityChanged(event: { carId: number, availability: boolean }): void {
    const updatePayload = {
      available: event.availability
    };

    this.carsService.updateAvailability(event.carId, updatePayload).subscribe({
      next: (updatedCar: Car) => {
        const car = this.cars.find(car => car.id === event.carId);
        if (car) {
          car.available = updatedCar.available;
        }
      },
      error: (err) => console.error('Error al actualizar la disponibilidad:', err)
    });
  }

  ngOnDestroy(): void {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }
}
