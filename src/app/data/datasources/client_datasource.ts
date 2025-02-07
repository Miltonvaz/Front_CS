import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../../core/domain/clients/clients';

@Injectable({
  providedIn: 'root'
})
export class ClientDataSource {
  private apiUrl = 'http://localhost:8080/clients';

  constructor(private http: HttpClient) {}

  createClient(clientData: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, clientData);
  }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl);
  }

  getClientById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/${id}`);
  }

  updateClient(id: number, clientData: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/${id}`, clientData);
  }

  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    const loginUrl = `http://localhost:8080/login`;
    return this.http.post<any>(loginUrl, credentials);
  }
}
