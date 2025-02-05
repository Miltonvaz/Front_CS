import { Observable } from 'rxjs';
import { Appointment } from '../models/appointment/appointment';


export interface AppointmentRepository {
  createAppointment(appointmentData: Appointment): Observable<Appointment>;
  getAppointments(): Observable<Appointment[]>;
  getAppointmentById(id: number): Observable<Appointment>;
  updateAppointment(id: number, appointmentData: Appointment): Observable<Appointment>;
  deleteAppointment(id: number): Observable<void>;
  updateAppointmentStatus(id: number, status: string): Observable<Appointment>;
  getAppointmentStatus(id: number): Observable<string>;
}
