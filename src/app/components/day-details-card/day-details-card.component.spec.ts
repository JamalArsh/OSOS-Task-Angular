import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayDetailsCardComponent } from './day-details-card.component';
import { By } from '@angular/platform-browser';

describe('DayDetailsCardComponent', () => {
  let component: DayDetailsCardComponent;
  let fixture: ComponentFixture<DayDetailsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayDetailsCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DayDetailsCardComponent);
    component = fixture.componentInstance;
    component.date = new Date('2024-06-17');
    component.dayOfWeek = 'Monday';
    component.isHoliday = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct date', () => {
    const dateElement = fixture.debugElement.query(By.css('h3'));
    expect(dateElement.nativeElement.textContent).toContain('2024-06-17');
  });

  it('should display the correct day of the week', () => {
    const dayOfWeekElement = fixture.debugElement.query(By.css('h4'));
    expect(dayOfWeekElement.nativeElement.textContent).toContain('Monday');
  });

  it('should correctly indicate if it is a holiday', () => {
    component.isHoliday = true;
    fixture.detectChanges();
    const holidayIndicatorElement = fixture.debugElement.query(
      By.css('.holiday-indicator')
    );
    expect(holidayIndicatorElement).toBeTruthy();
  });

  it('should not display the holiday indicator if it is not a holiday', () => {
    component.isHoliday = false;
    fixture.detectChanges();
    const holidayIndicatorElement = fixture.debugElement.query(
      By.css('.holiday-indicator')
    );
    expect(holidayIndicatorElement).toBeFalsy();
  });

  it('should apply weekend class for weekends or holidays', () => {
    component.dayOfWeek = 'Saturday';
    fixture.detectChanges();
    const mainContainer = fixture.debugElement.query(By.css('.main-container'));
    expect(mainContainer.nativeElement.classList).toContain('weekend');

    component.dayOfWeek = 'Monday';
    component.isHoliday = true;
    fixture.detectChanges();
    expect(mainContainer.nativeElement.classList).toContain('weekend');
  });

  it('should apply weekday class for weekdays', () => {
    component.dayOfWeek = 'Monday';
    component.isHoliday = false;
    fixture.detectChanges();
    const mainContainer = fixture.debugElement.query(By.css('.main-container'));
    expect(mainContainer.nativeElement.classList).toContain('weekday');
  });
});
