const Discord = require('discord.js')
const fetch = require('node-fetch')
module.exports.run = async (client, msg, args) => {
    var person;
    var fake = {};
    teste = fetch('https://randomuser.me/api/?nat=br')
    .then((res) => {
        res.json()
        .then((resposta) => {
        person = resposta
        // Para testes console.log(person)
        now = new Date
        fake.seed = person.info.seed // Seed Gerador
        fake.tname = person.results[0].name.title // title
        fake.fname = person.results[0].name.first // First name
        fake.lname = person.results[0].name.last // Last name
        fake.longname = `${fake.fname} ${fake.lname}` // Nome completo
        fake.photo = person.results[0].picture.large // Profile Photo
        fake.state = person.results[0].location.state // Estado.
        fake.age = person.results[0].dob.age // Idade
        fake.birth = now.getFullYear() - fake.age // Data de nascimento.
        fake.mail = person.results[0].email // Email
        // fake.cell = person.results[0].cell // Celular
        let embed = new Discord.RichEmbed()
        .setTitle('Fake Generator')
        .setDescription('Crie um fake randomizado por uma seed.')
        .setThumbnail(fake.photo)
        .addField('Nome:', fake.longname)
        .addField('Idade:', `${fake.age} (${fake.birth})`)
        .addField('Localização', `${fake.state}`)
        // .addField('Celular:', fake.cell)
        .addField('Email template:', fake.mail)
        .setFooter(`Seed gerador: ${fake.seed}`)
        
        msg.channel.send(embed)
        // Para testes console.log('fake:', fake)
        return;
        }).catch((err) => console.log('Alguma coisa deu errado ao converter json', err))
    }).catch((err) => console.log('Alguma coisa deu errado ao gerar o fake', err))


    return;
}