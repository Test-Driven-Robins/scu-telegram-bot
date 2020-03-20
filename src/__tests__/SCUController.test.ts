import DayMenu from '../models/DayMenu';
import Dish from '../models/Dish';
import Menu from '../models/Menu';
import { SCUController, Weekdays } from '../controllers/SCUController';

const mockSCUService = {
  async getDayMenu(day: number, month: number, year: number): Promise<DayMenu> {
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

    return new DayMenu([menu], [menu], 10, 2, 2020);
  },
};

it('should return todays menu', async () => {
  const controller = new SCUController(mockSCUService);

  const dayMenu: DayMenu = await controller.getToday();

  expect(dayMenu).toEqual(await mockSCUService.getDayMenu(10, 2, 2020));
});

it('should return tomorrows menu', async () => {
  const controller = new SCUController(mockSCUService);

  const dayMenu: DayMenu = await controller.getTomorrow();

  expect(dayMenu).toEqual(await mockSCUService.getDayMenu(10, 2, 2020));
});
