export interface Appointment {
  appointment_id: number;
  car_id: number;
  client_id: number;
  test_date: {
    Time: string | null;
    Valid: boolean;
  };
  location: string;
  status: string;
}
