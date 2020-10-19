if (process.env.NODE_ENV === "development") {
   // console.log("Environment Development Detected!");
   const env = require('dotenv').config('../')
   // console.log(env.parsed);
}

const jwt = require('jsonwebtoken');

function verifyData(req, res, next) {
   const token = req.cookies.authorization;
   // console.log(token);
   try {
      const jwtData = jwt.verify(token, process.env.SECRET)
      console.log(jwtData);
      req.isVerified = true;
      req.verification = jwtData
   } catch (e) {
      req.isVarified = false;
      console.log('jwt varification error');
   } finally {
      next();
   }
}


module.exports = { verifyData }