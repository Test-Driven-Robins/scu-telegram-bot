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
  test('scrapeMenus', () => {
    const expected = [
      'LUNES, 8 DE ENERO DE 2018 Alérgenos',
      'Menú 1',
      'Primero Arroz a la cubana Apio Huevos Lácteos',
      'Segundo Escalope de cerdo Gluten Huevos Lácteos Sulfitos',
      'Acompañamiento Pisto manchego Gluten*',
      'Postre Naranja',
      'Bebida Vino tinto Sulfitos',
      'MARTES, 9 DE ENERO DE 2018 Alérgenos',
      'Menú 1',
      'Primero Cocido de calabaza con fruto de cáscara Frutos secos (almendras) Gluten',
      'Acompañamiento Ensalada Judith Lácteos* Soja',
      'Segundo Merluza a la bretona Gluten Pescado Sulfitos',
      'Postre Manzana',
      'Bebida Vino tinto Sulfitos',
      'Menú 2',
      'Primero Cocido de calabaza con fruto de cáscara (OV) Frutos secos (almendras) Gluten',
      'Segundo Pastel de acelgas, quinoa y patatas (OV) Lácteos',
      'Acompañamiento Ensalada Judith (VG) Sulfitos',
      'Postre Manzana',
      'Bebida Vino tinto Sulfitos',
      'MIÉRCOLES, 10 DE ENERO DE 2018 Alérgenos',
      'Menú 1',
      'Primero Macarrones en salsa aurora Frutos secos Gluten Lácteos Soja',
      'Segundo Pechuga de pollo a la parilla',
      'Acompañamiento Pimientos fritos (VG) Gluten*',
      'Postre Pera',
      'Bebida Vino tinto Sulfitos',
      'Menú 2',
      'Primero Macarrones en salsa marinara de piña Lácteos Gluten',
      'Segundo Rollitos de primavera Gluten',
      'Acompañamiento Pimientos fritos (VG) Gluten*',
      'Postre Pera',
      'Bebida Vino tinto Sulfitos',
      'JUEVES, 11 DE ENERO DE 2018 Alérgenos',
      'Menú 1',
      'Primero Sopa de mi pueblo Apio Gluten',
      'Segundo Plato alpujarreño Gluten* Huevos',
      'Postre Natillas Gluten Huevos Lácteos Sésamo* Soja Sulfitos',
      'Bebida Vino tinto Sulfitos',
      'VIERNES, 12 DE ENERO DE 2018 Alérgenos',
      'Menú 1',
      'Primero Cazuela malagueña Crustáceos Gluten Moluscos Pescado Sulfitos',
      'Segundo Ternera a la carbonada Apio Gluten Sulfitos',
      'Acompañamiento Menestra de verduras Gluten*',
      'Postre Plátano',
      'Bebida Vino tinto Sulfitos',
      'SÁBADO, 13 DE ENERO DE 2018 Alérgenos',
      'Menú 1',
      'Primero Crema de ave reina Apio Gluten Lácteos',
      'Entrante Hojaldre de salmón con tomate confitado Gluten Huevos Lácteos* Pescado Soja*',
      'Segundo Pollo asado Apio Sulfitos',
      'Acompañamiento Fritura de hortalizas Gluten',
      'Postre Piña',
      'Bebida Vino tinto Sulfitos'
    ]
    const data = fs.readFileSync('./src/__tests__/resources/scu-page.html').toString()
    const actual = scrapeMenus(data)
    expect(actual).toEqual(expected)
  })
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
