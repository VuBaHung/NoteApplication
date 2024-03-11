const userCtrl = require("../controllers/userCtrl");
const auth = require("../middleware/auth");
const router = require("express").Router();

//Register Router
router.get("/getuser", userCtrl.getUsers);
router.post("/register", userCtrl.registerUser);
router.post("/login", userCtrl.login);
//verify token
router.get("/verify", userCtrl.verifiedToken);

module.exports = router;
