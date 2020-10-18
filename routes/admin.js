const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
   let hbsObject = {
      title: "login-admin"
   }
   res.render('admin-login', hbsObject)
});

module.exports = router;