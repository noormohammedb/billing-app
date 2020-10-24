const express = require('express');
const router = express.Router();

const { signData } = require('../auth/jwt-create');
const { verifyData } = require('../auth/jwt-varify');
const { adminLogin, pushUserData, getUserData } = require('../db_files/db_operations')

/* Dummy data for table */
const userData = require('../dummyData');

router.get('/', verifyData, (req, res) => {
   if (req.isVerified) res.redirect('/admin/dashboard')
   let hbsObject = {
      title: "login-admin"
   }
   res.render('admin-login', hbsObject)
});

router.get('/dashboard', verifyData, async (req, res) => {
   let hbsObject = {
      title: "admin-dashbord"
   };
   if (req.isVerified) {

      let uData = await getUserData();
      console.log(uData, 'send to client');
      // res.send(uData)


      // hbsObject.name = req.verification.name;
      hbsObject.userList = uData
      // console.log(hbsObject);
   }
   res.render('admin-dashbord', hbsObject)
});

router.get('/add-user', verifyData, (req, res) => {
   let hbsObject = {
      title: 'admin add-user'
   };
   if (req.isVerified) {
      res.render('admin-add-user', hbsObject);
   } else {
      res.end('404 jwt error ')
   }
});

router.post('/add-user', verifyData, async (req, res) => {
   // let hbsObject = {
   //    title: 'admin add-user'
   // };
   // res.render('admin-add-user', hbsObject);
   if (req.isVerified) {
      const dbResult = await pushUserData(req.body)
      console.log(dbResult.insertedId);
      res.send(dbResult)
   }
   // res.send(req.body)
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
      let JwtSign = { name: db_data[0].name, id: db_data[0]._id.toString() }
      // console.dir(JwtSign);
      // console.log("  <- sign data");
      const token = signData(JwtSign);
      res.cookie('authorization', `${token}`, { expires: new Date(Date.now() + 3600000), httpOnly: true, encode: String })
      // res.redirect('/admin/dashboard')
      res.status(200).send(`loged in  ${token} `).end();
   } else {
      console.log('password Missmatch');
      res.status(400).send('Password Missmatch').end();
   }

   res.end(`working  ${searchData.email}     ${searchData.password} `);
});

module.exports = router;