import { Inject, Injectable } from '@angular/core';
import { Appointment } from '../../domain/appointment/appointment';
import { AppointmentRepositoryImpl } from '../../../data/repository/appointment_repositoryImpl';
import { AppointmentRepository } from '../../repository/appointment-repository';

@Injectable({
  providedIn: 'root'
})
export class CreateAppointmentUseCase {
  constructor( @Inject(AppointmentRepositoryImpl) private appointmentRepository: AppointmentRepository) {}

  execute(appointmentData: Appointment) {
    return this.appointmentRepository.createAppointment(appointmentData);
  }
}
