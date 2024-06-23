const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('time')
		.setDescription('transforms timestamp to readable time')
        .addStringOption(option => option.setName('timestamp').setDescription('The timestamp goes here')),

	async execute(interaction) {
        const timestamp = interaction.options.getString('timestamp');

        const readable = new Date();
		//const relative = time(timestamp, 'R');
        

		await interaction.reply(`The Time value is: \`${timestamp}\` \`${readable}\``);
	},
};