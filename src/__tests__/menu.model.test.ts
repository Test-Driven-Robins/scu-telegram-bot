import Dish from '../models/Dish';
import Menu from '../models/Menu';

const platoAlpujarrenio = new Dish('Plato alpujarreño');
const macarrones = new Dish('Plato alpujarreño');
const cuajadaDeCarnaval = new Dish('Cuajada de carnaval', ['Gluten']);

const menu = new Menu(
  macarrones,
  platoAlpujarrenio,
  cuajadaDeCarnaval,
  'Vino tinto',
  false,
);

describe('menu model tests', () => {
  it('should contain the readable of the first dish in his readable ', () => {
    expect(menu.readable()).toContain(menu.first.readable());
  });
  it('should contain the readable of the second dish in his readable ', () => {
    expect(menu.readable()).toContain(menu.second.readable());
  });
  it('should contain the readable of the dessert in his readable ', () => {
    expect(menu.readable()).toContain(menu.dessert.readable());
  });
  it('should contain the drink in his readable ', () => {
    expect(menu.readable()).toContain(menu.drink);
  });
});
