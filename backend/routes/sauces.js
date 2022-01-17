const express = require("express")
const router = express.Router()
const multer = require("../middleware/multer-config")

// Définir les chemins pour le router
const auth = require("../middleware/auth")
const saucesCtrl = require("../controller/sauces")
const likeCtrl = require("../controller/like")

// ======================================= CRUD ======================================================
router.post("/", auth, multer, saucesCtrl.createSauce)
router.put("/:id", auth, multer, saucesCtrl.modifySauce)
router.delete("/:id", auth, saucesCtrl.deleteSauce)
router.get("/:id", auth, saucesCtrl.getOneSauce)
router.get("/", auth, saucesCtrl.getAllSauces)
router.post("/:id/like", auth, likeCtrl.createLike)

module.exports = router