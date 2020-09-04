const { Canvas } = require('canvas');
const Discord = require('discord.js')
const low = require('lowdb')
const CANVAS = require('canvas')

const FileSync = require('lowdb/adapters/FileSync');
const adapter3 = new FileSync('./Database/badges.json')
const adapter = new FileSync('./Database/db.json')
const db = low(adapter)
const dbbadges = low(adapter3)

module.exports.run = async (client, msg, args) => {
    var comando = "GLOBAL"
    var ctype = "GLOBAL"
    let perf = db.get(comando).find({ id: msg.author.id }).value()
    console.log(perf)
    if (args[0] != undefined && perf != undefined) {
        let person = args[0]
        
        perf = db.get(comando).find({ id: person }).value()
        if (perf == undefined) {
            const message = await msg.channel.send('Usuário não encontrado')
            setTimeout(() => { message.delete() }, 10000);
            return
        }

        profileCreate(ctype, perf.id, perf.nick, perf.avatar, perf.Coins, perf.notas.length, perf.badges, perf.pets)
        return;

    }
    if (perf == undefined) {
        msg.channel.send('Perfil não encontrado, criando perfil...')
        db.get(comando)
            .push({
                id: msg.author.id,
                nick: msg.author.username,
                avatar: msg.author.displayAvatarURL,
                badges: ["G1"],
                Coins: "0",
                pets: ["🐱 El Gato"],
                notas: ["Você pode editar esta nota digitando o comando mb-notas número_da_nota conteúdo escrito de o que você quer salvar na nota."]
            }).write()

        db.get("GLOBAL")
            .push({
                id: msg.author.id,
                nick: msg.author.username,
                avatar: msg.author.displayAvatarURL,
                badges: ["G1"],
                Coins: "0",
                pets: ["🐱 El Gato"],
                notas: ["Você pode editar esta nota digitando o comando mb-notas 1 conteúdo escrito de o que você quer salvar na nota."]
            }).write()
        return msg.channel.send('Perfil criado com sucesso!')
    }
    perf = db.get(comando).find({ id: msg.author.id }).value()

    // Salva alterações no perfil do servidor. 
    db.get(comando)
        .find({ id: msg.author.id })
        .assign({ avatar: msg.author.displayAvatarURL })
        .write()

    // Salva alterações no perfil GLOBAL
    db.get("GLOBAL")
        .find({ id: msg.author.id })
        .assign({ avatar: msg.author.displayAvatarURL })
        .write()

    
    /*
    let perfil;
    perfil = new Discord.RichEmbed()
        .setTitle(`${msg.author.username}`)
        .addField("Coins: ", value = perf.Coins, true)
        .addField('Bloco de notas', `${perf.notas.length} nota(s) salva(s)`, true)
        .setDescription(``)
        .setThumbnail(msg.author.displayAvatarURL)
        .addBlankField(true)
        .addField("Conquistas", value = perf.badges, true)
        .addField("Pets: ", value = perf.pets, true)
        .setColor("#6c5ce7")
        .setFooter("MBot")
    */
        // typeperf, urserid, username, pfpic, coins, notas, badges
        profileCreate(ctype, perf.id, perf.nick, perf.avatar, perf.Coins, perf.notas.length, perf.badges, perf.pets)
    return;


// FUNCOES
    // comando, perf.id, perf.nick, perf.avatar, perf.Coins, perf.notas.length, perf.badges, perf.pets
    async function profileCreate(typeperf, userid, username, pfpic, coins, notas, badges) {
        const ctcanvas = CANVAS.createCanvas(620, 460);
        const ctx = ctcanvas.getContext('2d')
        var te = [482, 80]

        console.log(typeperf)
        const background = await CANVAS.loadImage("./Assets/IMG/Profile/BG/01.jpg").catch((err) => console.log(`Erro ao carregar imagem de fundo ${err}`))
        ctx.drawImage(background, 0, 0, 620, 460)
        console.log(typeperf)
        if (dbbadges.get(typeperf).find({ badgeid: badges[0] }).value() != undefined) {
            var badge1 = dbbadges.get(typeperf).find({ badgeid: badges[0] }).value()
            console.log(badge1)
        }
        if (dbbadges.get(typeperf).find({ badgeid: badges[1] }).value() != undefined) {
            var badge2 = dbbadges.get(typeperf).find({ badgeid: badges[1] }).value()
            console.log(badge2)
        }
        if (dbbadges.get(typeperf).find({ badgeid: badges[2] }).value() != undefined) {
            var badge3 = dbbadges.get(typeperf).find({ badgeid: badges[2] }).value()
            console.log(badge3)
        }
        if (dbbadges.get(typeperf).find({ badgeid: badges[3] }).value() != undefined) {
            var badge4 = dbbadges.get(typeperf).find({ badgeid: badges[3] }).value()
            console.log(badge4)
        }
        if (dbbadges.get(typeperf).find({ badgeid: badges[4] }).value() != undefined) {
            var badge5 = dbbadges.get(typeperf).find({ badgeid: badges[4] }).value()
            console.log(badge5)
        }
        if (dbbadges.get(typeperf).find({ badgeid: badges[5] }).value() != undefined) {
            var badge6 = dbbadges.get(typeperf).find({ badgeid: badges[5] }).value()
            console.log(badge6)
        }
    
    
        /*
        var badge2 = dbbadges.get(typeperf).find({ badgeid: badges[1] }).value()
        var badge3 = dbbadges.get(typeperf).find({ badgeid: badges[2] }).value()
        var badge5 = dbbadges.get(typeperf).find({ badgeid: badges[3] }).value()
        var badge5 = dbbadges.get(typeperf).find({ badgeid: badges[4] }).value()
        var badge6 = dbbadges.get(typeperf).find({ badgeid: badges[5] }).value()
        */

        // Card de Informações
        ctx.fillStyle = "rgba(89, 107, 125, 1)";
        ctx.fillRect(6, 150, 610, 290);

        // Card de Moldura
        ctx.fillStyle = "rgba(131, 149, 167, 1)";
        ctx.fillRect(6, 90, 160, 160);

        // Card de ...
        ctx.fillStyle = "rgba(131, 149, 167, 1)";
        ctx.fillRect(90, 90, 526, 100);
        
        // Tipo de Perfil
        ctx.fillStyle = "rgba(34, 47, 62, 1)";
        ctx.fillRect(166, 90, 450, 50);
        ctx.font = "40px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(typeperf, 180, 130)

        ctx.font = "40px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(`${username}`, 180, 180)

        // COINS
        ctx.font = "18px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(`C ${coins}`, 180, 215)

        // Quantidade Notas
        ctx.font = "18px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(`${notas} notas(s) salva(s)`, 360, 215)
            
        // Card Conquista 1
        ctx.fillStyle = "rgba(131, 149, 167, 1)";
        ctx.fillRect(20, 350, 80, 80);
        // ID Conquista 1
        ctx.font = "10px Arial";
        ctx.fillStyle = "white";
        if (badge1 != undefined) {
            ctx.fillText(badge1.badgeid, 28, 439)
        }

        // Card Conquista 2
        ctx.fillStyle = "rgba(131, 149, 167, 1)";
        ctx.fillRect(120, 350, 80, 80);

        // ID Conquista 2
        ctx.font = "10px Arial";
        ctx.fillStyle = "white";
        if (badge2 != undefined) {
            ctx.fillText(badge2.badgeid, 128, 439)
        }
        

        // Card Conquista 3
        ctx.fillStyle = "rgba(131, 149, 167, 1)";
        ctx.fillRect(220, 350, 80, 80);

        // ID Conquista 3
        ctx.font = "10px Arial";
        ctx.fillStyle = "white";
        if (badge3 != undefined) {
            ctx.fillText(badge3.badgeid, 228, 439)
        }
        

        // Card Conquista 4
        ctx.fillStyle = "rgba(131, 149, 167, 1)";
        ctx.fillRect(320, 350, 80, 80);

        // ID Conquista 4
        ctx.font = "10px Arial";
        ctx.fillStyle = "white";
        if (badge4 != undefined) {
            ctx.fillText(badge4.badgeid, 328, 439)
        }
        

        // Card Conquista 5
        ctx.fillStyle = "rgba(131, 149, 167, 1)";
        ctx.fillRect(420, 350, 80, 80);

        // ID Conquista 5
        ctx.font = "10px Arial";
        ctx.fillStyle = "white";
        if (badge5 != undefined) {
            ctx.fillText(badge5.badgeid, 428, 439)
        }
        
        // Card Conquista 6
        ctx.fillStyle = "rgba(131, 149, 167, 1)";
        ctx.fillRect(520, 350, 80, 80);

        // ID Conquista 6
        ctx.font = "10px Arial";
        ctx.fillStyle = "white";
        if (badge6 != undefined) {
            ctx.fillText(badge6.badgeid, 528, 439)
        }
        

        ctx.font = "20px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(`ALPHA TEST`, te[0], te[1])

        const profpic = await CANVAS.loadImage(pfpic)
            ctx.drawImage(profpic, 11, 95, 150, 150)
        
        if (badge1 != undefined) {
            const con1 = await CANVAS.loadImage(badge1.badgeimg).catch((err) => console.log(err))
            ctx.drawImage(con1, 20, 350, 80, 80)
        }
        if (badge2 != undefined) {
            const con2 = await CANVAS.loadImage(badge2.badgeimg).catch((err) => console.log(err))
            ctx.drawImage(con2, 120, 350, 80, 80)
        }
        if (badge3 != undefined) {
            const con3 = await CANVAS.loadImage(badge3.badgeimg).catch((err) => console.log(err))
            ctx.drawImage(con3, 220, 350, 80, 80)
        }
        if (badge4 != undefined) {
            const con4 = await CANVAS.loadImage(badge4.badgeimg).catch((err) => console.log(err))
            ctx.drawImage(con4, 320, 350, 80, 80)
        }
        if (badge5 != undefined) {
            const con5 = await CANVAS.loadImage(badge5.badgeimg).catch((err) => console.log(err))
            ctx.drawImage(con5, 420, 350, 80, 80)
        }
        if (badge6 != undefined) {
            const con6 = await CANVAS.loadImage(badge6.badgeimg).catch((err) => console.log(err))
            ctx.drawImage(con6, 520, 350, 80, 80)
        }
            
        let attachment = new Discord.Attachment(ctcanvas.toBuffer())
        msg.channel.send(attachment)

        return;

    }




}

    /*
        var comando = "GLOBAL"
        var ctype = "GLOBAL"
        console.log('AAAA - GLOBAL')
    } else {
        var comando = msg.guild.id
        var ctype = msg.guild.name
        console.log('AAAAAA - LOCAL')
    }
    */
    


