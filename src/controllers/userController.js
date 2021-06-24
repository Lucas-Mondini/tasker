const bcrypt = require("bcrypt");
const db = require('../database')
const User = require('../model/userModel')

//READ ALL
const Index = async (req, res) => {
    console.log('to aqui')
    const allUsers = await db("usuario");
    return res.status(200).json({allUsers});
}

//READ
const Get = async (req, res) => {

    const { id: userId } = req.params;
    const user = await db("usuario").where({ "idU": userId }).first()
    if(user)
        return res.status(200).json(user);
    return res.status(404).json({"error": "user not found"});
}

//Create
const Create = async (req, res) => {
    let {nome, email, dataNascimento, CPF, PIS, senha, idCargo, idE} = req.body;
    const isAlreadyUserInDB = await db("usuario").where({ "email": email }).first()
    
    if (isAlreadyUserInDB) {
        return res.status(500).json({"error": "this e-mail is already in use"});
    }
    
    let hash = await bcrypt.hash(senha, 10);
    let user = null;
    if(hash) {
        user = new User(nome, email, dataNascimento, CPF, PIS, hash, idCargo, idE);
    }
    let userInserted = await db('usuario').insert(user);
    return res.status(200).json({userInserted});
}

//Update
const Update = async (req, res) => {
    let {nome, email, dataNascimento, CPF, PIS, senha, idCargo, idE, newSenha} = req.body;
    const { id } = req.params;
    const user = await db("usuario").where({ "idU": id }).first()

    if(!user) 
        res.status(404).json({"error": "user not found"});
    

    bcrypt.compare(senha, user.senha, (err, result)=> {
        if(!result)
            return res.status(401).json({"error" : "Email or password is incorrect"});
    });
        

    let userUpdate = new User(
        nome? nome : user.nome,
        email? email : user.email,
        dataNascimento? dataNascimento : user.dataNascimento,
        CPF? CPF : user.CPF,
        PIS? PIS : user.PIS,
        newSenha? await bcrypt.hash(newSenha, 10) : user.senha,
        idCargo? idCargo : user.idCargo,
        idE? idE : user.idE
    )

    await db("usuario").update(userUpdate).where({ "idU": id });
    return res.status(200).json(userUpdate);

}


//Delete
const Delete = async (req, res)=>{
    let {senha} = req.body;
    const { id } = req.params;

    const user = await db("usuario").where({ "idU": id }).first()

    if(!user) 
        res.status(404).json({"error": "user not found"});
    
    bcrypt.compare(senha, user.senha, (err, result)=> {
        if(!result)
            return res.status(401).json({"error" : "password is incorrect"});
    });
    
    let success = await db("usuario").where({ "idU": id }).del();

    if(success) {
        return res.status(200).json({"success" : "user "+user.nome+" deleted sucessfull"});
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