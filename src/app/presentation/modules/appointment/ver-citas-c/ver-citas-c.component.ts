import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Appointment } from '../../../../core/domain/appointment/appointment';
import { CreateAppointmentService } from '../../../../core/services/appointments/createAppointment_service';
import { GetAppointmentsService } from '../../../../core/services/appointments/getAllAppointment_service';
import { HeaderSimpleComponent } from '../../../components/header-simple/header-simple.component';


@Component({
  selector: 'app-ver-citas',
  standalone: true,
  imports: [CommonModule, HeaderSimpleComponent],
  templateUrl: './ver-citas-c.component.html',
  styleUrls: ['./ver-citas-c.component.scss']
})
export class VerCitasCComponent implements OnInit, OnDestroy {
  citas: Appointment[] = [];
  private pollingInterval: any;
  private statusPollingInterval: any;

  constructor(
    private getAppointmentsService: GetAppointmentsService, 
    private createAppointmentService: CreateAppointmentService 
  ) {}

  ngOnInit() {
    this.loadAppointments();
    this.startPolling();
    this.startStatusPolling();
  }

  ngOnDestroy() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }
    if (this.statusPollingInterval) {
      clearInterval(this.statusPollingInterval);
    }
  }

  private loadAppointments(): void {
    this.getAppointmentsService.getAppointments().subscribe(
      (data: Appointment[]) => {
        this.citas = data.map((appointment: Appointment) => {
          if (appointment.test_date?.Valid) {
            appointment.test_date.Time = appointment.test_date.Time;
          } else {
            appointment.test_date.Time = null;
            appointment.test_date.Valid = false;
          }
          return appointment;
        });
      },
      (error) => {
        console.error('Error fetching appointments:', error);
        if (error.status === 500) {
          alert('Hubo un error en el servidor, por favor intenta más tarde.');
        }
      }
    );
  }

  private startPolling() {
    this.pollingInterval = setInterval(() => {
      this.loadAppointments();
    }, 10000);
  }

  private startStatusPolling() {
    this.statusPollingInterval = setInterval(() => {
      this.citas.forEach(appointment => {
        if (appointment.appointment_id) {
          this.createAppointmentService.createAppointment(appointment).subscribe(
            (response: Appointment) => { 
              if (response.status !== appointment.status) {
                appointment.status = response.status;
              }
            },
            (error) => {
              console.error(`Error fetching status for appointment ${appointment.appointment_id}:`, error);
            }
          );
        }
      });
    }, 60000);
  }

  isValidDate(date: Date): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }

  getStatusClass(status: string): string {
    const safeStatus = status?.toLowerCase() || 'unknown';
    switch (safeStatus) {
      case 'pendiente':
      case 'pending':
        return 'status-pending';
      case 'en proceso':
      case 'in process':
        return 'status-in-progress';
      case 'completado':
      case 'completed':
        return 'status-completed';
      default:
        return 'status-unknown';
    }
  }
}
