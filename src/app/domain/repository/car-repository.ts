import { Observable } from 'rxjs';
import { Car } from '../models/car/car';


export interface CarRepository {
  createCar(carData: Car): Observable<Car>;
  getCars(): Observable<Car[]>;
  getCarById(id: number): Observable<Car>;
  updateCar(id: number, carData: Car): Observable<Car>;
  deleteCar(id: number): Observable<void>;
  updateAvailability(carId: number, available: boolean): Observable<Car>;
  getAvailableCars(): Observable<Car[]>;
}
