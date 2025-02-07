import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCarrosComponent } from './ver-carros.component';

describe('VerCarrosComponent', () => {
  let component: VerCarrosComponent;
  let fixture: ComponentFixture<VerCarrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerCarrosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerCarrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
