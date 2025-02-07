import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeleteClientUseCase } from '../../use-cases/clients/deleteClietn_useCase';


@Injectable({
  providedIn: 'root',
})
export class DeleteClientService {
  constructor(private deleteClientUseCase: DeleteClientUseCase) {}

  deleteClient(id: number): Observable<void> {
    return this.deleteClientUseCase.execute(id); 
  }
}
