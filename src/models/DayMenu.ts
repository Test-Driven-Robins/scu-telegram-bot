import Menu from "./Menu";

class DayMenu {
  constructor(
    readonly ptsMenu: Menu[],
    readonly fuenteNuevaMenu: Menu[],
    readonly day: number,
    readonly month: number,
    readonly year: number
  ) {}

  readable(): string {
    let toReturn: string = `${this.day}/${this.month}/${this.year}`;

    this.fuenteNuevaMenu.forEach(menu => (toReturn += menu.readable()));
    this.ptsMenu.forEach(menu => (toReturn += menu.readable()));

    return toReturn;
  }
}

export default DayMenu;
