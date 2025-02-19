const {CustomError} = require("../utils/res-helpers");

const checkId = (req, res, next) => {
	try {
		const {id} = req.params;
		if (isNaN(Number(id))) {
			throw new CustomError(404, "Id not defined or id not a number");
		}
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = {checkId};
