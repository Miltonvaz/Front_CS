import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderSimpleComponent } from '../../components/header-simple/header-simple.component';
import { ClientsService } from '../../services/clients/clients.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, HeaderSimpleComponent, FormsModule, ReactiveFormsModule], 
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clientsService: ClientsService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cellphone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(18)]]
    });
  }

  register(): void {
    if (this.registerForm.invalid) {
      Swal.fire('Error', 'Por favor, completa todos los campos correctamente.', 'error');
      return;
    }

    this.clientsService.createClient(this.registerForm.value).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Registro exitoso. Ahora puedes iniciar sesión.', 'success');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error en el registro:', err);
        Swal.fire('Error', 'No se pudo completar el registro. Intenta de nuevo.', 'error');
      }
    });
  }
}
