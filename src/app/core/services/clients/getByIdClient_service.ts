import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetClientByIdUseCase } from '../../use-cases/clients/getByIdClietn_useCase';

@Injectable({
  providedIn: 'root',
})
export class GetClientByIdService {
  constructor(private getClientByIdUseCase: GetClientByIdUseCase) {}

  getClientById(id: number): Observable<any> {
    return this.getClientByIdUseCase.execute(id);
  }
}
