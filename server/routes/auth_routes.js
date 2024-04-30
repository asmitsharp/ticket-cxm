const express = require("express")
const router = express.Router()
const register_controller = require("../controllers/auth/register_controllers")
const login_controller = require("../controllers/auth/login_controller")

router.post("/register", register_controller)
router.post("/login", login_controller)

module.exports = router
