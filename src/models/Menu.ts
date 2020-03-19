import Dish from "./Dish";

class Menu {
  constructor(
    readonly first: Dish,
    readonly second: Dish,
    readonly dessert: Dish,
    readonly drink: string,
    readonly vegetarian: boolean,
    readonly garnish?: Dish
  ) {}

  readable(): string {
    const menuTypeString = this.vegetarian ? "Menú vegetariano" : "";
    const firstSecond = `
    ${menuTypeString}
      Primero:
      ${this.first.readable()}
      Segundo:
      ${this.second.readable()}
      `;
    const garnish = this.garnish
      ? `
      Acompañamiento:
      ${this.garnish.readable()}
      `
      : "";
    const dessertAndDrink = ` 
      Postre:
      ${this.dessert.readable()}
      Bebida:
      ${this.drink}
    `;
    return firstSecond + garnish + dessertAndDrink;
  }
}

export default Menu;
