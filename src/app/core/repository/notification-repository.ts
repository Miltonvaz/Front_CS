import { Observable } from 'rxjs';

export interface NotificationRepository {
  startLongPolling(): void;
  stopLongPolling(): void;
  getNotifications(): Observable<any>;
}
