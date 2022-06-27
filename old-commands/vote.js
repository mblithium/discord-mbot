const Discord = require('discord.js')

module.exports.run = async (client, msg, args) => {
    let targ = args.length
        if (args.length <= 1) return msg.channel.send(`\n**Exemplo de uso:**\nmb-vote Você gosta de pamonha?`)
        // if (args[0] != Number) return msg.channel.send(`<@${msg.author.id}> Enquete inválida. Digite o número de reações.\n**Exemplo:**\nmb-enquete 2 bla bla bla bla`)
        const topico = args.join(" ")
        if (args.length == 1) return msg.channel.send(`Enquete de <@${msg.author.id}>\n >>> ${topico}`)
        let m = await msg.channel.send(`**Enquete de <@${msg.author.id}>**\n>>> ${topico}`)
        m.react('👍')
            .then(() => m.react('👎'))
            .catch(() => console.error('One of the emojis failed to react.'));
        return;
}