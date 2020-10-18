const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
   let hbsObject = {
      title: "login-admin"
   }
   res.render('admin-login', hbsObject)
});

router.get('/admin-login', (req, res) => {
   // if not logedin redirected to /
   res.end('login get');
});

router.post('/admin-login', (req, res) => {
   console.log('getting post req');
   console.dir(req.body);
   res.end('working  ' + req.body.email);
});

module.exports = router;