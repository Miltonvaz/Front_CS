import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../../domain/car/car';
import { GetCarByIdUseCase } from '../../use-cases/cars/getByIdCar_useCase';

@Injectable({
  providedIn: 'root',
})
export class GetCarByIdService {
  constructor(private getCarByIdUseCase: GetCarByIdUseCase) {}

  getCarById(id: number): Observable<Car> {
    return this.getCarByIdUseCase.execute(id); 
  }
}
