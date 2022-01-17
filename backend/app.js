const express = require("express") // Besoin express pour fonctionner
const app = express()
const path = require("path")

app.use(express.urlencoded({ extended: true })) //Middleware permet de passer des requêtes 

app.use(express.json()) // Accéder au corps de la requête en json avec req.body

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Indique les ressources qui peuvent être partager
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // Indique les méthodes autorisées pour les requêtes http
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    // Autorise le serveur à fournir les scripts pour la page
    next();
});

app.use("/images", express.static(path.join(__dirname, "images"))) // Création d'une sauce dans la base de donnée

// ============================== DECLARATION DE MES ROUTES ============================================
const userRoutes = require("./routes/user") // Importer routes user
const saucesRoutes = require("./routes/sauces") // Importer route création sauce

// Enregistrer les routes avec leur chemin
app.use("/api/auth", userRoutes) // Route connection ou authentification utilisateur
app.use("/api/sauces", saucesRoutes) // Route sauces

module.exports = app