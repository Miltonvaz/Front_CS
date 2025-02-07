import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientRepositoryImpl } from '../../../data/repository/client_repository_impl';
import { ClientRepository } from '../../repository/clients-repository';


@Injectable({
  providedIn: 'root',
})
export class DeleteClientUseCase {
  constructor(@Inject(ClientRepositoryImpl) private clientRepository: ClientRepository) {}

  execute(id: number): Observable<void> {
    return this.clientRepository.deleteClient(id); 
  }
}
