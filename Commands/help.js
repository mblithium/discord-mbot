const Discord = require('discord.js')

// Comando de Ajuda

module.exports.run = async (client, msg, args) => {
    let embed = new Discord.RichEmbed()
            .setTitle('MBOT v.Alpha - Lista de Comandos')
            .setImage(client.user.avatarURL)
            .setDescription('O MBOT não foca em comandos de moderação, apenas em diversão e utilidades.\n\nPrefixo: mb-\nPara usar um comando digite o prefixo mb- e o comando. Exemplo: mb-dice d20')
            .addField('Utilidades e Perfil', '👤 Criar ou ver seu perfil - perfil\n📄 Criar e editar notas - notas\n:camping: - Barraca do Crash - loja\n📋 Voto por reação - vote', false)
            .addField('Diversão', '🐶 Multidex de Pets - pets\n🎲 Lançar dados - dice\n😆 - Criar memes - meme\n💿 Ver informações de um pokémon - pokedex\n:flower_playing_cards: Ver informações sobre um card yugioh - yugioh', false)
            .addField('Sobre os comandos', 'Digite um comando sem argumentos para ver sua descrição e exemplos de uso.')
            .setColor("#6c5ce7")
            .setFooter('MBOT - Mais comandos depois de séculos...')
    console.log(msg.channel.id)
    return msg.channel.send(embed)
}