const Discord = require('discord.js')
const CANVAS = require('canvas')
var b = '```'

module.exports.run = async (client, msg, args) => {
    if (!args[0]) return msg.reply(`**Modo de uso:**\n${b}mb-meme think seu texto escrito aqui.${b}\n**Memes Disponíveis:**\n**think** -> Você não vai precisar editar se tem um comando pra isso.\n**stonks** -> Alguém conseguiu uma vantagem\n**cadeaporta** -> Drake, cadê a porta? Vai ser aí ué... Eu já saquei.. AH NÃO BRINCA!`)
        let memelinks = [['https://imgflip.com/s/meme/Roll-Safe-Think-About-It.jpg', 702, 550, 10, 50, 680, 0, 0, 720, 100], ['https://i.imgflip.com/3388rw.png', 825, 619, 10, 560, 680, 0, 500, 1500, 200], ['https://i.imgflip.com/26gls0.jpg', 702, 550, 10, 50, 680, 0, 0, 720, 100]]
        // , ['https://imgflip.com/s/meme/Spongegar.jpg', 702, 550, 10, 50, 680, 0, 0, 720, 100]
        let select = String(args[0])
        select = select.toLowerCase()
        if (select == 'think' || select == 'stonks' || select == 'cadeaporta') {
            if (!args[1]) return msg.reply('Opa, você precisa escrever alguma coisa!')
            let texto = args[1]
            if (texto.length > 120) return msg.reply('Você digitou mais que 120 caracteres. Tente digitar menos caracteres.')
            var meme = select
            if (meme == 'think') {
                meme = memelinks[0]
            } else if (meme == 'stonks') {
                meme = memelinks[1]
            } else if (meme == 'cadeaporta') {
                meme = memelinks[2]
            } else {
                return msg.reply('Ops, meme inválido. Digite mb-meme para ver os memes disponíveis.')
            }
           
            if (args.length < 2) memeCreate(texto, meme)
            if (args.length > 1) {
                let targ = args.length
                for (i = 2; i < targ; i++) {
                    texto += ' ' + args[i]
                }
                if (texto.length > 120) return msg.reply('Você digitou mais que 120 caracteres. Tente digitar menos caracteres.')
                memeCreate(texto, meme)
            }
            function memeCreate(t, memer) {
                let meme = memer
                let text = t
                const ctcanvas = CANVAS.createCanvas(meme[1], meme[2]);
                const ctx = ctcanvas.getContext('2d')

                CANVAS.loadImage(meme[0]).then(img => {
                    ctx.drawImage(img, 0, 0, meme[1], meme[2])

                    ctx.fillStyle = 'rgba(255,255,255,0.9)'
                    ctx.fillRect(meme[6], meme[7], meme[8], meme[9])

                    ctx.fillStyle = '#000000'
                    ctx.font = '35px OpenSans bold'
                    ctx.direction = ''
                    ctx.shadowOffsetX = '30'
                    ctx.textAlign = 'center'
                    // Texto e Alinhamento. POS X, POS Y, LARGURA, ALTURA
                    ctx.fillText(text, ctcanvas.width/2, meme[4], meme[5])


                    let attachment = new Discord.Attachment(ctcanvas.toBuffer())
                    return msg.channel.send(attachment)
                })
            }
        } else {
            return msg.channel.send('Meme não encontrado. Digite: mb-meme caso precise de ajuda sobre o comando.')
        }
return;        
}
