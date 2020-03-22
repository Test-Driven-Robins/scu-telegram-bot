import DayMenu from '../models/DayMenu';
import { SCUService } from './SCUService.interface';

export enum Weekdays {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}

export class SCUController {
  constructor(private readonly scuService: SCUService) {}

  async getDayMenu(weekday: Weekdays): Promise<DayMenu> {
    const date: Date = this.getDateFromWeekday(weekday);
    const day: number = date.getDay();
    const month: number = date.getMonth();
    const year: number = date.getFullYear();
    return this.scuService.getDayMenu(day, month, year);
  }
  async getToday(): Promise<DayMenu> {
    const today: Weekdays = this.getTodayWeekday();
    return this.getDayMenu(today);
  }
  async getTomorrow(): Promise<DayMenu> {
    const today: Weekdays = this.getTodayWeekday();
    return this.getDayMenu(today + (1 % 7));
  }

  private getDateFromWeekday(day: Weekdays): Date {
    const today: Weekdays = this.getTodayWeekday();

    const increment: number = day - today;

    const toReturn = new Date();

    toReturn.setDate(toReturn.getDate() + increment);

    return toReturn;
  }

  private getTodayWeekday(): Weekdays {
    const now = new Date();
    return now.getUTCDay();
  }
}
