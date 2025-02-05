import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderSimpleComponent } from '../../components/header-simple/header-simple.component';
import { ClientsService } from '../../services/clients/clients.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, HeaderSimpleComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clientsService: ClientsService,
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

    this.clientsService.login(this.loginForm.value).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        Swal.fire('Éxito', 'Inicio de sesión exitoso.', 'success');
        this.router.navigate(['/dashboard']); // Redirige a la página principal
      },
      error: (err) => {
        console.error('Error en el inicio de sesión:', err);
        Swal.fire('Error', 'Credenciales incorrectas.', 'error');
      }
    });
  }
}
