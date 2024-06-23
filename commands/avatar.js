const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Replies with Avatar!')
        .addUserOption(option => option.setName('target').setDescription('The user')),

	async execute(interaction) {
		const target = interaction.options.getUser('target');

        console.log(target, "target")
        console.log(target.avatarURL({dynamic: true, size: 512}), "avatarurl")

        const Response = new EmbedBuilder()
            .setColor("AQUA")
            .setAuthor({name:target.tag, iconURL: target.avatarURL({dynamic: true, size: 512})})
            .setImage(target.avatarURL({dynamic: true, size: 2048}))
            .addFields({ name: 'User ID', value: `${target.id}` })

		await interaction.reply({embeds: [Response], ephemeral:true});
	},
};