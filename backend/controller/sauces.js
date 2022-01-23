const Sauce = require("../models/Sauce") // Je récupère mon model sauce
const fs = require("fs") // Permet de gérer le télèchargements et la modification du produit 

// ======================================= CREATION SAUCE ==============================================
exports.createSauce = (req, res, next) => {

    // Je stocke les données dans une const
    const sauceObject = JSON.parse(req.body.sauce)
    // Je supprime id généré automatiquement on gardera celui crée par mongo db
    delete sauceObject._id
    // On crée virtuellement une instance sauce 
    const sauce = new Sauce({
        ...sauceObject,
        // On modifie url en la rendant dynamique
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    })
    // J'enregistre avec save
    sauce.save()
        // Réponse du front
        .then(() => res.status(201).json({ message: "Sauce enregistrée" }))
        // Erreur si problème
        .catch(error => res.status(400).json({ error }))
}

// ====================================== RECUPERER TOUTES LES SAUCES ==========================================
exports.getAllSauces = (req, res, next) => {
    // On utilise la méthode find pour obtenir la liste complète de la base de donnée
    Sauce.find()
        // Si bon
        .then(sauces => res.status(200).json(sauces))
        // Si erreur
        .catch(error => res.status(400).json({ error }))
}

// ================================ RECUPERER SAUCE PAR SON ID ==========================================
exports.getOneSauce = (req, res, next) => {
    // On utilise la méthode findone et on veut id sauce 
    Sauce.findOne({
        _id: req.params.id
    })
        // Si bon
        .then(sauce => res.status(200).json(sauce))
        // Si erreur
        .catch(error => res.status(400).json({ error }))
}

// ===================================== SUPPRIMER SAUCE=================================================
exports.deleteSauce = (req, res, next) => {
    // Je vais chercher le fichier en question avec son id dans la base de donnée
    Sauce.findOne({ _id: req.params.id })
        // Une fois trouvé extraire le nom du fichier à supprimer
        .then((sauce) => {
            // Je récupère le fichier précis avec son imageUrl
            const filename = sauce.imageUrl.split("/images/")[1]; //supprimer une seule image
            // J'appel unlink pour supprimer un fichier
            fs.unlink(`images/${filename}`, (error) => {
                console.log(error)
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: "Sauce supprimé !" }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};
// ======================================= MODIFIER =====================================================
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        } : { ...req.body }

    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })

        .then(() => res.status(200).json({ message: 'Objet modifié' }))
        .catch(error => res.status(400).json({ error }))

}



