const Sauce = require("../models/Sauce")

// =========================================== LIKE =====================================================
exports.createLike = (req, res) => {
    Sauce.findOne({
        _id: req.params.id
    })
        .then(sauce => {
            // Si like aime
            if (req.body.like === 1) {
                if (!sauce.userLiked.includes(req.body.userId) && (!sauce.userDisliked.includes(req.body.userId))) {

                    sauce.likes++
                    sauce.userLiked.push(req.body.userId)
                    console.log("J'aime");
                    sauce.save()

                }
            }
            // si like n'aime pas
            else if (req.body.like === -1) {
                if (!sauce.userLiked.includes(req.body.userId) && (!sauce.userDisliked.includes(req.body.userId))) {

                    sauce.dislikes++
                    sauce.userDisliked.push((req.body.userId))
                    console.log("J'aime pas");
                    sauce.save()
                }
            }
            // Si annule son like
            if (req.body.like === 0) {
                if (sauce.userLiked.indexOf(req.body.userId) != -1) {
                    sauce.likes--
                    sauce.userLiked.splice(sauce.userLiked.indexOf(req.body.userId), 1)
                } else {
                    sauce.dislikes--
                    sauce.userDisliked.splice(sauce.userDisliked.indexOf(req.body.userId), 1)
                }
                sauce.save()
            }
            return res.status(200).json({ message: "Like ajouter" })
        })
        .catch(error => {
            console.log(error);
            console.log("like refuser");
            return res.status(500).json({ message: "erreur sur le like" })
        })
}