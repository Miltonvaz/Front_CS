import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subscription, switchMap } from 'rxjs';
import { HeaderComponent } from "../../components/header/header.component";
import { CardAutoComponent } from "../../components/card-auto/card-auto.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { FormsModule } from '@angular/forms';
import { Car } from '../../../core/domain/car/car';
import { GetAllCarService } from '../../../core/services/cars/getAllCar_services';
import { CreateAppointmentService } from '../../../core/services/appointments/createAppointment_service';
import { Appointment } from '../../../core/domain/appointment/appointment';


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
    private getCarsService: GetAllCarService,
    private createAppointmentService: CreateAppointmentService 
  ) {}

  ngOnInit(): void {
    this.getCars();  
    this.pollingSubscription = interval(5000)
      .pipe(switchMap(() => this.getCarsService.getAllCars()))  
      .subscribe({
        next: (response: Car[]) => {
          this.cars = response;
        },
        error: (err: any) => {
          this.errorMessage = 'Error al obtener los coches. Inténtalo nuevamente.';
        }
      });
  }
  getCars() {
    this.getCarsService.getAllCars().subscribe({
      next: (cars: Car[]) => {
        this.cars = cars;
      },
      error: (_err: any) => {
        this.errorMessage = 'Error al obtener los coches.';
      }
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

    if (!this.selectedCar) {
      this.errorMessage = 'Por favor, selecciona un coche.';
      alert(this.errorMessage);
      return;
    }

    if (!this.testDate || !this.location) {
      this.errorMessage = 'Por favor, completa todos los campos.';
      alert(this.errorMessage);
      return;
    }

    const appointmentData: Appointment = {
      car_id: this.selectedCar.id,
      client_id: 1,
      test_date: {
        Time: testDate.toISOString(),
        Valid: true
      },
      location: this.location,
      status: 'pending'
    };

    this.createAppointmentService.createAppointment(appointmentData).subscribe({
      next: (_response: Appointment) => {
        this.errorMessage = '';
        alert('Tu cita ha sido agendada exitosamente.');
      },
      error: (_err: any) => {
        this.errorMessage = 'Ocurrió un error al agendar la cita. Inténtalo de nuevo.';
        alert(this.errorMessage);
      }
    });
  }
}
