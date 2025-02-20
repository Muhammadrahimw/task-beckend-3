const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const {ResData, CustomError} = require("./utils/res-helpers");
const router = require("./routes/router");
const {verifyMiddleware} = require("./middleware/verify.middleware");

dotenv.config();
const PORT = process.env.PORT || 6060;

app.use(express.json());
app.use(cors());

app.use(router);

app.use((req, res, next) => {
	next(new CustomError(404, `This ${req.url} page not found`));
});

app.use((error, req, res, next) => {
	if (res.headersSent) return next(error);

	const statusCode = error.status || 500;
	const resData = new ResData(statusCode, error.message);
	res.status(statusCode).json(resData);
});

app.listen(PORT, () => {
	console.log(`Server run: http://localhost:${PORT}`);
});
