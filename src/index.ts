import Telegraf from "telegraf";
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const token: string = process.env.BOT_TOKEN as string;

const bot = new Telegraf(token);

bot.start(ctx => ctx.reply("Hello world"));

bot.launch();
