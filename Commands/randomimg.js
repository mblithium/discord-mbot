const Discord = require('discord.js')

// RANDOM IMG
// Gera um id aleatório para achar imagens no prnt.sc 
module.exports.run = async (client, msg, args) => {
    if (msg.channel.id == '704363957292630066' || msg.channel.id == '559183156008452146') {

        var rand = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']]
        var gen = '';
        for (i = 0, nl = 0, mm = 0, randomizar = 0; i < 6; i++) {
            randomizar = Math.random(10) * 10
            // Número (0) ou Letra (1)
            nl = ((randomizar < 5) ? nl = 0 : nl = 1);
            if (nl == 0) {
                // testes console.log('Numero. Aleatorizando...')
                // 10 Números 9 índices
                randomizar = Math.floor(Math.random() * 9) + 1
                gen = `${gen}${rand[0][randomizar]}`
            } else {
                // 26 letras 25 índices
                // Minúsculo (0) ou Maiúsculo (1) (Caso seja letra)
                randomizar = Math.floor(Math.random() * 25) + 1
                gen += `${rand[1][randomizar]}`
            }
            // testes console.log(`GEN[${i}]: ${gen}`)
        }
    
        return msg.channel.send(`https://prnt.sc/${gen}`)
    } else {
        const mensagem = await msg.reply('Você não pode executar esse comando neste canal.')
        setTimeout(() => { mensagem.delete() }, 5000);
    }
return;
}

