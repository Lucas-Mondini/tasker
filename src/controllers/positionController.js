const bcrypt = require("bcrypt");
const db = require('../database')
const Position = require('../model/positionModel')

//READ ALL
const Index = async (req, res) => {
    const allPositions = await db("cargo");
    return res.status(200).json({allPositions});
}

//READ
const Get = async (req, res) => {

    const { id: idCargo } = req.params;
    const position = await db("cargo").where({ "idCargo": idCargo }).first()
    if(position)
        return res.status(200).json(position);
    return res.status(404).json({"error": "position not found"});
}

//Create
const Create = async (req, res) => {
    let {nome, setor, salario} = req.body;
    const isAlreadyPositionInDB = await db("cargo").where({ "nome": nome }).first()
    
    if (isAlreadyPositionInDB) {
        return res.status(500).json({"error": "this name is already in use"});
    }
    
        position = new Position(nome, setor, salario);
    
    let positionInserted = await db('cargo').insert(position);
    res.status(200).json({positionInserted});
}

//Update
const Update = async (req, res) => {
    let {nome, setor, salario} = req.body;
    const { id } = req.params;
    const position = await db("cargo").where({ "idCargo": id }).first()

    if(!position) 
        res.status(404).json({"error": "position not found"});

    const isAlreadyPositionInDB = await db("cargo").where({ "nome": nome }).first()

    if (isAlreadyPositionInDB) {
        return res.status(500).json({"error": "this name is already in use"});
    }


    let positionUpdate = new Position(
        nome? nome : position.nome, 
        setor? setor : position.setor, 
        salario? salario : position.salario
    )

    await db("cargo").update(positionUpdate).where({ "idCargo": id });
    return res.status(200).json(positionUpdate);

}


//Delete
const Delete = async (req, res)=>{
    const { id } = req.params;

    const position = await db("cargo").where({ "idCargo": id }).first()
    
    let success = await db("cargo").where({ "idCargo": id }).del();

    if(success) {
        return res.status(200).json({"success" : "position "+position.nome+" deleted sucessfull"});
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