const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const {ResData, CustomError} = require("./utils/res-helpers");
const router = require("./routes/router");
const {verifyMiddleware} = require("./middleware/verify.middleware");

app.use(express.json());
app.use(router);

dotenv.config();
const PORT = process.env.PORT || 5000;
app.use(cors());

app.use(verifyMiddleware);

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
