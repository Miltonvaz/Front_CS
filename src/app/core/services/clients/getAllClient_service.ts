import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAllClientsUseCase } from '../../use-cases/clients/getAllClient_useCase';

@Injectable({
  providedIn: 'root',
})
export class GetAllClientsService {
  constructor(private getAllClientsUseCase: GetAllClientsUseCase) {}

  getAllClients(): Observable<any[]> {
    return this.getAllClientsUseCase.execute();
  }
}
