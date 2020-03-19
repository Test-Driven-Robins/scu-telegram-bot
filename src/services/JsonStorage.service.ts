import { SCUService } from "../controllers/SCUService.interface";
import fs from "fs";
import DayMenu from "../models/DayMenu";

export class JsonStorage implements SCUService {
  private static JSON_FILE = "menus.json";
  private menus: DayMenu[];
  constructor() {
    try {
      this.readMenusFromFile();
    } catch (err) {
      throw err;
    }
  }

  async getDayMenu(day: number, month: number, year: number): Promise<DayMenu> {
    const memoryResult = this.findMenuInMemory(day, month, year);
    if (memoryResult != undefined) return memoryResult;
    else throw new Error();
  }

  private findMenuInMemory(
    day: number,
    month: number,
    year: number
  ): DayMenu | undefined {
    return this.menus.find(
      menu => day == menu.day && month == menu.month && year == menu.year
    );
  }
  private readMenusFromFile() {
    try {
      const data = fs.readFileSync(JsonStorage.JSON_FILE);
      this.menus = JSON.parse(data.toString());
    } catch (err) {
      throw new JSONReadError();
    }
  }
}

class JSONReadError extends Error {}
