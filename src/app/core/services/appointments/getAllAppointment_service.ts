import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAppointmentsUseCase } from '../../use-cases/appointments/getAllAppointment_useCase';
import { Appointment } from '../../domain/appointment/appointment';

@Injectable({
  providedIn: 'root',
})
export class GetAppointmentsService {
  constructor(private getAppointmentsUseCase: GetAppointmentsUseCase) {}

  getAppointments(): Observable<Appointment[]> {
    return this.getAppointmentsUseCase.execute();
  }
}
