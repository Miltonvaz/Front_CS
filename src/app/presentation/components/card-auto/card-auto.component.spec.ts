import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAutoComponent } from './card-auto.component';

describe('CardAutoComponent', () => {
  let component: CardAutoComponent;
  let fixture: ComponentFixture<CardAutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardAutoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
