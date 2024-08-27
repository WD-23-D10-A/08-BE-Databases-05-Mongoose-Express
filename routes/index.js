const express = require("express");
const router = express.Router();
const listController = require("../controllers/listControllers");

router.get("/", listController.getItems);
router.post("/", listController.addItems);
router.delete("/delete", listController.deleteItems);
router.get("/work", listController.getWorkPage);

module.exports = router;
