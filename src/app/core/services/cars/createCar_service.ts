import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateCarUseCase } from '../../use-cases/cars/createCar_useCase';
import { Car } from '../../domain/car/car';


@Injectable({
  providedIn: 'root',
})
export class CreateCarService {
  constructor(private createCarUseCase: CreateCarUseCase) {}

  createCar(carData: Car): Observable<Car> {
    return this.createCarUseCase.execute(carData); 
  }
}
