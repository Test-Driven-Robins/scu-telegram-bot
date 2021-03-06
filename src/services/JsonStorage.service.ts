import { SCUService } from '../controllers/SCUService.interface';
import DayMenu from '../models/DayMenu';
import { Extractor } from '../controllers/extractor.interface';
import { FsAdapter } from './fs.adapter';

export class JsonStorage implements SCUService {
  private static JSON_FILE = 'menus.json';
  private static URL =
    'https://web.archive.org/web/20180110215431/http://scu.ugr.es/';
  private static REFRESH_INTERVAL_MINUTES = 1;

  private menus: Map<string, DayMenu>;
  constructor(
    private readonly getAllDaysAvailable: Extractor,
    private readonly fs: FsAdapter,
    private readonly refreshDataPeriodically: boolean = true,
  ) {
    this.initializeService();
  }

  async getDayMenu(day: number, month: number, year: number): Promise<DayMenu> {
    const memoryResult = this.findMenuInMemory(day, month, year);
    if (memoryResult != undefined) return memoryResult;
    else {
      await this.refreshFromTheWeb();
      const secondTry = this.findMenuInMemory(day, month, year);
      if (secondTry != undefined) return secondTry;
      else throw new NotFoundError();
    }
  }

  private async initializeService() {
    await this.readMenusFromFile();
    if (this.refreshDataPeriodically) {
      setInterval(async () => {
        await this.refreshFromTheWeb();
        await this.writeMenusToFile();
      }, JsonStorage.REFRESH_INTERVAL_MINUTES * 60 * 1000);
    }
  }

  private async refreshFromTheWeb() {
    try {
      const dayMenus: DayMenu[] = await this.getAllDaysAvailable(
        JsonStorage.URL,
      );
      this.menus = this.menuArrayToMap(dayMenus);
    } catch (err) {
      throw new RefreshError();
    }
  }

  private findMenuInMemory(
    day: number,
    month: number,
    year: number,
  ): DayMenu | undefined {
    return this.menus.get(this.dateToString(day, month, year));
  }
  private async readMenusFromFile() {
    try {
      const data = await this.fs.readFromFile(JsonStorage.JSON_FILE);
      const menusAsArray = JSON.parse(data.toString());
      this.menus = this.menuArrayToMap(menusAsArray);
    } catch (err) {
      throw new JSONReadError();
    }
  }

  private async writeMenusToFile() {
    const menusAsArray = Array.from(this.menus.values());
    const menuDataString = JSON.stringify(menusAsArray);
    try {
      await this.fs.writeToFile(JsonStorage.JSON_FILE, menuDataString);
    } catch (err) {
      throw new JSONWriteError();
    }
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

export class JSONReadError extends Error {
  constructor() {
    super();
    this.name = 'JSONReadError';
    this.message = 'Could not read from the menu file';
    Object.setPrototypeOf(this, JSONReadError.prototype);
  }
}

export class RefreshError extends Error {
  constructor() {
    super();
    this.name = 'RefreshError';
    this.message = 'Could not refresh from the extractor';
    Object.setPrototypeOf(this, RefreshError.prototype);
  }
}

export class JSONWriteError extends Error {
  constructor() {
    super();
    this.name = 'JSONWriteError';
    this.message = 'Could not write the menus in memory to a file';
    Object.setPrototypeOf(this, JSONWriteError.prototype);
  }
}

export class NotFoundError extends Error {
  constructor() {
    super();
    this.name = 'NotFoundError';
    this.message = 'Menu of the date asked doesnt exist in our database';

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
