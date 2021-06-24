const db = require('../database')

class Team {
    nome;

    constructor(nome) {
        this.nome = nome;
    }

}

module.exports = Team;