import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarRepository } from '../../repository/car-repository';
import { CarRepositoryImpl } from '../../../data/repository/car_repository_impl';

@Injectable({
  providedIn: 'root',
})
export class DeleteCarUseCase {
  constructor(  @Inject(CarRepositoryImpl ) private carRepository: CarRepository) {}

  execute(carId: number): Observable<void> {
    return this.carRepository.deleteCar(carId);  
  }
}
