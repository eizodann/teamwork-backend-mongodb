const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  console.log(err.red);

  let error = { ...err };
  error.message = err.message;

  //   mongoose error bad objectId
  if (err.name === "CastError") {
    const message = `Resource with id ${error.value} was not found`;
    error = new ErrorResponse(message, 404);
  }

  //   mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }
  res
    .status(error.statusCode || 500)
    .json({ sucess: false, error: error.message || "Server Error" });
};

module.exports = errorHandler;
