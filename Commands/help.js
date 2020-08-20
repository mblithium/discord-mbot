const Discord = require('discord.js')

// Comando de Ajuda

module.exports.run = async (client, msg, args) => {
    let embed = new Discord.RichEmbed()
            .setTitle('MBOT v.Alpha - Lista de Comandos')
            .setThumbnail(client.user.avatarURL)
            .setDescription('> O MBOT não foca em comandos de moderação, apenas em diversão e utilidades.\n\n**Prefixo:** mb-\nPara usar um comando digite o prefixo mb- e o comando. \n**Exemplo:** mb-dice d20')
            .addField('Utilidades e Perfil', '👤 perfil - Criar ou ver seu perfil\n📄 notas - Criar e editar notas\n:camping: loja - Barraca do Crash\n📋 vote - Voto por reação \n:page_facing_up: about - Sobre o bot', true)
            .addField('Diversão', '🐶 pets - Multidex de Pets\n🎲 dice - Lançar dados\n😆 meme - Criar memes\n💿 pokedex - Ver informações de um pokémon\n:flower_playing_cards: yugioh - Ver informações sobre um card yugioh', true)
            .addField('Sobre os comandos', 'Digite um comando sem argumentos para ver sua descrição e exemplos de uso.')
            .setColor("#6c5ce7")
            .setFooter('MBOT - Mais comandos depois de séculos...')
    console.log(msg.channel.id)
    return msg.channel.send(embed)
}