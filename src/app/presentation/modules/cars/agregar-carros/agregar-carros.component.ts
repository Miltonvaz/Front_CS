import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { CreateCarService } from '../../../../core/services/cars/createCar_service';
import { HeaderSimpleComponent } from '../../../components/header-simple/header-simple.component';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';


@Component({
  selector: 'app-agregar-carros',
  standalone: true,
  imports: [CommonModule, HeaderSimpleComponent, SidebarComponent, ReactiveFormsModule],
  templateUrl: './agregar-carros.component.html',
  styleUrls: ['./agregar-carros.component.scss']
})
export class AgregarCarrosComponent {
  carForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private carService: CreateCarService,
    private router: Router
  ) {
    this.carForm = this.fb.group({
      make: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      mileage: ['', [Validators.required, Validators.min(0)]],
      fuelType: ['', Validators.required]
    });
  }

  registerCar(): void {
    if (this.carForm.invalid) {
      Swal.fire({
        title: 'Formulario incompleto',
        text: 'Por favor, completa todos los campos correctamente.',
        icon: 'warning',
        confirmButtonText: 'Entendido'
      });
      return;
    }

    const carData = { ...this.carForm.value, available: true };

    Swal.fire({
      title: 'Registrando...',
      text: 'Por favor, espera un momento.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.carService.createCar(carData).subscribe({
      next: () => {
        Swal.fire({
          title: 'Éxito',
          text: 'El carro ha sido registrado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          this.router.navigate(['/dashboard']);
        });
      },
      error: (err: any) => {
        console.error('Error al registrar el carro:', err);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo registrar el carro. Inténtalo nuevamente.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }
}
