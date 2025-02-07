import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AgendarCitaComponent } from './modules/appointment/agendar-cita/agendar-cita.component';
import { VerCitasCComponent } from './modules/appointment/ver-citas-c/ver-citas-c.component';
import { VerCitasComponent } from './modules/appointment/ver-citas/ver-citas.component';
import { AgregarCarrosComponent } from './modules/cars/agregar-carros/agregar-carros.component';
import { VerCarrosComponent } from './modules/cars/ver-carros/ver-carros.component';
import { LoginComponent } from './modules/clients/login/login.component';
import { RegisterComponent } from './modules/clients/register/register.component';
import { HomeComponent } from './modules/home/home.component';


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
