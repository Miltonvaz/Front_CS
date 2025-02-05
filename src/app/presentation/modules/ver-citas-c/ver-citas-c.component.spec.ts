import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCitasCComponent } from './ver-citas-c.component';

describe('VerCitasCComponent', () => {
  let component: VerCitasCComponent;
  let fixture: ComponentFixture<VerCitasCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerCitasCComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerCitasCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
