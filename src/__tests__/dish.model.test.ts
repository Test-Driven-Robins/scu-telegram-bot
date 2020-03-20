import Dish from '../models/Dish';

const cuajadaDeCarnaval = new Dish('Cuajada de carnaval', ['Gluten']);

it('readable() should contain the name and the allergens', () => {
  expect(cuajadaDeCarnaval.readable()).toContain(cuajadaDeCarnaval.name);

  cuajadaDeCarnaval.allergens?.forEach(allergen => {
    expect(cuajadaDeCarnaval.readable()).toContain(allergen);
  });
});
