export interface DateResponseDto {
  endDate: string;
  dayDetails: DayDetail[];
}

interface DayDetail {
  date: string;
  dayOfWeek: string;
  isHoliday: boolean;
}
