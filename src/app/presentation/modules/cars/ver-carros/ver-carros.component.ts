import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Car } from '../../../../core/domain/car/car';
import { GetAllCarService } from '../../../../core/services/cars/getAllCar_services';
import { UpdateAvailabilityService } from '../../../../core/services/cars/updateAvailability_service';
import { CardAutoComponent } from '../../../components/card-auto/card-auto.component';
import { HeaderSimpleComponent } from '../../../components/header-simple/header-simple.component';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';

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

  constructor(
    private getCarsService: GetAllCarService,
    private updateCarAvailabilityService: UpdateAvailabilityService
  ) {}

  ngOnInit(): void {
    this.fetchCars();

    this.pollingSubscription = interval(5000)
      .pipe(switchMap(() => this.getCarsService.getAllCars()))
      .subscribe({
        next: (response) => {
          if (response && Array.isArray(response)) {
            this.cars = response;
          } else {
            console.error('Respuesta inesperada de la API:', response);
          }
        },
        error: (err) => console.error('Error fetching cars:', err)
      });
  }

  fetchCars(): void {
    this.getCarsService.getAllCars().subscribe({
      next: (response) => {
        if (response && Array.isArray(response)) {
          this.cars = response;
        } else {
          console.error('La propiedad "cars" no es un array:', response);
        }
      },
      error: (err: any) => console.error('Error fetching cars:', err)
    });
  }

  onAvailabilityChanged(event: { carId: number, availability: boolean }): void {

    this.updateCarAvailabilityService.updateAvailability(event.carId, event.availability).subscribe({
      next: (updatedCar: Car) => {
        const car = this.cars.find(car => car.id === event.carId);
        if (car) {
          car.available = updatedCar.available;
        }
      },
      error: (err: any) => console.error('Error al actualizar la disponibilidad:', err)
    });
  }
  
  ngOnDestroy(): void {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }
}
