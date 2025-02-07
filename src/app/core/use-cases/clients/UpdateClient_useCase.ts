import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientRepositoryImpl } from '../../../data/repository/client_repository_impl';
import { ClientRepository } from '../../repository/clients-repository';


@Injectable({
  providedIn: 'root',
})
export class UpdateClientUseCase {
  constructor(@Inject(ClientRepositoryImpl) private clientRepository: ClientRepository) {}

  execute(id: number, clientData: any): Observable<any> {
    return this.clientRepository.updateClient(id, clientData); 
  }
}
