const jwt = require("jsonwebtoken");
const cookies = require("cookie-parser");
const jwtConfig = require("../config/jwt.config");
const sendResponse = require("../helpers/requestHandler.helper");

const generateJwt = async (payload) => {
  return jwt.sign(payload, jwtConfig.JWT_SECRET, {
    expiresIn: `${jwtConfig.JWT_EXPIRE_TIME}${jwtConfig.JWT_EXPIRE_TIME_UNIT}`,
  });
};

const verifyToken = async (token, refreshToken = false) => {
  if (refreshToken) {
    return jwt.verify(token, jwtConfig.JWT_REFRESH_TOKEN_SECRET);
  }

  return jwt.verify(token, jwtConfig.JWT_SECRET);
};

// const authorization = (req, res, next) =>{
//   const token = req.session.jwt;
//   if(!token){
//     return res.sendStatus(403);
//   }
  
// }

module.exports = {
  generateJwt,
  verifyToken,
};