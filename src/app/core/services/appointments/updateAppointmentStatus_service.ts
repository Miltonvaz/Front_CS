import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateAppointmentUseCase } from '../../use-cases/appointments/updateAppointment_useCase';
import { Appointment } from '../../domain/appointment/appointment';

@Injectable({
  providedIn: 'root',
})
export class UpdateAppointmentService {
  constructor(private updateAppointmentUseCase: UpdateAppointmentUseCase) {}

  updateAppointment(id: number, appointmentData: Appointment): Observable<Appointment> {
    return this.updateAppointmentUseCase.execute(id, appointmentData);
  }
}
