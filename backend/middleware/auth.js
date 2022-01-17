const jwt = require("jsonwebtoken") // Je vérifie les token 

// Vérification du token s'il correspond
module.exports = (req, res, next) => {
    try {

        const token = req.headers.authorization.split(' ')[1]

        const decodeToken = jwt.verify(token, `${process.env.JWT_SECRET}`)

        const userId = decodeToken.userId

        if (req.body.userId && req.body.userId !== userId) {
            throw "User ID non valable !" // Erreur si correspond pas
        } else {

            next()
        }
        // Problème si autre erreur
    } catch (error) {
        res.status(401).json({ error: error | "Requête non authentifiéé" })
    }
}