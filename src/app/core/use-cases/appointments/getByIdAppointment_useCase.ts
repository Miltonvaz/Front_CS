import { Inject, Injectable } from '@angular/core';
import { AppointmentRepositoryImpl } from '../../../data/repository/appointment_repositoryImpl';
import { AppointmentRepository } from '../../repository/appointment-repository';


@Injectable({
  providedIn: 'root'
})
export class GetAppointmentByIdUseCase {

  constructor(@Inject(AppointmentRepositoryImpl)private appointmentRepository: AppointmentRepository) {}

  execute(id: number) {
    return this.appointmentRepository.getAppointmentById(id);
  }
}
