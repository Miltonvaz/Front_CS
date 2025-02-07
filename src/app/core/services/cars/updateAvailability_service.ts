import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../../domain/car/car';
import { UpdateAvailabilityUseCase } from '../../use-cases/cars/updateAvailability_useCase';

@Injectable({
  providedIn: 'root',
})
export class UpdateAvailabilityService {
  constructor(private updateAvailabilityUseCase: UpdateAvailabilityUseCase) {}

  updateAvailability(carId: number, available: boolean): Observable<Car> {
    return this.updateAvailabilityUseCase.execute(carId, available); 
  }
}
