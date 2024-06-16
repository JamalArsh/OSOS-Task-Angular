import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetEndDatePageComponent } from './get-end-date-page.component';

import { DateDataService } from '../../services/date-data.service';
import { DayDetailsCardComponent } from '../../components/day-details-card/day-details-card.component';
import {
  NzNotificationModule,
  NzNotificationService,
} from 'ng-zorro-antd/notification';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { of, throwError } from 'rxjs';

describe('GetEndDatePageComponent', () => {
  let component: GetEndDatePageComponent;
  let fixture: ComponentFixture<GetEndDatePageComponent>;
  let mockDateDataService = jasmine.createSpyObj('DateDataService', [
    'getEndDate',
  ]);
  let mockNotificationService = jasmine.createSpyObj('NzNotificationService', [
    'error',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        GetEndDatePageComponent,
        ReactiveFormsModule,
        NzNotificationModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: DateDataService, useValue: mockDateDataService },
        { provide: NzNotificationService, useValue: mockNotificationService },
        { provide: NZ_I18N, useValue: en_US },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    mockDateDataService = TestBed.inject(
      DateDataService
    ) as jasmine.SpyObj<DateDataService>;
    mockNotificationService = TestBed.inject(
      NzNotificationService
    ) as jasmine.SpyObj<NzNotificationService>;

    fixture = TestBed.createComponent(GetEndDatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.dateForm).toBeDefined();
    expect(component.dateForm.controls['date']).toBeDefined();
    expect(component.dateForm.controls['days']).toBeDefined();
  });

  it('should display error messages for invalid form', () => {
    const dateControl = component.dateForm.controls['date'];
    dateControl.setValue(null);
    const daysControl = component.dateForm.controls['days'];
    daysControl.setValue(null);

    component.onSubmit();

    expect(dateControl.invalid).toBeTrue();
    expect(daysControl.invalid).toBeTrue();
  });

  it('should call getEndDate on valid form submission', () => {
    component.dateForm.controls['date'].setValue(new Date('2024-06-16'));
    component.dateForm.controls['days'].setValue(1);

    const spy = spyOn(component, 'getEndDate');

    component.onSubmit();

    expect(spy).toHaveBeenCalled();
  });

  it('should handle getEndDate success', () => {
    const mockResponse = {
      endDate: '2024-06-20',
      dayDetails: [
        { date: '2024-06-17', dayOfWeek: 'Monday', isHoliday: false },
      ],
    };

    mockDateDataService.getEndDate.and.returnValue(of(mockResponse));

    component.getEndDate(new Date('2024-06-17'), 3);

    expect(component.endResponse).toBeDefined();

    expect(mockDateDataService.getEndDate).toHaveBeenCalledWith({
      startDate: '2024-06-17',
      workingDays: 3,
    });

    expect(component.endResponse).toEqual(mockResponse);
  });

  it('should handle getEndDate error', () => {
    mockDateDataService.getEndDate.and.returnValue(throwError('Error'));

    component.getEndDate(new Date('2024-06-17'), 3);

    expect(component.endResponse).toBeUndefined();
    expect(mockNotificationService.error).toHaveBeenCalledWith(
      'Error',
      'Error while getting response from server'
    );
  });
});
