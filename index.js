import { Client, GatewayIntentBits } from 'discord.js';
import "dotenv/config";
const client = new Client({
	  intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	  ]
});

client.on("clientReady", () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", (message) => {
	if (message.channel.id == process.env.CHANNEL_ID) {
		message.author.ban({ days:7, reason: "Hacked account" });
	}
});
client.login(process.env.TOKEN);