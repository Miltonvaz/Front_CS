import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateClientUseCase } from '../../use-cases/clients/UpdateClient_useCase';


@Injectable({
  providedIn: 'root',
})
export class UpdateClientService {
  constructor(private updateClientUseCase: UpdateClientUseCase) {}

  updateClient(id: number, clientData: any): Observable<any> {
    return this.updateClientUseCase.execute(id, clientData); 
  }
}
