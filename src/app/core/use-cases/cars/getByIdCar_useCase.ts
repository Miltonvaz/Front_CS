import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../../domain/car/car';
import { CarRepository } from '../../repository/car-repository';
import { CarRepositoryImpl } from '../../../data/repository/car_repository_impl';

@Injectable({
  providedIn: 'root',
})
export class GetCarByIdUseCase {
  constructor(@Inject(CarRepositoryImpl ) private carRepository: CarRepository) {}

  execute(id: number): Observable<Car> {
    return this.carRepository.getCarById(id); 
  }
}
