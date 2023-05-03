const UnauthorizedError = require("../errors/unauthorized");
const usersService = require("../api/users/users.service");
const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      throw "not token";
    }

    const decoded = jwt.verify(token, config.secretJwtToken);
    req.user = await usersService.get(decoded.userId);
    
    next();
  } catch (message) {
    next(new UnauthorizedError(message));
  }
};
