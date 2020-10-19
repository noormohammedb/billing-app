const express = require('express');
const router = express.Router();

const { adminLogin } = require('../db_files/db_operations')
const { signData } = require('../auth/jwt-create');

router.get('/', (req, res) => {
   let hbsObject = {
      title: "login-admin"
   }
   res.render('admin-login', hbsObject)
});

router.get('/admin-login', (req, res) => {
   // if not logedin redirected to /
   // res.end('login get');
   res.redirect('/admin')
});

router.post('/admin-login', async (req, res) => {
   console.dir(req.body);
   let searchData = {
      email: req.body.email,
      password: req.body.password
   };
   let db_data = await adminLogin(searchData);
   console.log(db_data);
   let JwtSign = { name: db_data[0].name, id: db_data[0]._id.toString() }
   console.dir(JwtSign);
   console.log("  <- sign data");
   // console.log(db_data.length);
   if (!db_data.length) {
      console.log('no data', db_data.length);
      res.status(400).send('no user found')
   } else if (db_data[0].password === searchData.password) {
      console.log('password matched');
      const token = signData(db_data[0]);
      res.cookie('authorization', `${token}`, { expires: new Date(Date.now() + 3600000), httpOnly: true, encode: String })
      res.status(200).send(`loged in  ${token} `).end();
   } else {
      console.log('password Missmatch');
      res.status(400).send('Password Missmatch').end();
   }

   res.end(`working  ${searchData.email}     ${searchData.password} `);
});

module.exports = router;