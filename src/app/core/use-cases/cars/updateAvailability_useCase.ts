import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../../domain/car/car';
import { CarRepository } from '../../repository/car-repository';
import { CarRepositoryImpl } from '../../../data/repository/car_repository_impl';

@Injectable({
  providedIn: 'root',
})
export class UpdateAvailabilityUseCase {
  constructor(@Inject(CarRepositoryImpl) private carRepository: CarRepository) {}

  execute(carId: number, available: boolean): Observable<Car> {
    return this.carRepository.updateAvailability(carId, available); 
  }
}
