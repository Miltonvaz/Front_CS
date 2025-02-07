import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Appointment } from '../../../../core/domain/appointment/appointment';
import { GetAppointmentsService } from '../../../../core/services/appointments/getAllAppointment_service';
import { UpdateAppointmentStatusService } from '../../../../core/services/appointments/updateAppointmenrt_service';
import { NotificationService } from '../../../../core/services/notification/notification_service';
import { HeaderSimpleComponent } from '../../../components/header-simple/header-simple.component';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';


@Component({
  selector: 'app-ver-citas',
  templateUrl: './ver-citas.component.html',
  standalone: true,
  imports: [CommonModule, HeaderSimpleComponent, SidebarComponent],
  styleUrls: ['./ver-citas.component.scss']
})
export class VerCitasComponent implements OnInit, OnDestroy {
  citas: Appointment[] = [];
  public notifications: string[] = [];
  private notificationSubscription: any;

  constructor(
    private notificationService: NotificationService,
    private getAppointmentsService: GetAppointmentsService,
    private updateAppointmentStatusService: UpdateAppointmentStatusService,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.startNotificationPolling();
    this.loadAppointments();
  }

  ngOnDestroy(): void {
    if (this.notificationSubscription) {
      this.notificationSubscription.unsubscribe();
    }
    this.notificationService.stopPolling();
  }

  private startNotificationPolling(): void {
    this.notificationSubscription = this.notificationService.getNotifications().subscribe({
      next: (notification) => {
        if (notification?.appointment?.status) {
          const statusMessage = `Nueva actualización: ${notification.appointment.status}`;
          this.showNotification(statusMessage);
          this.loadAppointments();
        }
      },
      error: (err) => console.error('Error al recibir notificación:', err)
    });
  }

  private showNotification(statusMessage: string): void {
    Swal.fire({
      title: 'Nueva Notificación',
      text: statusMessage,
      icon: 'info',
      toast: true,
      position: 'top-end',
      timer: 5000,
      showConfirmButton: false
    });
  }

  private loadAppointments(): void {
    this.getAppointmentsService.getAppointments().subscribe(
      (data: Appointment[]) => {
        this.citas = data.map((appointment) => ({
          ...appointment,
          test_date: appointment.test_date?.Valid ? appointment.test_date : { Time: null, Valid: false }
        }));
      },
      (error: any) => {
        console.error('Error al obtener las citas:', error);
        Swal.fire({
          title: 'Error',
          text: error?.message || 'Hubo un problema al obtener las citas. Por favor, intenta más tarde.',
          icon: 'error',
          confirmButtonText: 'Entendido'
        });
      }
    );
  }

  dismissAlert(notification: string): void {
    this.notifications = this.notifications.filter((n) => n !== notification);
  }

  changeStatus(cita: Appointment): void {
    if (cita.appointment_id !== undefined) {
      const newStatus = this.getNextStatus(cita.status);
      cita.status = newStatus;

      this.updateAppointmentStatusService.updateAppointmentStatus(cita.appointment_id, newStatus).subscribe(
        () => {
          Swal.fire({
            title: 'Estado actualizado',
            text: `El estado de la cita ha cambiado a: ${newStatus}`,
            icon: 'success',
            confirmButtonText: 'OK'
          });
        },
        (error: any) => {
          console.error('Error al actualizar el estado:', error);
          Swal.fire({
            title: 'Error',
            text: 'No se pudo actualizar el estado de la cita. Intenta nuevamente.',
            icon: 'error',
            confirmButtonText: 'Cerrar'
          });
          cita.status = this.getPreviousStatus(newStatus);
        }
      );
    } else {
      console.error('ID de la cita no está definido');
    }
  }

  getNextStatus(currentStatus: string): string {
    switch (currentStatus.toLowerCase()) {
      case 'pendiente':
        return 'en proceso';
      case 'en proceso':
        return 'completado';
      case 'completado':
        return 'pendiente';
      default:
        return 'pendiente';
    }
  }

  getPreviousStatus(currentStatus: string): string {
    switch (currentStatus.toLowerCase()) {
      case 'en proceso':
        return 'pendiente';
      case 'completado':
        return 'en proceso';
      default:
        return 'completado';
    }
  }

  getStatusClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      pendiente: 'status-pending',
      'en proceso': 'status-in-progress',
      completado: 'status-completed',
    };
    return statusMap[status?.toLowerCase()] || 'status-unknown';
  }
}
