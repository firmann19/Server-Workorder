// import http-status-codes
const { StatucCodes, StatusCodes } = require("http-status-codes");
// import custom-api
const CustomAPIError = require("./custom-api-error");

class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    // memberikan statusCode bad request
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
module.exports = BadRequestError;