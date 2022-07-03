const express = require('express'),
      router = express.Router();

const webDriverPerforms = require('../webDriverPerforms.js');

router.post('/perform-submit', async function (req, res, next) {
    
    const data = req.body;
    
    console.log(req.body);

    await webDriverPerforms()
})

module.exports = router;
