import { TestBed } from '@angular/core/testing';

import { DateDataService } from './date-data.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { DateRequestDto } from '../dtos/date-request-dto';
import { DateResponseDto } from '../dtos/date-response-dto';

describe('DateDataService', () => {
  let service: DateDataService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(DateDataService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get end date', () => {
    const url = 'http://localhost:5237' + '/api/date';

    const dateRequestDto: DateRequestDto = {
      startDate: '2024-06-15',
      workingDays: 1,
    };
    const responseData: DateResponseDto = {
      endDate: '2024-06-12',
      dayDetails: [
        { date: '2024-06-12', dayOfWeek: 'Wednesday', isHoliday: false },
      ],
    };

    service.getEndDate(dateRequestDto).subscribe((response) => {
      expect(response.endDate).toBeTruthy();
      expect(response).toEqual(responseData);
    });

    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush(responseData);
  });
});
