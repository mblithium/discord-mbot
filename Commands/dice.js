const Discord = require('discord.js')
const { randomize } = require('../Modules/RPG.js');
module.exports.run = async (client, msg, args) => {
      // Comandos de Dado RPG
      if (!args[0]) {
          let embed = new Discord.RichEmbed()
            .setTitle('Comando de Dados RPG')
            .setDescription('Você pode jogar vários dados de RPG utilizando o comando mb-dice nome_do_dado.')
            .addField('Os dados disponíveis são:', 'd2, d4, d6, d20, d100 e dx. O dado dx é um dado personalizado de 1 até 10000.')
            .addField('Exemplos de uso do comando:', 'mb-dice d20\nmb-dice dx 500')
            .setColor("#6c5ce7")
          return msg.channel.send(embed)
      }
      if (args[0] == 'd2') {

        let user = msg.member.id;
        let result = randomize(2);
        return msg.channel.send(`<@${user}> jogou o dado D2... :game_die: ` + `\nResultado: ${result}`);

    }

    if (args[0] == 'd4') {

        let user = msg.member.id;
        let result = randomize(4);
        return msg.channel.send(`<@${user}> jogou o dado D4... :game_die: ` + `\nResultado: ${result}`);

    }

    if (args[0] == 'd6') {

        let user = msg.member.id;
        let result = randomize(6);
        return msg.channel.send(`<@${user}> jogou o dado D6... :game_die: ` + `\nResultado: ${result}`);

    }

    if (args[0] == 'd20') {

        let user = msg.member.id;
        let result = randomize(20);
        return msg.channel.send(`<@${user}> jogou o dado D20... :game_die: ` + `\nResultado: ${result}`);

    }

    if (args[0] == 'd100') {

        let user = msg.member.id;
        let result = randomize(100);
        return msg.channel.send(`<@${user}> jogou o dado D100... :game_die: ` + `\nResultado: ${result}`);

    }

    if (args[0] == 'delicia') {

        let user = msg.member.id;
        let result = randomize(2);
        if (result == 1) {
            return msg.channel.send(`<@${user}> jogou o dado Delícia... :game_die: :smiling_face_with_3_hearts: ` + `\nResultado: Que delícia!`);
        } else {
            return msg.channel.send(`<@${user}> jogou o dado Delícia... :game_die: :smiling_face_with_3_hearts: ` + `\nResultado: Não foi dessa vez...`);
        }
    }

    if (args[0] == 'dx') {

        if (args[1] == undefined || isNaN(args[1])) {
            const mensagem = await msg.reply('Você precisa digitar um número válido.\nExemplo de uso:\nmb-dice dx 200')
            setTimeout(() => { mensagem.delete() }, 5000);
            return;
        } if (args[1] < 1 || args[1] > 10000) {
            msg.reply('Valor inválido. Por favor, escolha um número de 1 até 10000');
        } else {
            let user = msg.member.id;
            let result = randomize(args[1]);
            if (isNaN(result) || result == 'valor inválido') return coinv();
            msg.channel.send(`<@${user}> jogou o dado D${args[1]}... :game_die: ` + `\nResultado: ${result}`);
        }

        return;
    }
}