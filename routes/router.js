const {Router} = require("express");
const router2 = require("./foods/router");
const router3 = require("./users/router");
const router = Router();
router.use(router2);
router.use(router3);

module.exports = router;
