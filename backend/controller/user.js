const bcrypt = require("bcrypt") // Bcrypt crypter le mot de passe
const jwt = require("jsonwebtoken") // Permet de créer des token d'authentification 

// ===================================== NOUVEL UTILISATEUR ============================================
const User = require("../models/User")

exports.signup = (req, res, next) => {
    // Hacher le mot de passe en premier avec 10 tours d'algorithme
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            // Je récupère un nouveau user crypter
            const user = new User({
                // On met email qu'il y a dans la requête
                email: req.body.email,
                // On récupère le hash de bcrypt
                password: hash
            })

            // Enregistrer l'user crypter dans la base de donnée
            user.save()
                .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
                // Si user existe error 400
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
}

// ================================== CONNECTER UTILISATEUR EXISTANT ====================================
exports.login = (req, res, next) => {
    // Je récupère l'user 
    User.findOne({
        email: req.body.email
    })
        .then(user => {
            if (!user) {

                return res.status(401).json({ error: "Utilsateur non trouvé !" })
            }
            // Je compare le hash entrer avec le hash de la base de donnée avec bcrypt
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    // Si faux pas le bon user
                    if (!valid) {
                        return res.status(401).json({ error: "Mot de passe incorrect !" })
                    }
                    // Si c'est bon je lui renvoi status 200 avec user et token
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            `${process.env.JWT_SECRET}`,
                            { expiresIn: "24h" }
                        )
                    })
                })
                .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
};

