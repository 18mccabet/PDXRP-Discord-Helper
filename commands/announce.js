const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('announce')
		.setDescription('Announce an upcoming event')
		.addStringOption(option =>
			option.setName('name')
				.setDescription('The name of the event')
				.setRequired(true)
		)
		.addStringOption(option =>
			option.setName('datetime')
				.setDescription('The datetime of the event')
		)
		.addChannelOption(option =>
			option.setName('category')
				.setDescription('The announcement channel you would like the event announced')
		)
		.addStringOption(option =>
			option.setName('ruleset')
				.setDescription('The associated ruleset')
		)
		.addAttachmentOption(option =>
			option.setName('thumbnail')
				.setDescription('A related image')
		),
	async execute(interaction) {
		const name = interaction.options.getString('name');
		const date = interaction.options.getString('datetime');
		const category = interaction.options.getChannel('category');
		const rules = interaction.options.getString('ruleset');
		const thumbnail = interaction.options.getAttachment('thumbnail');

		interaction.reply(`You are announcing: \`${name}\` \n Date: \`${date}\` \n Category: \`${category}\` \n Ruleset: \`${rules}\` \n image: \`${thumbnail}\` `);
		//console.log(string);
	},
};