import { Inject, Injectable } from '@angular/core';
import { AppointmentRepositoryImpl } from '../../../data/repository/appointment_repositoryImpl';
import { AppointmentRepository } from '../../repository/appointment-repository';


@Injectable({
  providedIn: 'root'
})
export class GetAppointmentsUseCase {

  constructor(@Inject(AppointmentRepositoryImpl) private appointmentRepository: AppointmentRepository) {}

  execute() {
    return this.appointmentRepository.getAppointments();
  }
}
