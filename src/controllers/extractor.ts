import fetch from 'node-fetch';
import cheerio from 'cheerio';
import DayMenu from '../models/DayMenu';
import Menu from '../models/Menu';
import Dish from '../models/Dish';

export async function httpRequest(url: string) {
  try {
    const res = await fetch(url, { timeout: 10000 });
    return res;
  } catch (err) {
    throw new PageNotAvailable(err.message);
  }
}

export async function getAllDaysAvailable(url: string): Promise<DayMenu[]> {
  const promises = [];
  promises.push(getMenus(url, 'LUNES'));
  promises.push(getMenus(url, 'MARTES'));
  promises.push(getMenus(url, 'MIÉRCOLES'));
  promises.push(getMenus(url, 'JUEVES'));
  promises.push(getMenus(url, 'VIERNES'));
  promises.push(getMenus(url, 'SÁBADO'));

  return Promise.all(promises);
}
export async function getMenus(url: string, day: string): Promise<DayMenu> {
  let html: string = await (await httpRequest(url)).text();
  let rawData: string[] = scrapeMenus(html);
  let menuIndexes: number[] = [];
  let regexDayWeek = /LUNES|MARTES|MIÉRCOLES|JUEVES|VIERNES|SÁBADO/;
  rawData.map((e, i) => {
    if (regexDayWeek.test(e)) {
      menuIndexes.push(i);
    }
  });
  let regex = new RegExp(day.toUpperCase(), 'g');
  let wantedDayMenu = rawData.filter(e => regex.test(e))[0];
  let indexWantedDayMenu = rawData.indexOf(wantedDayMenu);
  let positionInArray = menuIndexes.indexOf(indexWantedDayMenu);
  let rawDataWantedMenu = rawData.slice(
    indexWantedDayMenu,
    menuIndexes[positionInArray + 1],
  );
  return buildDayMenuFromRawData(rawDataWantedMenu);
}

export function buildDayMenuFromRawData(data: string[]): DayMenu {
  let menuIndexes: number[] = [];
  data.map((e, i) => {
    if (/Menú/.test(e)) {
      menuIndexes.push(i);
    }
  });
  let menus: Menu[] = [];
  for (let i = 0; i < menuIndexes.length - 1; i++) {
    let beginning = menuIndexes[i];
    let end = menuIndexes[i + 1];
    let rawData = data.slice(beginning, end);
    menus.push(buildMenuFromRawData(rawData));
  }
  let lastBeginning = menuIndexes.slice(-1)[0];
  let date = parseDate(data[0]);
  menus.push(buildMenuFromRawData(data.slice(lastBeginning)));
  return new DayMenu([], menus, date.day, date.month, date.year);
}

export function parseDate(rawData: string) {
  let dateInString: string[] = rawData
    .replace('Alérgenos', '')
    .replace(/DE|,/g, '')
    .split(' ')
    .slice(1)
    .filter(Boolean);
  let numberFromMonth = dateInString[1]
    .replace('ENERO', '0')
    .replace('FEBRERO', '1')
    .replace('MARZO', '2')
    .replace('ABRIL', '3')
    .replace('MAYO', '4')
    .replace('JUNIO', '5')
    .replace('JULIO', '6')
    .replace('AGOSTO', '7')
    .replace('SEPTIEMBRE', '8')
    .replace('OCTUBRE', '9')
    .replace('NOVIEMBRE', '10')
    .replace('DICIEMBRE', '11');
  return {
    year: parseInt(dateInString[2]),
    month: parseInt(numberFromMonth),
    day: parseInt(dateInString[0]),
  };
}

export function buildMenuFromRawData(data: string[]): Menu {
  const first = new Dish(data[1].split(/Primero/)[1].trim());
  let second = new Dish('Arroz');
  try {
    second = new Dish(data[2].split(/Segundo/)[1].trim());
  } catch (e) {}
  let dessert = new Dish('Naranja');
  try {
    dessert = new Dish(data[4].split(/Postre/)[1].trim());
  } catch (e) {}
  return new Menu(first, second, dessert, 'Agua', false);
}

export function scrapeMenus(html: string): string[] {
  const $ = cheerio.load(html);
  const trElements: string[] = [];

  $('.level1:nth-child(5) > .inline tr').each(function(i, e) {
    trElements.push(
      $(e)
        .text()
        .replace(/(\r\n|\n|\r)/gm, '')
        .replace(/\s+/g, ' ')
        .trim(),
    );
  });

  return trElements.filter(e => !/Consultar/.test(e));
}

class PageNotAvailable extends Error {}
