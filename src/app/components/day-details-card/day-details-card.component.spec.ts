import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayDetailsCardComponent } from './day-details-card.component';

describe('DayDetailsCardComponent', () => {
  let component: DayDetailsCardComponent;
  let fixture: ComponentFixture<DayDetailsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayDetailsCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DayDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
