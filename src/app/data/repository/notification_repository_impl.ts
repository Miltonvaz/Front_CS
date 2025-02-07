import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { NotificationRepository } from '../../core/repository/notification-repository';
import { NotificationDataSource } from '../datasources/notification_datasource';

@Injectable({
  providedIn: 'root'
})
export class NotificationRepositoryImpl implements NotificationRepository {
  private pollingSubject: Subject<any> = new Subject();
  private pollingInterval: any;

  constructor(private notificationDataSource: NotificationDataSource) {}
  startLongPolling(): void {
    this.pollingInterval = setInterval(() => {
      this.notificationDataSource.getNotifications().subscribe(
        (notifications) => {
          this.pollingSubject.next(notifications);
        },
        (error) => {
          console.error('Error en long polling:', error);
        }
      );
    }, 5000);
  }

  stopLongPolling(): void {
    clearInterval(this.pollingInterval);
  }

  getNotifications(): Observable<any> {
    return this.pollingSubject.asObservable();
  }
}
