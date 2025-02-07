import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../../core/domain/appointment/appointment';

@Injectable({
  providedIn: 'root',
})
export class AppointmentDataSource {
  private apiUrl = 'http://localhost:8080/appointments';  

  constructor(private http: HttpClient) {}

  createAppointment(appointmentData: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(this.apiUrl, appointmentData); 
  }

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.apiUrl); 
  }

  getAppointmentById(id: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.apiUrl}/${id}`);  
  }

  updateAppointment(id: number, appointmentData: Appointment): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.apiUrl}/${id}`, appointmentData);  
  }

  deleteAppointment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`); 
  }

  updateAppointmentStatus(id: number, status: string): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.apiUrl}/${id}/status`, { status });  
  }

  getAppointmentStatus(id: number): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/${id}/status`);  
  }
}
