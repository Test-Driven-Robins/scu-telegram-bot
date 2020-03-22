import {
  JsonStorage,
  NotFoundError,
  RefreshError,
} from '../services/JsonStorage.service';
import DayMenu from '../models/DayMenu';
import Dish from '../models/Dish';
import Menu from '../models/Menu';

const getAllDaysAvailable = jest.fn(async (url: string) => {
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
  return [new DayMenu([menu], [menu], 10, 2, 2020)];
});

const jsonService = new JsonStorage(getAllDaysAvailable, false);

describe('jsonStorageService tests', () => {
  it('should find a day that exist', async () => {
    const res = await jsonService.getDayMenu(10, 2, 2020);
    expect(res).toEqual((await getAllDaysAvailable(''))[0]);
  });

  it('should throw if a day doesnt exist', async () => {
    await expect(jsonService.getDayMenu(10, 2, 1000)).rejects.toThrow(
      NotFoundError,
    );
  });

  it('should throw refresh error', async () => {
    getAllDaysAvailable.mockImplementation(async () => {
      throw new RefreshError();
    });
    await expect(jsonService.getDayMenu(10, 2, 1000)).rejects.toThrow(
      RefreshError,
    );
  });
});
