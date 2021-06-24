const db = require('../database')

class NC {
    nome;
    descricao;
    dataCriacao;
    dataTermino;
    pdf;
    fotos;
    resolucao;
    prioridades;
    idU;
    idE;


    constructor(nome, descricao, dataCriacao, dataTermino, pdf, fotos, resolucao, prioridades, idU, idE) {
        if(arguments.length < 10)
            Throw("missing argument exception");
        this.nome = nome;
        this.descricao = descricao;
        this.dataCriacao = dataCriacao;
        this.dataTermino = dataTermino;
        this.pdf = pdf;
        this.fotos = fotos;
        this.resolucao = resolucao;
        this.prioridades = prioridades;
        this.idU = idU;
        this.idE = idE;
    }

}

module.exports = NC;