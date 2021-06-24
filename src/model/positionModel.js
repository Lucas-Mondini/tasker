const db = require('../database')

class Position {
    nome;
    setor;
    salario;

    constructor(nome, setor, salario) {
        if(arguments.length < 3 )
            Throw("missing argument exception");
        this.nome = nome;
        this.setor = setor;
        this.salario = salario;
    }

}

module.exports = Position;