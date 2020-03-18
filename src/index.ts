import Telegraf from "telegraf";
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const token: string = process.env.BOT_TOKEN as string;

const bot = new Telegraf(token);

bot.start(ctx => ctx.reply("Hello world"));

bot.command("hoy", ctx => ctx.reply("Menú de hoy"));
bot.command("mañana", ctx => ctx.reply("Menú de mañana"));

const WEEKDAYS = [
  "lunes",
  "martes",
  "miercoles",
  "jueves",
  "viernes",
  "sabado"
];

WEEKDAYS.map(day => {
  bot.command(day, ctx => ctx.reply(`Menú de ${day}`));
});

bot.launch();
