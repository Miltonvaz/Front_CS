import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationUseCase } from '../../use-cases/notification/notification_use_case';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private notificationUseCase: NotificationUseCase) {}

  startPolling(): void {
    this.notificationUseCase.startPolling();
  }

  stopPolling(): void {
    this.notificationUseCase.stopPolling();
  }

  
  getNotifications(): Observable<any> {
    return this.notificationUseCase.getNotifications();
  }
}
