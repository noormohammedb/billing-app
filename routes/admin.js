const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
   res.render('admin-login', {val: 'Hello World!'})
});

module.exports = router;