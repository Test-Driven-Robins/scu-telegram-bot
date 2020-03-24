import {
  JSONReadError,
  JsonStorage, JSONWriteError,
  NotFoundError,
  RefreshError,
} from '../services/JsonStorage.service';
import DayMenu from '../models/DayMenu';
import Dish from '../models/Dish';
import Menu from '../models/Menu';
import { FsAdapter } from '../services/fs.adapter';

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

const validFileContent =
  '[{"ptsMenu":[],"fuenteNuevaMenu":[{"first":{"name":"Arroz a la cubana Apio Huevos Lácteos"},"second":{"name":"Escalope de cerdo Gluten Huevos Lácteos Sulfitos"},"dessert":{"name":"Naranja"},"drink":"Agua","vegetarian":false}],"day":8,"month":1,"year":2018},{"ptsMenu":[],"fuenteNuevaMenu":[{"first":{"name":"Cocido de calabaza con fruto de cáscara Frutos secos (almendras) Gluten"},"second":{"name":"Arroz"},"dessert":{"name":"Manzana"},"drink":"Agua","vegetarian":false},{"first":{"name":"Cocido de calabaza con fruto de cáscara (OV) Frutos secos (almendras) Gluten"},"second":{"name":"Pastel de acelgas, quinoa y patatas (OV) Lácteos"},"dessert":{"name":"Manzana"},"drink":"Agua","vegetarian":false}],"day":9,"month":1,"year":2018},{"ptsMenu":[],"fuenteNuevaMenu":[{"first":{"name":"Macarrones en salsa aurora Frutos secos Gluten Lácteos Soja"},"second":{"name":"Pechuga de pollo a la parilla"},"dessert":{"name":"Pera"},"drink":"Agua","vegetarian":false},{"first":{"name":"Macarrones en salsa marinara de piña Lácteos Gluten"},"second":{"name":"Rollitos de primavera Gluten"},"dessert":{"name":"Pera"},"drink":"Agua","vegetarian":false}],"day":10,"month":1,"year":2018},{"ptsMenu":[],"fuenteNuevaMenu":[{"first":{"name":"Sopa de mi pueblo Apio Gluten"},"second":{"name":"Plato alpujarreño Gluten* Huevos"},"dessert":{"name":"Naranja"},"drink":"Agua","vegetarian":false}],"day":11,"month":1,"year":2018},{"ptsMenu":[],"fuenteNuevaMenu":[{"first":{"name":"Cazuela malagueña Crustáceos Gluten Moluscos Pescado Sulfitos"},"second":{"name":"Ternera a la carbonada Apio Gluten Sulfitos"},"dessert":{"name":"Plátano"},"drink":"Agua","vegetarian":false}],"day":12,"month":1,"year":2018},{"ptsMenu":[],"fuenteNuevaMenu":[{"first":{"name":"Crema de ave reina Apio Gluten Lácteos"},"second":{"name":"Arroz"},"dessert":{"name":"Naranja"},"drink":"Agua","vegetarian":false}],"day":13,"month":1,"year":2018}]';

const fsMock: FsAdapter = {
  readFromFile(fileName: string): Promise<String> {
    return Promise.resolve(validFileContent);
  },
  async writeToFile(fileName: string, data: string): Promise<void> {
    return;
  },
};

const jsonService = new JsonStorage(getAllDaysAvailable, fsMock, false);

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
  it('should throw JSONReadError()', async() => {
    jest.spyOn(fsMock, 'readFromFile').mockImplementation(() => {throw new Error()})
    // @ts-ignore
    await expect(jsonService.readMenusFromFile()).rejects.toThrow(JSONReadError)
  })
  it('should throw JSONWriteError()', async() => {
    jest.spyOn(fsMock, 'writeToFile').mockImplementation(() => {throw new Error()})
    // @ts-ignore
    await expect(jsonService.writeMenusToFile()).rejects.toThrow(JSONWriteError)
  })

});
