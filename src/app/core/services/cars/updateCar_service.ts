import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../../domain/car/car';
import { UpdateCarUseCase } from '../../use-cases/cars/updateCar_useCase';

@Injectable({
  providedIn: 'root',
})
export class UpdateCarService {
  constructor(private updateCarUseCase: UpdateCarUseCase) {}

  updateCar(id: number, carData: Car): Observable<Car> {
    return this.updateCarUseCase.execute(id, carData); 
  }
}
