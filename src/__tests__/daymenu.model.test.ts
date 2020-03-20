import Dish from '../models/Dish';
import Menu from '../models/Menu';
import DayMenu from '../models/DayMenu';

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

const dayMenu = new DayMenu([menu], [menu], 10, 2, 2020);

it('should contain the menu readable in his readable', () => {
  const menu = dayMenu.fuenteNuevaMenu[0];
  expect(dayMenu.readable()).toContain(menu.readable());
});

it('should contain the date in his readable', () => {
  const dateString = `${dayMenu.day}/${dayMenu.month}/${dayMenu.year}`;
  expect(dayMenu.readable()).toContain(dateString);
});
