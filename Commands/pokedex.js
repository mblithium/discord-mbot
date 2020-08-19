const Discord = require('discord.js')
const pokedex = require('pokedex-promise-v2')

// POKEDEX - Pokémons e suas informações.

module.exports.run = async (client, msg, args) => {
    if (!args[0]) return msg.channel.send('Por favor, digite o nome ou id do pokemon depois do comando...')
    let arg = args[0].toLowerCase()
    console.log(arg)
    let poke = new pokedex()
    poke.getPokemonByName(arg) // Obtem dados de um pokemon com seu nome em inglês ou ID.
        .then(function (pkm) {
            let ilen = [pkm.types.length, pkm.abilities.length, pkm.moves.length]
            let typo = pkm.types[0].type.name
            let ab = pkm.abilities[0].ability.name
            let mv = pkm.moves[0].move.name
            console.log(ab)
            if (ilen[0] > 1) {
                for (i = 1; i < ilen[0]; i++) {
                    typo = `${typo}, ${pkm.types[i].type.name}`
                }
            }
            if (ilen[1] > 1) {
                for (i = 1; i < ilen[1]; i++) {
                    ab = `${ab}, ${pkm.abilities[i].ability.name}`
                }
            }
            if (ilen[2] > 1) {
                for (i = 1; i < ilen[2]; i++) {
                    mv = `${mv}, ${pkm.moves[i].move.name}`
                }
            }
            let embed = new Discord.RichEmbed()
                .setTitle('Pokedex')
                .setAuthor('Consultando...', 'https://assets.pokemon.com/static2/_ui/img/favicon.ico')
                .setImage(pkm.sprites.other.dream_world.front_default)
                .setThumbnail(pkm.sprites.front_default)
                .addField('Nome do Pokémon: ', pkm.name, true)
                .addField('ID', `#${pkm.id}`, true)
                .addField('Tipo', `${typo}`, true)
                .addField('Habilidades: ', `${ab}`, true)
                .setColor('#eb3b5a')
            return msg.channel.send(embed)
        })
        .catch(function (error) {
            console.log('There was an ERROR: ', error);
            return msg.channel.send('Ops, houve um erro ao procurar esse pokémon.')
        });
    return;
}