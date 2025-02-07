import { Inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Car } from '../../domain/car/car';
import { CarRepository } from '../../repository/car-repository';
import { CarRepositoryImpl } from '../../../data/repository/car_repository_impl';

@Injectable({
  providedIn: 'root',
})
export class GetAllCarsUseCase {
  constructor(@Inject(CarRepositoryImpl ) private carRepository: CarRepository) {}
  
  execute(): Observable<Car[]> {
    return this.carRepository.getCars().pipe(
      map(response => response.cars)
    );
  }
}
