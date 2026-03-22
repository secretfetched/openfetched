import TelegramBot from "node-telegram-bot-api";
import fetch from "node-fetch";

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.on("message", async (msg) => {
  if (!msg.text) return;

  // group me sirf mention pe reply
  if (msg.chat.type !== "private") {
    if (!msg.text.includes("@YOUR_BOT_USERNAME")) return;
  }

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": Bearer ${process.env.OPENROUTER_API_KEY},
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.1-8b-instruct",
        messages: [{ role: "user", content: msg.text }]
      })
    });

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || "Error 😢";

    bot.sendMessage(msg.chat.id, reply);
  } catch (err) {
    bot.sendMessage(msg.chat.id, "Error bro 😭");
  }
});
