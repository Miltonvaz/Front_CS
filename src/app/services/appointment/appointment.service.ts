import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'http://localhost:8080/appointments'; 

  constructor(private http: HttpClient) {}

  createAppointment(appointmentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, appointmentData);
  }

  getAppointments(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  getAppointmentById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateAppointment(id: number, appointmentData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, appointmentData);
  }

  deleteAppointment(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateAppointmentStatus(statusData: { id: number, status: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${statusData.id}/status`, { status: statusData.status });
  }
  

  getAppointmentStatus(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/status`);  
  }
}
