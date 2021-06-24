const bcrypt = require("bcrypt");
const db = require('../database')
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');

const Login = async (req, res) => {
    let { email, senha } = req.body;

    const user = await db("usuario").where({ "email": email }).first()

    if (!user) {
        res.status(404).json({ message: 'Usuario não encontrado' });
    }

    const isCorrect = await bcrypt.compare(senha, user.senha)

    if (!isCorrect) {
        res.status(401).json({ "error": "password is incorrect" });
    }

    let tokenSecret = process.env.TOKEN_SECRET;

    const token = jwt.sign({}, tokenSecret, { subject: `${user.idU}`});

    res.status(200).json({ auth: true, token: token });
}
module.exports = {
    Login
}