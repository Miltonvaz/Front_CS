import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { AgendarCitaComponent } from './modules/agendar-cita/agendar-cita.component';
import { RegisterComponent } from './modules/register/register.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { VerCarrosComponent } from './modules/ver-carros/ver-carros.component';
import { AgregarCarrosComponent } from './modules/agregar-carros/agregar-carros.component';
import { VerCitasComponent } from './modules/ver-citas/ver-citas.component';
import { VerCitasCComponent } from './modules/ver-citas_c/ver-citas-c/ver-citas-c.component';
export const routes: Routes = [
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'agendar-cita', component: AgendarCitaComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'ver-carros', component: VerCarrosComponent },
    { path: 'agregar-carros', component: AgregarCarrosComponent },
    { path: 'ver-citas', component: VerCitasComponent },
    { path: 'ver-citasC', component: VerCitasCComponent },
];
