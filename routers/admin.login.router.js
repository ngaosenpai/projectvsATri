const router = require("express").Router()

const controller = require("../controllers/login.controller")
const validator = require("../middlewares/validate.login")


router.get("/", controller.index);

router.post("/", validator.validate, controller.pass)


module.exports = router