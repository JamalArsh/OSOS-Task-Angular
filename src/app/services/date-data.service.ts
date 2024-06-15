import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DateRequestDto } from '../dtos/date-request-dto';
import { DateResponseDto } from '../dtos/date-response-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DateDataService {
  private baseUrl = 'http://localhost:5237';

  constructor(private http: HttpClient) {}

  getEndDate(dateRequestDto: DateRequestDto): Observable<DateResponseDto> {
    const url = this.baseUrl + '/api/date';

    console.log(url);
    console.log(dateRequestDto);

    return this.http.post<DateResponseDto>(url, dateRequestDto);
  }
}
