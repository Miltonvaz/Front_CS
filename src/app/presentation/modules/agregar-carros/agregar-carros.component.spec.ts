import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCarrosComponent } from './agregar-carros.component';

describe('AgregarCarrosComponent', () => {
  let component: AgregarCarrosComponent;
  let fixture: ComponentFixture<AgregarCarrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarCarrosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarCarrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
