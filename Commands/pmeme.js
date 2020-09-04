const Discord = require('discord.js')

module.exports.run = async (client, msg, args) => {
    var mensagem = args.join(' ')
    console.log(args[0], typeof(args[0]))
    console.log(mensagem)

    if (!args[0]) {
        let embed = new Discord.RichEmbed()
            .setTitle('O explicador de Memes')
            .setDescription('Use ele para explicar um meme específico.')
            .addField('Modo de Uso', 'mb-pmeme explicação do meme (até 1024 caracteres)')
            .setThumbnail('https://i.pinimg.com/736x/18/0d/5a/180d5a55ce041adcffb6646b7451fa73.jpg')
            .setColor('#6c5ce7')
            .setFooter('MBOT')
        msg.channel.send(embed)
        /*const message = await msg.channel.send(embed)
        setTimeout(() => { message.delete() }, 50000);*/
        return
    }

    if (mensagem.length >= 1024) return msg.channel.send('Ops, você só pode digitar até 1024 caracteres.')

    let embed = new Discord.RichEmbed()
        .setTitle('Explicador de Memes')
        .setDescription('Eu explico memes para pessoas que não conseguem distinguir as nuances pitorescas da maior arte contemporânea da internet.')
        .setThumbnail('https://i.pinimg.com/736x/18/0d/5a/180d5a55ce041adcffb6646b7451fa73.jpg')
        .addField('Explicação:', mensagem)
        .setColor('#6c5ce7')
        .setFooter('MBOT')
    msg.channel.send(embed)
    return
}