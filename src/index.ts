import Telegraf from 'telegraf';
if (process.env.NODE_ENV != 'production') {
  require('dotenv').config();
}

import { Weekdays, SCUController } from './controllers/SCUController';
import { SCUService } from './controllers/SCUService.interface';
import { JsonStorage } from './services/JsonStorage.service';
import { getAllDaysAvailable } from './controllers/extractor';
import { Extractor } from './controllers/extractor.interface';
import { FsAdapter } from './services/fs.adapter';

const token: string = process.env.BOT_TOKEN as string;

const bot = new Telegraf(token);

bot.start(ctx => ctx.reply('Hello world'));

const extractor: Extractor = getAllDaysAvailable;
const fsAdapter: FsAdapter = new FsAdapter();
const jsonStorage: SCUService = new JsonStorage(extractor, fsAdapter);
const scuController: SCUController = new SCUController(jsonStorage);

bot.command('hoy', async ctx =>
  ctx.reply((await scuController.getToday()).readable()),
);

bot.command('mañana', async ctx =>
  ctx.reply((await scuController.getTomorrow()).readable()),
);

bot.command('lunes', async ctx =>
  ctx.reply((await scuController.getDayMenu(Weekdays.Monday)).readable()),
);

bot.launch();
