const express = require("express");
const router = express.Router();

const _userController = require("../controllers/users/users-controllers");

router
  .get("/usuarios", _userController.getUsers)
  .post("/usuarios", _userController.CreateUsers)
  .get("/usuarios/excel", _userController.crearInformeDePersonas);

module.exports = router;