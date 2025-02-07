import { Injectable } from '@angular/core';

import { Appointment } from '../../domain/appointment/appointment';
import { Observable } from 'rxjs';
import { GetAppointmentByIdUseCase } from '../../use-cases/appointments/getByIdAppointment_useCase';

@Injectable({
  providedIn: 'root',
})
export class getByIdAppointmentService {
  constructor(private getAppointmentByIdUseCase: GetAppointmentByIdUseCase) {}


  getAppointmentById(appointmentId:number): Observable<Appointment | undefined> {
    return this.getAppointmentByIdUseCase.execute(appointmentId);
  }
}
