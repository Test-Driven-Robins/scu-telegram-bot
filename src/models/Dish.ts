class Dish {
  name: string;
  allergens: string[];

  readable(): string {
    let toReturn = `
    ${name}
    `;

    this.allergens.forEach(allergen => (toReturn += `${allergen}\n`));

    return toReturn;
  }
}

export default Dish;
