import { Inject, Injectable } from '@angular/core';
import { AppointmentRepositoryImpl } from '../../../data/repository/appointment_repositoryImpl';
import { AppointmentRepository } from '../../repository/appointment-repository';

@Injectable({
  providedIn: 'root'
})
export class DeleteAppointmentUseCase {

  constructor( @Inject(AppointmentRepositoryImpl) private appointmentRepository: AppointmentRepository) {}

  execute(id: number) {
    return this.appointmentRepository.deleteAppointment(id);
  }
}
