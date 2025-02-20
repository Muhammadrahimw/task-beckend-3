const express = require("express");
const {checkId} = require("../../middleware/checkid.middleware");
const {
	getAll,
	getById,
	post,
	deleteById,
	put,
} = require("../../controller/foods.controller");
const {verifyMiddleware} = require("../../middleware/verify.middleware");

const router = express.Router();
router.get(`/foods`, verifyMiddleware, getAll);
router.get(`/foods/:id`, checkId, verifyMiddleware, getById);
router.post(`/foods`, post);
router.delete(`/foods/:id`, checkId, verifyMiddleware, deleteById);
router.put(`/foods/:id`, checkId, verifyMiddleware, put);

module.exports = router;
