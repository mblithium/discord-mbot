const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const pets = require('./Database/pets.json')
const badges = require('./Database/badges.json')
// badges.GLOBAL[0][id][0].propriedades_da_badge
const fetch = require('node-fetch')

const FileSync = require('lowdb/adapters/FileSync');
const low = require('lowdb')
const adapter = new FileSync('./Database/db.json')
const db = low(adapter)

const talkedRecently = new Set();
const coindown = new Set();
const randomstatus = require('./Modules/randomstatus.js')

client.on('ready', () => {
    console.log(`Bot iniciado. \n Usuários: ${client.users.size} \n Canais: ${client.channels.size} \n Servidores: ${client.guilds.size}`)
    randomstatus.run(client)
})

client.on('guildCreate', guild => {
    console.log(`O bot entrou no servidor: ${guild.name} (id: ${guild.id}). População: ${guild.memberCount} membros!`)
    client.user.setActivity(`Estou em ${client.guilds} servidores.`, "PLAYING")
    db.set(guild.id, []).write()
})

client.on('guildDelete', guild => {
    console.log(`O bot foi removido do servidor: ${guild.name} (id: ${guild.id})`)
    client.user.setActivity(`Serving ${client.guilds} servers`)
})

const prefix = config.prefix
var log = ` `
var b = '```'


// O bot irá responder estas mensagens:
client.on('message', async msg => {

    if (!msg.author.bot && msg.channel.type === 'dm') return msg.author.send('Calma lá, você não pode executar comandos em DM! Quer dizer, AINDA não.')

    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).split(' ');
    const command = args.shift().toLocaleLowerCase();


    // Cooldown
    if (talkedRecently.has(msg.author.id)) {
        let warn = await msg.reply('Ops, espere um pouco antes de digitar outro comando!')
        setTimeout(() => {
            warn.delete();
            console.log('warn deletado')
        }, 5000)
        return console.log(`Usuário está em cooldown! ${talkedRecently.has(msg.author.id)}`);
    }

    talkedRecently.add(msg.author.id);
    setTimeout(() => {
        talkedRecently.delete(msg.author.id);
        console.log('Usuário removido do cooldown')
    }, 5000);

    if (coindown.has(msg.author.id)) {
        return;
    }

    coindown.add(msg.author.id);
    setTimeout(() => {
        addCoin()
        coindown.delete(msg.author.id);
    }, 10000);


    // Adicionar coin ao usuário.
    function addCoin() {
        let perf = db.get(msg.guild.id).find({ id: msg.author.id }).value()
        if (perf == undefined) return undefined;
        let coin = Number(perf.Coins)
        db.get(msg.guild.id)
            .find({ id: msg.author.id })
            .assign({ Coins: coin + 1 })
            .write()
        coin = Number(perf.Coins)
        return console.log(`Usuario ${msg.author.id} ${msg.author.username} att coin p/ ${coin}`)
    }

    if (msg.author.id == '260436463244673035') {
        return msg.reply('Você deveria estar fazendo suas tarefas em vez de enviar comandos.')
    }

    try {
        let commandFile = require(`./Commands/${command}.js`)
        delete require.cache[require.resolve(`./Commands/${command}.js`)]
        return commandFile.run(client, msg, args)
    } catch {
        console.error(Error);
        return coinv()
    }

    return;

    async function coinv() {
        const mensagem = await msg.reply('Comando inválido.\n\n**Para ver meus comandos digite:**\nmb-help')
        setTimeout(() => { mensagem.delete() }, 5000);
        return console.log('Um usuário enviou um comando incorreto.', msg.author.id, msg.author.username);
    }

    

})

client.login(config.token)

