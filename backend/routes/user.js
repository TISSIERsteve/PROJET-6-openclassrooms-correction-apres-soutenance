const express = require("express")
const router = express.Router()
const userCtrl = require("../controller/user")

// ========================================= ROUTES ====================================================
router.post("/signup", userCtrl.signup) // Route pour créer un user
router.post("/login", userCtrl.login) // Route pour connecter user


module.exports = router