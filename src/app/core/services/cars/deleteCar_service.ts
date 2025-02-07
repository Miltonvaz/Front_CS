import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeleteCarUseCase } from '../../use-cases/cars/deleteCar_useCase';

@Injectable({
  providedIn: 'root',
})
export class DeleteCarService {
  constructor(private deleteCarUseCase: DeleteCarUseCase) {}

  deleteCar(carId: number): Observable<void> {
    return this.deleteCarUseCase.execute(carId); 
  }
}
