import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Appointment } from '../../domain/appointment/appointment';
import { UpdateAppointmentStatusUseCase } from '../../use-cases/appointments/updateAppointmentStatus';

@Injectable({
  providedIn: 'root',
})
export class UpdateAppointmentStatusService {
  constructor(private updateAppointmentStatusUseCase: UpdateAppointmentStatusUseCase) {}

  updateAppointmentStatus(id: number, status: string): Observable<Appointment> {
    return this.updateAppointmentStatusUseCase.execute(id, status);
  }
}
