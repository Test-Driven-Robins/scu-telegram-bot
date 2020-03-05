import Menu from "./Menu";

class DayMenu {
  private _ptsMenu: Menu[];
  private _fuenteNuevaMenu: Menu[];
  private _date: Date;

  // getters and setters

  get date(): Date {
    return new Date();
  }

  set date(date: Date) {
    this._date = date;
  }

  get ptsMenu(): Menu[] {
    return [];
  }

  set ptsMenu(menus: Menu[]) {
    this._ptsMenu = menus;
  }

  get fuenteNueva(): Menu[] {
    return [];
  }

  set fuenteNueva(menus: Menu[]) {
    this._fuenteNuevaMenu = menus;
  }
}

class MenuNotFound extends Error {}

export default DayMenu;
