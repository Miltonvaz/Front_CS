import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Car } from '../../core/domain/car/car';

@Injectable({
  providedIn: 'root'
})
export class CarDataSource {

  private apiUrl = 'http://localhost:8080/cars';

  constructor(private http: HttpClient) {}

  createCar(carData: Car): Observable<Car> {
    return this.http.post<Car>(this.apiUrl, carData);
  }

  getCars(): Observable<Car[]> {
    return this.http.get<{ cars: Car[] }>(this.apiUrl).pipe(
      map(response => response.cars) 
    );
  }
  
  
  getCarById(id: number): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl}/${id}`);
  }

  updateCar(id: number, carData: Car): Observable<Car> {
    return this.http.put<Car>(`${this.apiUrl}/${id}`, carData);
  }

  deleteCar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateAvailability(carId: number, available: boolean): Observable<Car> {
    return this.http.patch<Car>(`${this.apiUrl}/${carId}/availability`, { available });
  }

  getAvailableCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiUrl}/available`);
  }
}
