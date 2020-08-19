const Discord = require('discord.js')

module.exports.run = async (client, msg, args) => {
    const mensagem = await msg.channel.send('O comando de loja está em desenvolvimento.')
    return setTimeout(() => { mensagem.delete() }, 10000);
}