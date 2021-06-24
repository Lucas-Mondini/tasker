const db = require('../database')
const NC = require('../model/ncModel')

//READ ALL
const Index = async (req, res) => {
    const allNCs = await db("nc");
    return res.status(200).json({allNCs});
}

//READ
const Get = async (req, res) => {
    const { id: idNC } = req.params;
    const nc = await db("nc").where({ "idNC": idNC }).first()
    if(nc)
        return res.status(200).json(nc);
    return res.status(404).json({"error": "nc not found"});
}

//Create
const Create = async (req, res) => {
    let {nome, descricao, dataCriacao, dataTermino, pdf, fotos, resolucao, prioridades, idU, idE} = req.body;
    const isAlreadyNCInDB = await db("nc").where({ "nome": nome }).first()
    
    if (isAlreadyNCInDB) {
        return res.status(500).json({"error": "this nome is already in use"});
    }

    const nc = new NC(nome, descricao, dataCriacao, dataTermino, pdf, fotos, resolucao, prioridades, idU, idE);

    let ncInserted = await db('nc').insert(nc);

    return res.status(200).json({ncInserted});
}

//Update
const Update = async (req, res) => {
    let {nome, descricao, dataCriacao, dataTermino, pdf, fotos, resolucao, prioridades, idU, idE} = req.body;
    const { id } = req.params;
    const nc = await db("nc").where({ "idNC": id }).first()

    if(!nc) 
        res.status(404).json({"error": "nc not found"});
        

    let ncUpdate = new NC(
        nome? nome : nc.nome,
        descricao? descricao : nc.descricao,
        dataCriacao? dataCriacao : nc.dataCriacao,
        dataTermino? dataTermino : nc.dataTermino,
        pdf? pdf : nc.pdf,
        fotos? fotos : nc.fotos,
        resolucao? resolucao : nc.resolucao,
        prioridades? prioridades : nc.prioridades,
        idU? idU : nc.idU,
        idE? idE : nc.idE
    )

    await db("nc").update(ncUpdate).where({ "idNC": id });
    return res.status(200).json({ncUpdate});
}


//Delete
const Delete = async (req, res)=>{
    const { id } = req.params;

    const nc = await db("nc").where({ "idNC": id }).first()

    if(!nc) 
        res.status(404).json({"error": "nc not found"});
    
    let success = await db("nc").where({ "idNC": id }).del();

    if(success) {
        return res.status(200).json({"success" : "nc "+nc.nome+" deleted sucessfull"});
    }
    return res.status(400).json({"error" : "something went wrong"});
}

module.exports = {
    Index,
    Get,
    Create,
    Update,
    Delete
}