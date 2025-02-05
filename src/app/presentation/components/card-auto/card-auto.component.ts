import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-auto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-auto.component.html',
  styleUrls: ['./card-auto.component.scss']
})
export class CardAutoComponent {
  @Input() imageUrl!: string;
  @Input() make!: string;
  @Input() model!: string;
  @Input() year!: number;
  @Input() mileage!: number;
  @Input() fuelType!: string;
  @Input() available!: boolean;
  @Input() carId!: number;
  @Input() showAvailabilityButton: boolean = true; 
  
  @Output() availabilityChanged = new EventEmitter<{ carId: number, availability: boolean }>();

  toggleAvailability(): void {
    const newAvailability = !this.available;
    this.availabilityChanged.emit({
      carId: this.carId,
      availability: newAvailability
    });
  }
}
