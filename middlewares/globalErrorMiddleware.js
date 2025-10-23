const { ApiError } = require("./ApiError");

exports.globalErrorMiddleware = (err, req, res, next) => {
  console.log(err);
  //   winston.error(err.message, err);
  if (err instanceof ApiError) {
    return res.status(err.status_code).json({
      message: err.message,
      status: err.status,
      status_code: err.status_code,
      error_code: err.error_code,
      // errors: err.errors
    });
  }

  res.status(500).json({
    message:
      (Array.isArray(err?.errors) && err?.errors[0]?.message) || err?.message,
    status: "fail",
    status_code: 500,
    error_code: "INTERNAL_SERVER_ERROR",
    // errors: []
  });
};
