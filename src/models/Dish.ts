class Dish {
  name: string;
  allergens: string[];

  readable(): string {
    let toReturn = `
    ${name}
    `;

    this.allergens.forEach(allergen => (toReturn += `\t${allergen}\n`));

    return toReturn;
  }
}

export default Dish;
