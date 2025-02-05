import { Observable } from 'rxjs';
import { Client } from '../models/clients/clients';

export interface ClientRepository {
  createClient(clientData: Client): Observable<Client>;
  getClients(): Observable<Client[]>;
  getClientById(id: number): Observable<Client>;
  updateClient(id: number, clientData: Client): Observable<Client>;
  deleteClient(id: number): Observable<void>;
  login(credentials: { email: string; password: string }): Observable<any>;
}
