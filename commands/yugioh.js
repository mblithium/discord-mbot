const { SlashCommandBuilder } = require('@discordjs/builders');

/*

Comando em testes, ainda não completo.

*/

module.exports = {
	data: new SlashCommandBuilder()
		.setName('yugioh')
		.setDescription('Responde com informações em português de cards de Yu-Gi-Oh')
		.addStringOption(option => option.setName('input').setDescription('Nome da carta')),
	async execute(interaction) {
		const cardName = interaction.options.getString('input');

		console.log(typeof cardName);

		if (cardName) {
			await interaction.reply('Ops, você precisa clicar e adicionar o nome da carta!!!')
		} else {
			await interaction.reply(`O nome da carta é: ${cardName}`);
		}

	},
};
