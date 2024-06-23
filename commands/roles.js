const { MessageActionRow, MessageButton, MessageEmbed, ActionRowBuilder, StringSelectMenuBuilder, SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roles')
		.setDescription('Choose your roles!'),

	async execute(interaction) {

		const row = new ActionRowBuilder()
			.addComponents(
				new StringSelectMenuBuilder()
					.setCustomId('select')
					.setPlaceholder('Nothing selected')
					.setMinValues(1)
					.setMaxValues(3)
					.addOptions([
						{
							label: 'Hearts of Iron',
							description: 'Join in the Hearts of Iron roleplay!',
							value: 'HOI',
						},
						{
							label: 'Crusader Kings',
							description: 'Join in the Crusader Kings roleplay!',
							value: 'CK',
						},
						{
							label: 'Europa Universalis',
							description: 'Join in the Europa Universalis Roleplay',
							value: 'EU',
						},
					]),
			);

		const embed = new EmbedBuilder()
			.setColor('#0099ff')
			.setTitle("Find the right community for you!")
			.setDescription("What games do you like to play?")
			.setFooter({ text: 'Lord is a cool Dude.', iconURL: 'https://cdn.discordapp.com/attachments/953142716840177677/994184954915336262/lordIcon_2.png' });


		//Reply
		await interaction.reply({ content:"HELLO?", embeds: [embed], components: [row] });		

	},
};