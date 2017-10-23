var express = require('express');
var router = express.Router();

router.post('/', (req,res,next)=>{
    req.session.destroy();
    console.log('Session Destroyed');
    res.status(201).send();
});

module.exports = router; 