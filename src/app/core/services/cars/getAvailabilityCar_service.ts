import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Car } from '../../domain/car/car';
import { GetAvailableCarsUseCase } from '../../use-cases/cars/getAvailability_useCase';

@Injectable({
  providedIn: 'root',
})
export class GetAvailableCarsService {
  constructor(private getAvailableCarsUseCase: GetAvailableCarsUseCase) {}

  getAvailableCars(): Observable<Car[]> {
    return this.getAvailableCarsUseCase.execute(); 
  }
}
