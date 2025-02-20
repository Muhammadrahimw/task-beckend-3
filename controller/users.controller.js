const {read} = require("../utils/fs");
const {signInJwt} = require("../utils/JWT.JS");
const {CustomError, ResData} = require("../utils/res-helpers");

const signIn = (req, res, next) => {
	try {
		const {email, password} = req.body;

		if (!email || !password) {
			throw new CustomError(200, "email or password must be");
		}
		const findUser = read("users").find(
			(user) => user.email === email && user.password === password
		);
		if (!findUser) {
			throw new CustomError(404, "Email or password is wrong");
		}
		let token = signInJwt({id: findUser.id});
		const resData = new ResData(200, "success", {...findUser, token});
		res.status(resData.status).json(resData);
	} catch (error) {
		next(error);
	}
};

const getUser = (req, res, next) => {
	try {
		const findUser = read("users").find((user) => user.id == req.userId);
		const resData = new ResData(200, "success", {...findUser});
		res.status(resData.status).json(resData);
		if (!findUser) {
			throw new CustomError(404, "Email or password is wrong");
		}
	} catch (error) {
		next(error);
	}
};

module.exports = {signIn, getUser};
