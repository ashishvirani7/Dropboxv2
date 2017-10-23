var express = require('express');
var router = express.Router();
var passport = require('passport');
require('./passport')(passport);

router.post('/', (req,res,next)=>{
    passport.authenticate('login', function(err, user) {
        if(err) {
            res.status(500).send();
        }

        if(!user) {
            res.status(401).send();
        }
        else{
            req.session.username = user.loginData.username;
            req.session.cookie.maxAge = 30 * 60 * 1000;

            console.log("session initilized");
            return res.status(201).send(user);
        }
    })(req, res);
});

module.exports = router; 