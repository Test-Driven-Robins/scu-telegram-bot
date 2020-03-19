import Dish from "./Dish";
import MenuTypes from "./MenuTypes";

interface Menu {
  first: Dish;
  second: Dish;
  garnish: Dish;
  dessert: Dish;
  drink: string;
  type: MenuTypes;
}

export default Menu;
