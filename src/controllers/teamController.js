const bcrypt = require("bcrypt");
const db = require('../database')
const Team = require('../model/teamModel')

//READ ALL
const Index = async (req, res) => {
    const allTeams = await db("equipe");
    return res.status(200).json({allTeams});
}

//READ
const Get = async (req, res) => {

    const { id: idE } = req.params;
    const team = await db("equipe").where({ "idE": idE }).first()
    if(team)
        return res.status(200).json(team);
    return res.status(404).json({"error": "team not found"});
}

//Create
const Create = async (req, res) => {
    let {nome} = req.body;
    const isAlreadyTeamInDB = await db("equipe").where({ "nome": nome }).first()
    
    if (isAlreadyTeamInDB) {
        return res.status(500).json({"error": "this name is already in use"});
    }
    
        team = new Team(nome);
    
    let teamInserted = await db('equipe').insert(team);
    res.status(200).json({teamInserted});
}

//Update
const Update = async (req, res) => {
    let {nome} = req.body;
    const { id } = req.params;
    const team = await db("equipe").where({ "idE": id }).first()

    if(!team) 
        res.status(404).json({"error": "team not found"});

    let teamUpdate = new Team(
        nome
    )

    await db("equipe").update(teamUpdate).where({ "idE": id });
    return res.status(200).json(teamUpdate);

}


//Delete
const Delete = async (req, res)=>{
    const { id } = req.params;

    const team = await db("equipe").where({ "idE": id }).first()
    
    let success = await db("equipe").where({ "idE": id }).del();

    if(success) {
        return res.status(200).json({"success" : "team "+team.nome+" deleted sucessfull"});
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