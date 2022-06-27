const Discord = require('discord.js')
const low = require('lowdb')
const adapter = new FileSync('./Database/db.json')
const db = low(adapter)
var b = '```'

module.exports.run = async (client, msg, args) => {
    const mensagem = await msg.channel.send('O comando de notas está em manutenção. \nTodas as notas do usuário serão globais no futuro.')

    setTimeout(() => { mensagem.delete() }, 10000);

    

    return
    if (!args[0]) return msg.channel.send('')
}

        