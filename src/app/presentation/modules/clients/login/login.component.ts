import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { LoginService } from '../../../../core/services/clients/login_service';
import { HeaderSimpleComponent } from '../../../components/header-simple/header-simple.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, HeaderSimpleComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,  
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      Swal.fire('Error', 'Por favor, completa los campos correctamente.', 'error');
      return;
    }

    this.loginService.login(this.loginForm.value).subscribe({
      next: (response: { token: string; }) => {
        localStorage.setItem('token', response.token); 
        Swal.fire('Éxito', 'Inicio de sesión exitoso.', 'success');
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        console.error('Error en el inicio de sesión:', err);
        Swal.fire('Error', 'Credenciales incorrectas.', 'error');
      }
    });
  }
}
