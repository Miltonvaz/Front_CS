import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientRepositoryImpl } from '../../../data/repository/client_repository_impl';
import { ClientRepository } from '../../repository/clients-repository';


@Injectable({
  providedIn: 'root',
})
export class GetClientByIdUseCase {
  constructor(@Inject(ClientRepositoryImpl) private clientRepository: ClientRepository) {}

  execute(id: number): Observable<any> {
    return this.clientRepository.getClientById(id); }
}
