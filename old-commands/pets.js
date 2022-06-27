const Discord = require('discord.js')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync');
const adapter2 = new FileSync('./Database/pets.json')
const dbpet = low(adapter2)
const b = '```'

module.exports.run = async (client, msg, args) => {
    if (!args[0]) return msg.channel.send(`**Uso do comando de Pets**\nVer pet com o multidex:\n${b}mb-pets nomedopet${b}\nVer lista de pets disponíveis:${b}mb-pets list${b}`)
        let arg = args.toString()

        arg = arg.split(',').join(' ')

        let pet = dbpet.get(arg).find().value()
        console.log(pet)
        if (pet == undefined) return msg.channel.send('EPA, não existe esse pet!')
       
        if (args[0] == 'list') return msg.channel.send(`**Pets disponíveis**\n${b}${pet.pet_list}${b}`)
        let embed = new Discord.RichEmbed()
            .setTitle('MULTIDEX')
            .setDescription(`O MULTIDEX encontrou o pet! ${pet.icone}`)
            .addField('Nome:', pet.name)
            .addField('Tipo:', pet.tipo)
            .addField('Valor:', pet.preco)
            .addField('Descrição', pet.descript)
            .setColor("#6c5ce7")
            .setFooter('MBOT')
        return msg.channel.send(embed)
}