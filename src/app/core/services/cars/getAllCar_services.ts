import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAllCarsUseCase } from '../../use-cases/cars/getAllCar_useCase';
import { Car } from '../../domain/car/car';


@Injectable({
  providedIn: 'root',
})
export class GetAllCarService {
  constructor(private getAllCarsUseCase: GetAllCarsUseCase) {}

  getAllCars(): Observable<Car[]> {
    return this.getAllCarsUseCase.execute();  
  }
}
