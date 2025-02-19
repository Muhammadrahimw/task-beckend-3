const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const {ResData, CustomError} = require("./utils/res-helpers");
const {read, write} = require("./utils/fs");
const {checkId} = require("./middleware/checkid.middleware");

dotenv.config();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.get(`/foods`, checkId, (req, res) => {
	const resData = new ResData(200, `success`, read(`foods`));

	res.status(resData.status).json(resData);
});

app.get(`/foods/:id`, checkId, (req, res) => {
	const {id} = req.params;
	const findData = read(`foods`).find((food) => food.id == id);
	if (!findData) {
		return res.status(404).json({message: `Not found`});
	}
	const resData = new ResData(200, `success`, findData);

	res.status(resData.status).json(resData);
});

app.post(`/foods`, (req, res) => {
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
});

app.delete(`/foods/:id`, checkId, (req, res) => {
	const {id} = req.params;
	const newData = read(`foods`).find((food) => food.id == id);
	if (!newData) {
		return res.status(404).json({message: `Not found`});
	}
	let data = read(`foods`).filter((food) => food.id != id);
	write(`foods`, data);
	const resData = new ResData(200, `success deleted`);
	res.status(resData.status).json(resData);
});

app.put(`/foods/:id`, checkId, (req, res) => {
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
});

app.use((req, res, next) => {
	try {
		throw new CustomError(404, `This ${req.url} page not found`);
	} catch (error) {
		next(error);
	}
});

app.use((error, req, res, next) => {
	const statusCode = error.status || 500;
	const resData = new ResData(statusCode, error.message);
	res.status(resData.status).json(resData);
});

app.listen(PORT, () => {
	console.log(`Server run: http://localhost:${PORT}`);
});
