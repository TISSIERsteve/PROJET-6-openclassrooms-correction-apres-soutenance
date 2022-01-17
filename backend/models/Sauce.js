const mongoose = require("mongoose")

// Création d'un schéma pour les enregistrements des sauces dans la bases de données
const sauceSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    mainPepper: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    heat: {
        type: Number,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    userLiked: {
        type: [String]
    },
    userDisliked: {
        type: [String]
    }
})

// J'exporte le schéma pour être utilsé pour vérification
module.exports = mongoose.model("Sauce", sauceSchema)