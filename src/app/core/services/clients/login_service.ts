import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUseCase } from '../../use-cases/clients/login_useCase';


@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private loginUseCase: LoginUseCase) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.loginUseCase.execute(credentials); 
  }
}
