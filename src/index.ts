import Telegraf from "telegraf";
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

import { WEEKDAYS, SCUController } from "./controllers/SCUController";

const token: string = process.env.BOT_TOKEN as string;

const bot = new Telegraf(token);

bot.start(ctx => ctx.reply("Hello world"));

const scuController: SCUController = new SCUController();

bot.command("hoy", ctx => ctx.reply(scuController.getToday().toString()));

bot.command("mañana", ctx => ctx.reply(scuController.getTomorrow().toString()));

bot.command("lunes", ctx =>
  ctx.reply(scuController.getDayMenu(WEEKDAYS.Monday).toString())
);

bot.launch();
