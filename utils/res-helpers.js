class ResData {
	constructor(status, message, data) {
		this.status = status;
		this.message = message;
		if (data !== undefined) {
			this.data = data;
		}
	}
}

class CustomError extends Error {
	constructor(status, message) {
		super(message);
		this.status = status;
	}
}

module.exports = {ResData, CustomError};
