const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Intents } = require('discord.js');
const { token, MONGO_URI } = require('./config.json');
const mongoose = require('mongoose')

const eventSchema = require('./model/serverEvent-Schema')

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_SCHEDULED_EVENTS] });

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

//On Ready
// client.on('ready', async () => {
// 	await mongoose.connect(MONGO_URI, {
// 		keepAlive: true,
// 	})

// 	setTimeout(async () => {
// 		await new testSchema({
// 			message: 'Hello World',
// 		}).save()
// 	}, 1000)

// 	console.log("Database things")
// })

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

//Console Logging all Slash Commands
client.on('interactionCreate', interaction => {
	if (!interaction.isCommand()) return;
	//console.log(interaction);
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

client.login(token);