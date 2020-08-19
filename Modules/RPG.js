// Randomizar dados de jogos de RPG.
// Por: MBLithium
exports.randomize = (d) => {
    // d100 = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    if (d == 100) { //caso o dado seja d100, conta-se de multiplos de 10.
        randomresp = Math.floor(Math.random() * d) + 1;
        if (randomresp <= 10) {
            return 10;
        } else if (randomresp <= 20) {
            return 20;
        } else if (randomresp <= 30) {
            return 30;
        } else if (randomresp <= 40) {
            return 40;
        } else if (randomresp <= 50) {
            return 50; 
        } else if (randomresp <= 60) {
            return 60;
        } else if (randomresp <= 70) {
            return 70;
        } else if (randomresp <= 80) {
            return 80;
        } else if (randomresp <= 90) {
            return 90;
        } else {
            return 100;
        }
    } else {
        return Math.floor(Math.random() * d) + 1;
    }
}

// Criação de fichas com embed em lowdb
//exports.profile = () => {}


// console.log(randomize(20))