import Telegraf from "telegraf";
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

import { Weekdays, SCUController } from "./controllers/SCUController";
import { SCUService } from "./controllers/SCUService.interface";
import { JsonStorage } from "./services/JsonStorage.service";

const token: string = process.env.BOT_TOKEN as string;

const bot = new Telegraf(token);

bot.start(ctx => ctx.reply("Hello world"));

const jsonStorage: SCUService = new JsonStorage();
const scuController: SCUController = new SCUController(jsonStorage);

bot.command("hoy", async ctx =>
  ctx.reply((await scuController.getToday()).readable())
);

bot.command("mañana", async ctx =>
  ctx.reply((await scuController.getTomorrow()).readable())
);

bot.command("lunes", async ctx =>
  ctx.reply((await scuController.getDayMenu(Weekdays.Monday)).readable())
);

bot.launch();
