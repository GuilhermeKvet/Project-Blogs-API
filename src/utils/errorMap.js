const errorMap = {
  INVALID_VALUE: 400,
  INVALID_USER: 401,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};