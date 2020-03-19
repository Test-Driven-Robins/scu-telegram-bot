import DayMenu from "../models/DayMenu";

export enum WEEKDAYS {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday
}

export class SCUController {
  async getDayMenu(day: WEEKDAYS): Promise<DayMenu> {
    throw new Error();
  }
  async getToday(): Promise<DayMenu> {
    throw new Error();
  }
  async getTomorrow(): Promise<DayMenu> {
    throw new Error();
  }
}

class MenuNotExist extends Error {}
