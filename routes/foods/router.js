const express = require("express");
const {checkId} = require("../../middleware/checkid.middleware");
const {
	getAll,
	getById,
	post,
	deleteById,
	put,
} = require("../../controller/foods.controller");

const router = express.Router();
router.get(`/foods`, getAll);
router.get(`/foods/:id`, checkId, getById);
router.post(`/foods`, post);
router.delete(`/foods/:id`, checkId, deleteById);
router.put(`/foods/:id`, checkId, put);

module.exports = router;
