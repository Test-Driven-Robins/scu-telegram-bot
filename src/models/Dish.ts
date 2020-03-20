class Dish {
  constructor(readonly name: string, readonly allergens?: string[]) {}

  readable(): string {
    let toReturn = `
    ${this.name}
    `;

    if (this.allergens)
      this.allergens.forEach(allergen => (toReturn += `\t${allergen}\n`));

    return toReturn;
  }
}

export default Dish;
