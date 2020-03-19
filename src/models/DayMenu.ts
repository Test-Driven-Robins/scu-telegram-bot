import Menu from "./Menu";

interface DayMenu {
  ptsMenu: Menu[];
  fuenteNuevaMenu: Menu[];
  day: number;
  month: number;
  year: number;
}

class MenuNotFound extends Error {}

export default DayMenu;
