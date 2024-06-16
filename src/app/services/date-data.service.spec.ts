import { TestBed } from '@angular/core/testing';

import { DateDataService } from './date-data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DateRequestDto } from '../dtos/date-request-dto';

describe('DateDataService', () => {
  let service: DateDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(DateDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get end date', () => {
    const dateRequestDto: DateRequestDto = {
      startDate: new Date('2024-06-17').toISOString(),
      workingDays: 5,
    };

    service.getEndDate(dateRequestDto).subscribe((response) => {
      expect(response.endDate).toBeTruthy();
    });
  });
});
