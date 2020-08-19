const Discord = require('discord.js')

module.exports.run = async (client) => {
    const status = [`Estou em ALPHA!`, `Fanart por: Dosg06#5772 - Para ver meus comandos digite mb-help\nALPHA - Migrando para command handler`, `Eu posso pressentir o perigo e o caos. E a cada atualização tenho medo de um bug novo!`, ` 2345meia78 ta na hora de responder um comando!`, `Eu criei vida própria e estou falando por aqui`, `Referências? Que referências?`, `Você sabia que sou Open Source? github.com/mblithium/discord-mbot`, `Ei, que tal se divertir com uns memes? Digite mb-meme`, `Prepare-se para a atualização de RPG! Quando? É... Vai demorar.`, `BRUH`]
    
    setInterval(() => {
        randomizar = Math.floor(Math.random() * 9) + 1
        client.user.setActivity(status[randomizar])
    }, 10000);
console.log('Iniciou o bagulho de Status')
return;
}