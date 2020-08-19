const Discord = require('discord.js')
const fetch = require('node-fetch')

module.exports.run = async function (client, msg, args) {
    msg.reply('Buscando...')
    var epicgamesfree;
    fetch('https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions?locale=pt-BR&country=BR&allowCountries=BR')
    .then((resp) => {
        resp.json()
        .then((resposta) => {
            epicgamesfree = resposta
            epicgamesfree = epicgamesfree.data.Catalog.searchStore.elements
            quantGames = Number(epicgamesfree.length) - 1
            var games = epicgamesfree[0].title
            for (i = 1;i <= quantGames;i++) {
                games = `${games} \n ${epicgamesfree[i].title}`
            }
            const embed = new Discord.RichEmbed()
                .setTitle('Jogos Grátis Epic Games')
                .setURL('https://www.epicgames.com/store/pt-BR/free-games')
                .setThumbnail(epicgamesfree[0].keyImages[0].url)
                .addField('Epic Games', `${games}`)
            return msg.channel.send(embed)
        })
    }).catch((error) => {
        msg.channel.send('Houve algum erro maluco ao tentar buscar.')
        return console.log('Erro ao buscar.', error)
    })
    console.log("??")
}