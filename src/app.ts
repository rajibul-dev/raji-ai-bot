import { Bot } from "grammy";
import connectDB from "./db/connect.js";

import { config } from "dotenv";
config();

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);

// Connect to MongoDB
connectDB(process.env.DB_URI)
  .then(() => console.log("✅ Bot is ready!"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

bot.command("start", async (ctx) => {
  await ctx.reply("Hey");
});

bot.start();
