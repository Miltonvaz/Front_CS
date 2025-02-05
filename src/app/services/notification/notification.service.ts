import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSubject = new Subject<any>();
  private apiUrl = 'http://localhost:8080/notifications';
  private pollingActive = false;

  constructor(private http: HttpClient) {}

  startLongPolling(): void {
    if (this.pollingActive) return;
    this.pollingActive = true;
    this.poll();
  }

  private poll(): void {
    if (!this.pollingActive) return;

    this.http.get(this.apiUrl, { responseType: 'json' }).subscribe(
      (data: any) => {
        if (data) {
          this.notificationSubject.next(data);
        }
        this.poll(); 
      },
      (error) => {
        console.error('Error al obtener notificaciones:', error);
        setTimeout(() => this.poll(), 5000); 
      }
    );
  }

  stopLongPolling(): void {
    this.pollingActive = false;
  }

  getNotifications(): Observable<any> {
    return this.notificationSubject.asObservable();
  }
}
