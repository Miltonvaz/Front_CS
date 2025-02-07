import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientDataSource } from '../datasources/client_datasource';
import { Client } from '../../core/domain/clients/clients';
import { ClientRepository } from '../../core/repository/clients-repository';

@Injectable({
  providedIn: 'root'
})
export class ClientRepositoryImpl implements ClientRepository {
  constructor(private clientDataSource: ClientDataSource) {}

  createClient(clientData: Client): Observable<Client> {
    return this.clientDataSource.createClient(clientData);
  }

  getClients(): Observable<Client[]> {
    return this.clientDataSource.getClients();
  }

  getClientById(id: number): Observable<Client> {
    return this.clientDataSource.getClientById(id);
  }

  updateClient(id: number, clientData: Client): Observable<Client> {
    return this.clientDataSource.updateClient(id, clientData);
  }

  deleteClient(id: number): Observable<void> {
    return this.clientDataSource.deleteClient(id);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.clientDataSource.login(credentials);
  }
}
