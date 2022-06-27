const Discord = require('discord.js')
const fetch = require('node-fetch')

module.exports.run = async (client, msg, args) => {
    if(!args[0]) return msg.channel.send('**Informações sobre um card YuGiOh**\nPesquise pelo nome de uma carta (em inglês) e ela virá traduzida com suas propriedades.')
        var carden
        var cardpt
        let carta = args[0]
        console.log('step 1', carta)
        if (args[1]) {
            let len = args.length
            carta = `${args[0]} ${args[1]}`
            console.log('step 2', carta)
            if (len > 1) {
                for (i = 2; i < len; i++) {
                    carta = `${carta} ${args[i]}`
                }
                console.log('step 3', carta)
            }
        }    
        fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${carta}`)
        .then((resp) => {
            resp.json()
            .then((res) => {
                carden = res
                fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?language=pt&id=${carden.data[0].id}`)
                .then((respond) => {
                    respond.json()
                    .then((rest) => {
                        let embed = new Discord.RichEmbed()
                            .setTitle('Buscando Card Yugioh...')
                            .addField('Nome da Carta em inglês', carden.data[0].name)
                            .addField('Nome da carta em português', rest.data[0].name)
                            .addField('Descrição', rest.data[0].desc)
                            .setThumbnail(carden.data[0].card_images[0].image_url)
                            .setColor('#6c5ce7')
                            msg.channel.send(embed)
                    }).catch((err) => console.log('Erro ao requisitar cardpt 2.'))
                }).catch((err) => console.log('Erro ao requisitar cardpt 1.'))
            }).catch((err) => {
                fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${carta}`)
                .then((fnamecardconv) => {
                    fnamecardconv.json()
                    .then((fnamecard) => {
                        let cartao = fnamecard
                        console.log('STEP', cartao)
                        let lensearch = cartao.data.length
                        var lista = cartao.data[0].name
                        for(i = 1;i < lensearch;i++) {
                            lista = `${lista} | ${cartao.data[i].name}`
                        }
                        let lenlist = lista.length
                        console.log(`Lista: ${lista} / ${lenlist} caracteres.`)
                        if (lista.length > 1024) {
                            lista = lista.slice(0, 1000)
                            lista = `${lista}...`
                        }
                        
                        let embed = new Discord.RichEmbed()
                            .setTitle(`Correspondências para ${carta}`)
                            .addField(`Cartas que contém ${carta} no nome:`, lista)
                        return msg.channel.send(embed)
                    }).catch((err) => console.log(err))
                })
                return msg.reply('Ops, não foi possível encontrar este card.')
            })
        }).catch((err) => console.log('Erro ao requisitar. 1'))
return;
}