import { Inject, Injectable } from '@angular/core';
import { Appointment } from '../../domain/appointment/appointment';
import { AppointmentRepositoryImpl } from '../../../data/repository/appointment_repositoryImpl';
import { AppointmentRepository } from '../../repository/appointment-repository';


@Injectable({
  providedIn: 'root'
})
export class UpdateAppointmentUseCase {

  constructor(@Inject(AppointmentRepositoryImpl)private appointmentRepository: AppointmentRepository) {}

  execute(id: number, appointmentData: Appointment) {
    return this.appointmentRepository.updateAppointment(id, appointmentData);
  }
}
