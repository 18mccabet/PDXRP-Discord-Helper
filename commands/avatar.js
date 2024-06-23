const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Replies with Avatar!')
        .addUserOption(option => option.setName('target').setDescription('The user')),

	async execute(interaction) {
		const target = interaction.options.getUser('target');

        console.log(target, "target")

        const Response = new EmbedBuilder()
            // .setColor("AQUA")
            .setAuthor(target.tag, target.avatarURL({dynamic: true, size: 512}))
            .setThumbnail(target.avatarURL({dynamic: true, size: 512}))
            .addField("ID", `${target.id}`)

		await interaction.reply({embeds: [Response], ephemeral:true});
	},
};