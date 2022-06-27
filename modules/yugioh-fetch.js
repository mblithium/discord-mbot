import fetch from node-fetch;

module.exports = {

};

async function fetchYGOCard(carta) {

    try {
        await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${carta}`)

    } catch (error) { console.log(error); };
 
};