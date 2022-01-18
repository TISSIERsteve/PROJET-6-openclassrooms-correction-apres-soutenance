const mongoose = require("mongoose")  // Plugin pour se connecter à mongo DB
require("dotenv").config({ path: "./config/.env" })

// Fonction qui appel mongo db
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("MongoDB vous etes connecter avec succes");

    } catch (err) {
        console.log("MongoDB échec de la connection", err);
        process.exit(1);
    }
}

module.exports = connectDB;