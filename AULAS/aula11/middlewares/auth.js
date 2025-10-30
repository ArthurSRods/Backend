const jwt = require('jsonwebtoken');

function gerarToken(payload){
    try{
        const expiresIn = "5m";
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
        return token;
    } catch(err) {
        throw Error ("Erro ao gravar um token");
    }
}

function verificarToken (req, res, next){
    try {
        const { authorization } = req.headers;
        const payload = jwt.verify(authorization, process.env.JWT_SECRET);
        req.payload = payload;
        return next();
    } catch (err) {
        return res.status(401).json({ msg: "Token inválido "})
    }
}

module.exports = { gerarToken, verificarToken }