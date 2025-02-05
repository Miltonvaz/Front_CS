import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NotificationService } from '../../services/notification/notification.service';
import { CommonModule } from '@angular/common';
import { HeaderSimpleComponent } from '../../components/header-simple/header-simple.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { AppointmentService } from '../../services/appointment/appointment.service';
import { Appointment } from '../../models/appointment/appointment';
import Swal from 'sweetalert2';

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

  constructor(
    private notificationService: NotificationService,
    private appointmentService: AppointmentService,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.startNotificationPolling();
    this.loadAppointments();
  }

  ngOnDestroy(): void {
    this.notificationService.stopLongPolling();
  }

  private startNotificationPolling(): void {
    this.notificationService.startLongPolling();

    this.notificationService.getNotifications().subscribe({
      next: (notification) => {
        console.log('Notificación recibida:', notification);  

        if (notification?.appointment?.status) {
          const statusMessage = `Nueva actualización: ${notification.appointment.status}`;

          Swal.fire({
            title: 'Nueva Notificación',
            text: statusMessage,
            icon: 'info',
            toast: true, 
            position: 'top-end',
            timer: 5000, 
            showConfirmButton: false
          });

          this.notifications = [...this.notifications, notification.appointment.status];  
          this.cdr.detectChanges();

          this.loadAppointments();
        }
      },
      error: (err) => console.error('Error al recibir notificación:', err)
    });
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
  changeStatus(cita: Appointment): void {
    const newStatus = this.getNextStatus(cita.status);
  
    // Cambiar el estado de la cita de forma inmediata en el frontend
    cita.status = newStatus;
  
    // Actualizar el estado en el backend
    this.appointmentService.updateAppointmentStatus({ id: cita.appointment_id, status: newStatus }).subscribe(
      () => {
        Swal.fire({
          title: 'Estado actualizado',
          text: `El estado de la cita ha cambiado a: ${newStatus}`,
          icon: 'success',
          confirmButtonText: 'OK'
        });
      },
      (error) => {
        console.error('Error actualizando el estado:', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo actualizar el estado de la cita. Intenta nuevamente.',
          icon: 'error',
          confirmButtonText: 'Cerrar'
        });
        // Revertir el cambio en caso de error
        cita.status = this.getPreviousStatus(newStatus);
      }
    );
  }
  
  // Método para obtener el estado anterior
  getPreviousStatus(currentStatus: string): string {
    switch (currentStatus.toLowerCase()) {
      case 'en proceso':
      case 'in process':
        return 'pendiente';
      case 'completado':
      case 'completed':
        return 'en proceso';
      default:
        return 'completado';
    }
  }
  
  getNextStatus(currentStatus: string): string {
    switch (currentStatus.toLowerCase()) {
      case 'pendiente':
      case 'pending':
        return 'en proceso';
      case 'en proceso':
      case 'in process':
        return 'completado';
      case 'completado':
      case 'completed':
        return 'pendiente';
      default:
        return 'pendiente';
    }
  }

  private loadAppointments(): void {
    this.appointmentService.getAppointments().subscribe(
      (data: Appointment[]) => {
        this.citas = data.map((appointment) => ({
          ...appointment,
          test_date: appointment.test_date?.Valid ? appointment.test_date : { Time: null, Valid: false }
        }));
      },
      (error) => {
        console.error('Error fetching appointments:', error);
        if (error.status === 500) {
          Swal.fire({
            title: 'Error en el servidor',
            text: 'Hubo un problema al obtener las citas. Por favor, intenta más tarde.',
            icon: 'error',
            confirmButtonText: 'Entendido'
          });
        }
      }
    );
  }

  dismissAlert(notification: string): void {
    this.notifications = this.notifications.filter((n) => n !== notification);
  }
}
