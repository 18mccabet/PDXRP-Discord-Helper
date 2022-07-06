const { SlashCommandBuilder } = require('@discordjs/builders');
const { time } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),

	async execute(interaction) {
		const date = new Date();

		const timeString = time(date);
		const relative = time(date, 'R');

		interaction.reply(`The Time value is: \`${date}\` \`${timeString}\` \`${relative}\``);
		await interaction.reply({ content: 'Pong!', ephemeral: true});
	},
};