import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeleteAppointmentUseCase } from '../../use-cases/appointments/deleteAppointment_useCase';

@Injectable({
  providedIn: 'root',
})
export class DeleteAppointmentService {
  constructor(private deleteAppointmentUseCase: DeleteAppointmentUseCase) {}

  deleteAppointment(id: number): Observable<void> {
    return this.deleteAppointmentUseCase.execute(id);
  }
}
