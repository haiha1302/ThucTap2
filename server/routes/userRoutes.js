const express = require("express");
const { UsersController } = require("../controllers/userController");

const route = express.Router();

route.post("/register", UsersController.register);

route.post("/verify", UsersController.verifyAcc);

route.post("/login", UsersController.login);

route.post("/logout", UsersController.logout);

route.post('/upload-avatar', UsersController.uploadAvatar)

route.get('/check-user', UsersController.checkUser)

route.put('/update-infor', UsersController.updateInfor)

module.exports = route;
