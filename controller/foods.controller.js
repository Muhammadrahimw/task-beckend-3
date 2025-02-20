const {read} = require("../utils/fs");
const {ResData} = require("../utils/res-helpers");

const getAll = (req, res) => {
	const resData = new ResData(200, `success`, read(`foods`));
	res.status(resData.status).json(resData);
};

const getById = (req, res) => {
	const {id} = req.params;
	const findData = read(`foods`).find((food) => food.id == id);
	if (!findData) {
		return res.status(404).json({message: `Not found`});
	}
	const resData = new ResData(200, `success`, findData);

	res.status(resData.status).json(resData);
};

const post = (req, res) => {
	const {name, category, calories, price} = req.body;
	if (!name || !category || !calories || !price) {
		return res
			.status(400)
			.json({message: `name, category, calories and price are required`});
	}

	let data = read(`foods`);
	data.push({
		id: data.length ? data.length + 1 : 1,
		...req.body,
	});
	write(`foods`, data);
	const resData = new ResData(200, `success`, {
		...req.body,
	});
	res.status(resData.status).json(resData);
};

const deleteById = (req, res) => {
	const {id} = req.params;
	const newData = read(`foods`).find((food) => food.id == id);
	if (!newData) {
		return res.status(404).json({message: `Not found`});
	}
	let data = read(`foods`).filter((food) => food.id != id);
	write(`foods`, data);
	const resData = new ResData(200, `success deleted`);
	res.status(resData.status).json(resData);
};

const put = (req, res) => {
	const {id} = req.params;
	const body = req.body;
	if (!read(`foods`).find((flower) => flower.id == id)) {
		return res.status(404).json({message: `Not found`});
	}
	const data = read(`foods`).map((food) =>
		food.id == id ? {...food, ...body} : food
	);
	write(`foods`, data);
	const resData = new ResData(201, `success updated`);
	res.status(resData.status).json(resData);
};

module.exports = {getAll, getById, post, deleteById, put};
