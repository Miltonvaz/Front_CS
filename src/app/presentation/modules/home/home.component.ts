import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CarsService } from '../../services/cars/cars.service';
import { Car } from '../../models/car/car';
import { HeaderComponent } from "../../components/header/header.component";
import { CardAutoComponent } from "../../components/card-auto/card-auto.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { AppointmentService } from '../../services/appointment/appointment.service'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, CardAutoComponent, FooterComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  cars: Car[] = [];
  private pollingSubscription!: Subscription;
  selectedCar: Car | null = null;  
  testDate: string = '';  
  location: string = '';  
  errorMessage: string | undefined;

  constructor(
    private carsService: CarsService,
    private appointmentService: AppointmentService  
  ) {}

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
  
  ngOnDestroy(): void {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }

  onCarSelect(car: Car): void {
    this.selectedCar = car;
    alert(`Has seleccionado: ${car.make} ${car.model} (${car.year})`);
  }

  scheduleAppointment(): void {
    const testDate = new Date(this.testDate);
    const currentDate = new Date();
  
    if (testDate <= currentDate) {
      this.errorMessage = 'La fecha de la cita debe ser en el futuro.';
      alert(this.errorMessage);
      return;
    }
  
    if (this.selectedCar && this.testDate && this.location) {
      const appointmentData = {
        car_id: this.selectedCar.id,
        client_id: 1,
        test_date: testDate.toISOString(),
        location: this.location,
        status: 'pending'
      };
  
      this.appointmentService.createAppointment(appointmentData).subscribe({
        next: (response) => {
          console.log('Cita agendada:', response);
          this.errorMessage = '';
          alert('Tu cita ha sido agendada exitosamente.');
        },
        error: (err) => {
          console.error('Error al agendar la cita:', err);
          this.errorMessage = 'Ocurrió un error al agendar la cita. Inténtalo de nuevo.';
          alert(this.errorMessage);
        }
      });
    } else {
      this.errorMessage = 'Faltan datos para agendar la cita';
      alert(this.errorMessage);
    }
  }   
}
