import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationRepository } from '../../repository/notification-repository';
import { NotificationRepositoryImpl } from '../../../data/repository/notification_repository_impl';


@Injectable({
  providedIn: 'root',
})
export class NotificationUseCase {
  constructor( @Inject(NotificationRepositoryImpl) private notificationRepository: NotificationRepository) {}

  startPolling(): void {
    this.notificationRepository.startLongPolling();
  }

  stopPolling(): void {
    this.notificationRepository.stopLongPolling();
  }
  getNotifications(): Observable<any> {
    return this.notificationRepository.getNotifications();
  }
}
