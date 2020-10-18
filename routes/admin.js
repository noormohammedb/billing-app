const express = require('express');
const router = express.Router();

const { adminLogin } = require('../db_files/db_operations')

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
   // console.log(db_data.length);
   if (!db_data.length) {
      console.log('no data', db_data.length);
      res.status(400).send('no user found')
   } else if (db_data[0].password === searchData.password) {
      console.log('password matched');
      res.status(200).send('loged in').end();
   } else {
      console.log('password Missmatch');
      res.status(400).send('Password Missmatch').end();
   }

   res.end(`working  ${searchData.email}     ${searchData.password} `);
});

module.exports = router;