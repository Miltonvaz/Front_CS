import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAppointmentStatusUseCase } from '../../use-cases/appointments/getAppointmentStatus_useCase';


@Injectable({
  providedIn: 'root',
})
export class GetAppointmentStatusService {
  constructor(private getAppointmentStatusUseCase: GetAppointmentStatusUseCase) {}

  getAppointmentStatus(id: number): Observable<string> {
    return this.getAppointmentStatusUseCase.execute(id);
  }
}
