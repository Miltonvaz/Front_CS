import { Injectable } from '@angular/core';
import { Appointment } from '../../core/domain/appointment/appointment';
import { AppointmentDataSource } from '../datasources/appointment_datasource';
import { AppointmentRepository } from '../../core/repository/appointment-repository';

@Injectable({
  providedIn: 'root',
})
export class AppointmentRepositoryImpl implements AppointmentRepository {
  constructor(private appointmentDataSource: AppointmentDataSource) {}

  createAppointment(appointmentData: Appointment) {
    return this.appointmentDataSource.createAppointment(appointmentData);    }

  getAppointments() {
    return this.appointmentDataSource.getAppointments();
  }

  getAppointmentById(id: number) {
    return this.appointmentDataSource.getAppointmentById(id);  
  }

  updateAppointment(id: number, appointmentData: Appointment) {
    return this.appointmentDataSource.updateAppointment(id, appointmentData);  
  }

  deleteAppointment(id: number) {
    return this.appointmentDataSource.deleteAppointment(id); 
  }

  updateAppointmentStatus(id: number, status: string) {
    return this.appointmentDataSource.updateAppointmentStatus(id, status);  
  }

  getAppointmentStatus(id: number) {
    return this.appointmentDataSource.getAppointmentStatus(id); 
  }
}
