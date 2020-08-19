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

    // MINIs
    if (command == 'mini' || command == 'minis') return;


    // Consultar BADGES
    if (command == 'gbadges' || command == 'gbadges' || command == 'badges' || command == 'badges') {
        if (command == 'gbadges' || command == 'gbadges') {
            var comando = "GLOBAL"
            console.log('AAAA - BAGDE GLOBAL')
        } else {
            var comando = msg.guild.id
            console.log('AAAAAA - BADGE LOCAL')
        }
        if (!args[0]) return msg.channel.send(`**Uso da Pesquisa de Badges:**\nVer informações de uma badge:\n${b}mb-badges id_da_badge${b}`)

        let arg = args.toString()
        arg = args[0]
        console.log(`O que tem no arg:${arg}`)
        let badge = dbbadges.get(comando).find({ badgeid: arg }).value()
        console.log(badge)
        if (badge == undefined) return msg.channel.send('EPA, não existe essa badge!')

        let embed = new Discord.RichEmbed()
            .setTitle('Pesquisa de Badges - BETA')
            .setDescription(`Encontre badges por sua id.`)
            .setThumbnail(badge.badgeimg)
            .addField('Nome da badge:', badge.badgename)
            .addField('Descrição: ', badge.description)
            .setColor("#6c5ce7")
            .setFooter('MBOT')
        return msg.channel.send(embed)



    }


    if (command == 'rpg') {
        return msg.reply('Parece que você achou um spoiler...')
    }

    if (command == 'avatar') {

        const avatar = new Discord.RichEmbed()
            .setTitle("🖼 Avatar de " + `${msg.author.username}`)
            .setDescription(`**Clique [aqui](${msg.author.displayAvatarURL}) para baixar a imagem!**`)
            .setImage(msg.author.displayAvatarURL)
            .setColor("#6c5ce7")
            .setFooter("MBot")

        return msg.channel.send(avatar)

    }


  

    if (command == 'loja') {

        if (!args[0]) {
            let embed = new Discord.RichEmbed()
                .setTitle('Barraca do Crash')
                .setThumbnail('https://emoji.gg/assets/emoji/8975_woah.png')
                .setDescription('Veja itens que você pode comprar na Barraca do Crash.')
                .addField('🐱 Pets 🐶', `🐱 Cat - ${pets.cat[0].preco}\n🐶 Dog - ${pets.cat[0].preco}`)
                .setColor("#6c5ce7")
            msg.channel.send(embed)

        }
        if (args[0] == 'comprar') {
            msg.channel.send('Ainda não é possível comprar itens.')

        }

        return;

    }

    else {
        return coinv();
    }

    async function coinv() {
        const mensagem = await msg.reply('Comando inválido.\n\n**Para ver meus comandos digite:**\nmb-help')
        setTimeout(() => { mensagem.delete() }, 5000);
        return console.log('Um usuário enviou um comando incorreto.', msg.author.id, msg.author.username);
    }

    

})

client.login(config.token)

