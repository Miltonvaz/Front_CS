import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from '../../domain/appointment/appointment';
import { CreateAppointmentUseCase } from '../../use-cases/appointments/createAppointment_useCase';

@Injectable({
  providedIn: 'root',
})
export class CreateAppointmentService {
  constructor(private createAppointmentUseCase: CreateAppointmentUseCase) {}

  createAppointment(appointmentData: Appointment): Observable<Appointment> {
    return this.createAppointmentUseCase.execute(appointmentData);
  }
}
