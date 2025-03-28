import { Bot } from "grammy";
import { config } from "dotenv";
config();

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);

bot.command("start", async (ctx) => {
  await ctx.reply("Hey");
});

bot.start();
