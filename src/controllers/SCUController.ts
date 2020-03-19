import DayMenu from "../models/DayMenu";
import fs from "fs";

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
  private static JSON_FILE = "menus.json";
  private menus: DayMenu[];

  constructor() {
    try {
      this.readMenusFromFile();
    } catch (err) {
      console.error(`Could not read from ${SCUController.JSON_FILE}`);
      throw err;
    }
  }

  async getDayMenu(day: Weekdays): Promise<DayMenu> {
    const date: Date = this.getDateFromWeekday(day);
    const dayMenu: DayMenu | undefined = this.searchDayMenu(date);

    if (dayMenu == undefined) {
      /*
      Extractor
      */
      throw new Error();
    } else return dayMenu;
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

  private searchDayMenu(date: Date): DayMenu | undefined {
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();
    return this.menus.find((menu: DayMenu) => {
      return menu.day == day && menu.month == month && menu.year == year;
    });
  }

  private getDateFromWeekday(day: Weekdays) {
    const now = new Date();
    const today: Weekdays = now.getUTCDay();

    const increment: number = day - today;

    const toReturn = new Date();

    toReturn.setDate(now.getDate() + increment);

    return toReturn;
  }

  private readMenusFromFile() {
    try {
      const data = fs.readFileSync(SCUController.JSON_FILE);
      this.menus = JSON.parse(data.toString());
    } catch (err) {
      throw new JSONReadError();
    }
  }
}

class JSONReadError extends Error {}
