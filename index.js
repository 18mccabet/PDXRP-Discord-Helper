const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, Partials, Collection, Events, GuildScheduledEventManager } = require('discord.js');
const { token, MONGO_URI } = require('./config.json');
const mongoose = require('mongoose')

const eventSchema = require('./model/serverEvent-schema')

const client = new Client({ intents: [GatewayIntentBits.Guilds], partials: [Partials.Channel] });

//Get Events
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

//Get Commands
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

//Execute Command
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

//When a new server event is created
client.on('guildScheduledEventCreate', async guildScheduledEvent => {
	await mongoose.connect(MONGO_URI, {
		keepAlive: true,
	})
		

	console.log(guildScheduledEvent);
	
	setTimeout(async () => {
		await new eventSchema({
			id: guildScheduledEvent.id,       
			guildId: guildScheduledEvent.guildId,  
			channelId: guildScheduledEvent.channelId,
			creatorId: guildScheduledEvent.creatorId,
			name: guildScheduledEvent.name,
			description: guildScheduledEvent.description,
			scheduledStartTimestamp: guildScheduledEvent.scheduledStartTimestamp,
			scheduledEndTimestamp: guildScheduledEvent.scheduledEndTimestamp,
			privacyLevel: guildScheduledEvent.privacyLevel,
			status: guildScheduledEvent.status,
			entityType: guildScheduledEvent.entityType,
			entityId: guildScheduledEvent.entityId,
			userCount: guildScheduledEvent.userCount,
			creator: guildScheduledEvent.creator,
			entityMetadata: guildScheduledEvent.entityMetadata,
			image: guildScheduledEvent.image
		}).save()
	}, 1000)
});

//Button Stuff
client.on('interactionCreate', interaction => {
	if (!interaction.isButton()) return;
	console.log("Someone pressed a button");
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isStringSelectMenu()) return;

	const selected = interaction.values.join(', ');

	console.log(`The user selected ${selected}!`);
	
	const requestedRoles = []
	
	interaction.values.forEach(e => {
		requestedRoles.push(interaction.guild.roles.cache.find(role => role.name === e))
	});
	

	const member = interaction.user

	console.log(interaction.user,"member")
	member.roles.add(role);


	await interaction.reply({
		content: `The user selected ${selected}!`, 
		ephemeral:true
	});

});


client.login(token);