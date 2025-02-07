import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../../domain/clients/clients';
import { CreateClientUseCase } from '../../use-cases/clients/createClient_useCase';

@Injectable({
  providedIn: 'root',
})
export class CreateClientService {
  constructor(private createClientUseCase: CreateClientUseCase) {}

  createClient(clientData: Client): Observable<Client> {
    return this.createClientUseCase.execute(clientData); 
  }
}
