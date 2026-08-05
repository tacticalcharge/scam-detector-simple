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
		if(whitelisted.includes(message.author.id)) return;            // Days hours minutes seconds
		message.guild.members.ban(message.author.id, { deleteMessageSeconds: 7 * 24 * 60 * 60, reason: "Hacked account" });
	}
});

// Boost Detection System (For Coreflux)
client.on("guidMemberUpdate", (oldMember, newMember) => {
	const startedBoosting = !oldMember.premiumSince && newMember.premiumSince;
	if (startedBoosting) {
		newMember.roles.cache.add(process.env.BOOSTER_ROLE_ID);
	}
})
client.login(process.env.TOKEN);