const jwt = require("jsonwebtoken");
const {CustomError} = require("../utils/res-helpers");

const verifyMiddleware = (req, res, next) => {
	try {
		const authorization = req.headers.authorization;
		if (!authorization) {
			throw new CustomError(404, "Access token not defined");
		}
		const token = authorization.split(" ")[1];

		jwt.verify(token, process.env.SECRET_KEY, (errors, encode) => {
			if (errors instanceof jwt.JsonWebTokenError) {
				throw new CustomError(403, "Token invalid");
			}
			if (errors instanceof jwt.TokenExpiredError) {
				throw new CustomError(403, "Token expired");
			}
			req.userId = encode.id;
			next();
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {verifyMiddleware};
