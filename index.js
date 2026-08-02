import { Client, GatewayIntentBits } from 'discord.js';
import "dotenv/config";
const client = new Client({
	  intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	  ]
});
const whitelisted = ["612273903443902515", "1267582463710986373"];
client.on("clientReady", () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", (message) => {
	if (message.channel.id == process.env.CHANNEL_ID) {
		if(whitelisted.includes(message.author.id)) return;
		message.author.ban({ days:7, reason: "Hacked account" });
	}
});
client.login(process.env.TOKEN);