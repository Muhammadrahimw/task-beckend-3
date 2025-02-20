const {Router} = require("express");
const {signIn, getUser} = require("../../controller/users.controller");
const {verifyMiddleware} = require("../../middleware/verify.middleware");
const router = Router();
router.post("/sign-in", signIn);
router.post("/get-user", verifyMiddleware, getUser);

module.exports = router;
