const router = require("express").Router()
const controller = require("../controllers/admin.controller")
router.get("/", controller.index)

module.exports = router