import Dish from "./Dish";

class Menu {
  first: Dish;
  second: Dish;
  garnish: Dish;
  dessert: Dish;
  drink: string;
  type: MenuTypes;

  readable(): string {
    const menuTypeString =
      this.type == MenuTypes.Vegetarian ? "Menú vegetariano" : "";
    return `
    ${menuTypeString}
      Primero:
      ${this.first.readable()}
      Segundo:
      ${this.second.readable()}
      Acompañamiento:
      ${this.garnish.readable()}
      Postre:
      ${this.dessert.readable()}
      Bebida:
      ${this.drink}
    `;
  }
}

enum MenuTypes {
  Normal,
  Vegetarian
}

export default Menu;
