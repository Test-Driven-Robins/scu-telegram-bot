import fs from 'fs';
import Dish from '../models/Dish';
import Menu from '../models/Menu';
import DayMenu from '../models/DayMenu';
import {
  getMenus,
  scrapeMenus,
  httpRequest,
  buildMenuFromRawData,
  buildDayMenuFromRawData,
} from '../controllers/extractor';

const URL = 'https://web.archive.org/web/20180110215431/http://scu.ugr.es/';
jest.setTimeout(30000);

describe('scrapping tests', () => {
  test('Build day menu', () => {
    let rawData = [
      'LUNES, 8 DE ENERO DE 2018 Alérgenos',
      'Menú 1',
      'Primero Arroz',
      'Segundo Escalope',
      'Acompañamiento Pisto',
      'Postre Naranja',
      'Bebida Vino',
      'Menú 1',
      'Primero Arroz',
      'Segundo Escalope',
      'Acompañamiento Pisto',
      'Postre Naranja',
      'Bebida Vino',
    ];

    let menus = [
      new Menu(
        new Dish('Arroz'),
        new Dish('Escalope'),
        new Dish('Naranja'),
        'Agua',
        false,
      ),
      new Menu(
        new Dish('Arroz'),
        new Dish('Escalope'),
        new Dish('Naranja'),
        'Agua',
        false,
      ),
    ];

    expect(buildDayMenuFromRawData(rawData)).toMatchObject(
      new DayMenu([], menus, 8, 1, 2018),
    );
  });

  test('Build menu', () => {
    let rawDataMenu = [
      'Menú 1',
      'Primero Arroz a la cubana',
      'Segundo Escalope de cerdo',
      'Acompañamiento Pisto manchego',
      'Postre Naranja',
    ];
    expect(buildMenuFromRawData(rawDataMenu)).toMatchObject(
      new Menu(
        new Dish('Arroz a la cubana'),
        new Dish('Escalope de cerdo'),
        new Dish('Naranja'),
        'Agua',
        false,
      ),
    );
  });
});
