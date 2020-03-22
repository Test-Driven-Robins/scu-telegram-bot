import { SCUService } from '../controllers/SCUService.interface';
import fs from 'fs';
import DayMenu from '../models/DayMenu';
import { getAllDaysAvailable } from '../controllers/extractor';

export class JsonStorage implements SCUService {
  private static JSON_FILE = 'menus.json';
  private static URL =
    'https://web.archive.org/web/20180110215431/http://scu.ugr.es/';
  private static REFRESH_INTERVAL_MINUTES = 1;

  private menus: Map<string, DayMenu>;
  constructor() {
    try {
      this.initializeService();
    } catch (err) {
      throw err;
    }
  }

  async getDayMenu(day: number, month: number, year: number): Promise<DayMenu> {
    const memoryResult = this.findMenuInMemory(day, month, year);
    if (memoryResult != undefined) return memoryResult;
    else {
      await this.refreshFromTheWeb();
      const secondTry = this.findMenuInMemory(day, month, year);
      if (secondTry != undefined) return secondTry;
      else throw new Error();
    }
  }

  private async initializeService() {
    await this.readMenusFromFile();
    setInterval(async () => {
      await this.refreshFromTheWeb();
      await this.writeMenusToFile();
    }, JsonStorage.REFRESH_INTERVAL_MINUTES * 60 * 1000);
  }

  private async refreshFromTheWeb() {
    const dayMenus: DayMenu[] = await getAllDaysAvailable(JsonStorage.URL);
    this.menus = this.menuArrayToMap(dayMenus);
  }

  private findMenuInMemory(
    day: number,
    month: number,
    year: number,
  ): DayMenu | undefined {
    return this.menus.get(this.dateToString(day, month, year));
  }
  private readMenusFromFile() {
    try {
      const data = fs.readFileSync(JsonStorage.JSON_FILE);
      const menusAsArray = JSON.parse(data.toString());
      this.menus = this.menuArrayToMap(menusAsArray);
    } catch (err) {
      throw new JSONReadError();
    }
  }

  private async writeMenusToFile() {
    const menusAsArray = Array.from(this.menus.values());
    const menuDataString = JSON.stringify(menusAsArray);
    fs.writeFile(JsonStorage.JSON_FILE, menuDataString, err => {
      if (err)
        console.error(
          'No se ha podido escribir los menus actuales en el fichero',
          err,
        );
    });
  }

  private menuArrayToMap(menuArray: DayMenu[]): Map<string, DayMenu> {
    const toReturn: Map<string, DayMenu> = new Map<string, DayMenu>();
    menuArray.forEach((menu: DayMenu) => {
      const { day, month, year } = menu;
      toReturn.set(this.dateToString(day, month, year), menu);
    });

    return toReturn;
  }

  private dateToString(day: number, month: number, year: number): string {
    return `${day}-${month}-${year}`;
  }
}

class JSONReadError extends Error {}
