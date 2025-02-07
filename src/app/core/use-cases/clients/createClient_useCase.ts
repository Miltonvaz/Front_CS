import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../../domain/clients/clients';
import { ClientRepositoryImpl } from '../../../data/repository/client_repository_impl';
import { ClientRepository } from '../../repository/clients-repository';


@Injectable({
  providedIn: 'root',
})
export class CreateClientUseCase {
  constructor(@Inject(ClientRepositoryImpl) private clientRepository: ClientRepository) {}

  execute(clientData: Client): Observable<Client> {
    return this.clientRepository.createClient(clientData);
  }
}
