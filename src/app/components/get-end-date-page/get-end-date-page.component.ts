import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DateDataService } from '../../services/date-data.service';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { DateResponseDto } from '../../dtos/date-response-dto';
import { DateRequestDto } from '../../dtos/date-request-dto';
import { CommonModule } from '@angular/common';
import { DayDetailsCardComponent } from '../day-details-card/day-details-card.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import {
  NzNotificationModule,
  NzNotificationService,
} from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-get-end-date-page',
  standalone: true,
  imports: [
    RouterOutlet,
    NzFormModule,
    NzDatePickerModule,
    NzInputNumberModule,
    NzGridModule,
    NzButtonModule,
    ReactiveFormsModule,
    CommonModule,
    DayDetailsCardComponent,
    NzSpinModule,
    NzNotificationModule,
  ],
  templateUrl: './get-end-date-page.component.html',
  styleUrl: './get-end-date-page.component.scss',
})
export class GetEndDatePageComponent implements OnInit, OnDestroy {
  dateForm!: FormGroup;
  endResponse: DateResponseDto | null | undefined;
  loading = false;
  public loadingSubscription!: Subscription;
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private dateDataService: DateDataService,
    private notification: NzNotificationService
  ) {}
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.dateForm = this.fb.group({
      date: [null, [Validators.required]],
      days: [null, [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit(): void {
    if (this.dateForm.valid) {
      this.getEndDate(this.dateForm.value.date, this.dateForm.value.days);
    } else {
      Object.values(this.dateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  getEndDate(startDate: Date, workingDays: number): void {
    this.loading = true;
    const finalDate = startDate.toISOString().split('T')[0];

    const dateRequest: DateRequestDto = {
      startDate: finalDate,
      workingDays,
    };
    this.dateDataService
      .getEndDate(dateRequest)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (res) => {
          this.endResponse = res;
          this.loading = false;
        },
        error: (err) => {
          console.log(err);
          this.notification.error(
            'Error',
            'Error while getting response from server'
          );
          this.loading = false;
        },
      });
  }
}
