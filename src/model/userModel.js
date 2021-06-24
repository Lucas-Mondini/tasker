const db = require('../database')

class User {
    idU;
    nome;
    email;
    idCargo;
    dataNascimento;
    CPF;
    PIS;
    senha;
    idE;

    constructor(nome, email, dataNascimento, CPF, PIS, senha, idCargo, idE) {
        if(arguments.length < 8 )
            Throw("missing argument exception");
        this.nome = nome;
        this.email = email;
        this.dataNascimento = dataNascimento;
        this.CPF = CPF;
        this.PIS = PIS;
        this.senha = senha;
        this.idCargo = idCargo;
        this.idE = idE;
    }

}

module.exports = User;