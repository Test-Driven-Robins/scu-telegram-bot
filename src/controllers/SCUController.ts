import DayMenu from "../models/DayMenu";
import { SCUService } from "./SCUService.interface";

export enum Weekdays {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday
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
    const weekDay: Weekdays = new Date().getDay();
    return this.getDayMenu(weekDay);
  }
  async getTomorrow(): Promise<DayMenu> {
    const now = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(now.getDay() + 1);
    const weekDay: Weekdays = tomorrow.getDay();
    return this.getDayMenu(weekDay);
  }

  private getDateFromWeekday(day: Weekdays) {
    const now = new Date();
    const today: Weekdays = now.getUTCDay();

    const increment: number = day - today;

    const toReturn = new Date();

    toReturn.setDate(now.getDate() + increment);

    return toReturn;
  }
}
