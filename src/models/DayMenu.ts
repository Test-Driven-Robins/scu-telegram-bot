import Menu from "./Menu";

class DayMenu {
  ptsMenu: Menu[];
  fuenteNuevaMenu: Menu[];
  day: number;
  month: number;
  year: number;

  readable(): string {
    let toReturn: string = `${this.day}/${this.month}/${this.year}`;

    this.fuenteNuevaMenu.forEach(menu => (toReturn += menu.readable()));
    this.ptsMenu.forEach(menu => (toReturn += menu.readable()));

    return toReturn;
  }
}

export default DayMenu;
