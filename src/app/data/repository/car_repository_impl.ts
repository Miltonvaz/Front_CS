import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { CarRepository } from '../../core/repository/car-repository';
import { CarDataSource } from '../datasources/car_datasources';
import { Car } from '../../core/domain/car/car';

@Injectable({
  providedIn: 'root'
})
export class CarRepositoryImpl implements CarRepository {

  constructor(private carDataSource: CarDataSource) {}

  createCar(carData: Car): Observable<Car> {
    return this.carDataSource.createCar(carData);
  }

  getCars(): Observable<{ cars: Car[] }> {
    return this.carDataSource.getCars().pipe(
      map(cars => ({ cars }))
    );
  }

  getCarById(id: number): Observable<Car> {
    return this.carDataSource.getCarById(id);
  }

  updateCar(id: number, carData: Car): Observable<Car> {
    return this.carDataSource.updateCar(id, carData);
  }

  deleteCar(id: number): Observable<void> {
    return this.carDataSource.deleteCar(id);
  }

  updateAvailability(carId: number, available: boolean): Observable<Car> {
    return this.carDataSource.updateAvailability(carId, available);
  }

  getAvailableCars(): Observable<Car[]> {
    return this.carDataSource.getAvailableCars();
  }
}
