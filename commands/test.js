const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('tester')
	.setDescription('for testing!')
	.addStringOption(option => option.setName('test').setDescription('Option1'))
	.addStringOption(option => option.setName('test2').setDescription('Option2')),

	async execute(interaction) {
		const string = interaction.options.getString('test');
		const string2 = interaction.options.getString('test2');
		await interaction.reply(`The options value is: \`${string}\` \`${string2}\``);
		//console.log(string);
	},
};