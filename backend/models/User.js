const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

// ===================================== NOUVEL UTILISATEUR ============================================
// Authenfication utilisateur 
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        // match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Veuillez entrer une adresse email correcte"]
    },
    password: {
        type: String,
        required: [true, "Veuillez choisir un mot de passe"]
    }
})


userSchema.plugin(uniqueValidator)

// J'exporte le schéma pour être utilsé pour vérification
module.exports = mongoose.model("User", userSchema)