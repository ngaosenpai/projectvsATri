const router = require("express").Router()
const Multer = require('multer');
//multer configure
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
  }
});
const controller = require("../controllers/admin.controller")
router.get("/", controller.index)
router.get("/:page", controller.index2)
router.post("/:key", multer.array("files", 2), controller.exec)
module.exports = router