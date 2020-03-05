import Menu from "../models/Menu";
import MenuTypes from "../models/MenuTypes";

enum Days {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday
}

class SCUController {
  queryDailyMenu(place: string): Menu {
    return new Menu();
  }

  queryMenuFromDate(date: Date, place: string): Menu {
    return new Menu();
  }

  queryMenu(day: Date, place: string): Menu {
    return new Menu();
  }

  dailyReminder() {}

  setPreferences(name: string, menuType: MenuTypes) {}
}

class MenuNotExist extends Error {}

export default SCUController;
