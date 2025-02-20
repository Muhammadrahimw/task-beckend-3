const {Router} = require("express");
const {signIn, getUser} = require("../../controller/users.controller");
const router = Router();
router.post("/sign-in", signIn);
router.post("/get-user", getUser);

module.exports = router;
