const { query, validationResult, param, body } = require('express-validator')
const HttpCodes = require('http-codes')


const validateRequest = ({ validParams = [], validBodyFields = [], validQueryFields = [] }) => {
  return (req, res, next) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ApiError(errors.array()[0]?.msg, HttpCodes.BAD_REQUEST, "INVALID_REQ_DATA")
    }

    // Ensure only the specified fields are present
    const extraParams = Object.keys(req.params).filter(key => !validParams.includes(key));
    const extraBodyFields = Object.keys(req.body).filter(key => !validBodyFields.includes(key));
    const extraQueryFields = Object.keys(req.query).filter(key => !validQueryFields.includes(key));

    if (extraParams.length || extraBodyFields.length || extraQueryFields.length) {
      const errorMessage = [
        extraParams.length ? `Unexpected params: ${extraParams.join(', ')}` : null,
        extraBodyFields.length ? `Unexpected body fields: ${extraBodyFields.join(', ')}` : null,
        extraQueryFields.length ? `Unexpected query fields: ${extraQueryFields.join(', ')}` : null
      ].filter(Boolean).join('; ');

      throw new ApiError(errorMessage, HttpCodes.BAD_REQUEST, "INVALID_REQ_DATA");
    }

    next();
  };
};
module.exports = { validateRequest };