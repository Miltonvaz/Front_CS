import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../../models/car/car';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  private apiUrl = 'http://localhost:8080/cars';

  constructor(private http: HttpClient) {}

  createCar(carData: any): Observable<any> {
    return this.http.post(this.apiUrl, carData);
  }

  getCars(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getCarById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateCar(id: number, carData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, carData);
  }

  deleteCar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateAvailability(carId: number, updatePayload: { available: boolean }): Observable<Car> {
    return this.http.put<Car>(`${this.apiUrl}/${carId}/availability`, updatePayload);
  }

  getAvailableCars(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/available`);
  }
  
}
