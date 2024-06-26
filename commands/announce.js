const { MessageActionRow, MessageButton, EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { ButtonStyle } = require('discord.js');

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
			option.setName('desc')
				.setDescription('Description of the event')
				.setRequired(true)
		)
		.addStringOption(option =>
			option.setName('datetime')
				.setDescription('The datetime of the event')
		)
		// .addChannelOption(option =>
		// 	option.setName('category')
		// 		.setDescription('The announcement channel you would like the event announced')
		// )
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
		const desc = interaction.options.getString('desc');
		const date = interaction.options.getString('datetime');
		// const category = interaction.options.getChannel('category');
		const rules = interaction.options.getString('ruleset');
		const thumbnail = interaction.options.getAttachment('thumbnail');

		const string = 'Are you sure everything is correct?'
		const italicString = italic(string);

		//Element Content
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('primary')
					.setLabel('Confirm')
					.setStyle(ButtonStyle.Primary),
			);
		
		const rowDisabled = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('primary')
					.setLabel('Confirmed')
					.setStyle(ButtonStyle.Secondary)
					.setDisabled(true),
			);

		const embed = new EmbedBuilder()
			.setColor('#0099ff')
			.setTitle(name)
			.setURL('https://discord.js.org/')
			.setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL({dynamic: true, size: 512}), url: 'https://discord.js.org' })
			.setDescription(desc)
			.setThumbnail(thumbnail&&thumbnail.proxyURL)
			.addFields(
				{ name: date||"Date: TBD", value: rules||"A ruleset has not yet been applied to this event" },
				{ name: '\u200B', value: '\u200B' },
				{ name: 'Inline field title', value: 'Some value here', inline: true },
				{ name: 'Inline field title', value: 'Some value here', inline: true },
			)
			.addField('Inline field title', 'Some value here', true)
			.setImage(thumbnail&&thumbnail.proxyURL)
			.setTimestamp()
			.setFooter({ text: 'Lord is a cool Dude.', iconURL: 'https://cdn.discordapp.com/attachments/953142716840177677/994184954915336262/lordIcon_2.png' });

		
		//Reply
		await interaction.reply({ embeds: [embed], components: [row] });		

		//Button Click Listener
		const filter = i => i.customId === 'primary';

		const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

		collector.on('collect', async i => {
			if (i.customId === 'primary') {
				await i.update({ embeds: [embed], components: [rowDisabled] });
			}
			console.log(thumbnail)
		});

		collector.on('end', collected => console.log(`Collected ${collected.size} items`));
	},
};