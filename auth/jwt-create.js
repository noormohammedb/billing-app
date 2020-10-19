if (process.env.NODE_ENV === "development") {
   // console.log("Environment Development Detected!");
   const env = require('dotenv').config('../')
   // console.log(env.parsed);
}
const jwt = require('jsonwebtoken');
function signData(data) {
   // console.log(data);
   const token = jwt.sign(data, process.env.SECRET, { expiresIn: '1h' });
   return token;
}

module.exports = { signData };