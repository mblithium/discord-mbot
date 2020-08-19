const Discord = require('discord.js')
var b = '```'

module.exports.run = async (client, msg, args) => {
    const mensagem = await msg.channel.send('O comando de notas está em manutenção. \nTodas as notas do usuário serão globais no futuro.')
    return setTimeout(() => { mensagem.delete() }, 10000);
}

        