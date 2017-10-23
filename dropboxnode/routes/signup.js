var express = require('express');
var router = express.Router();

var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/demo";

router.post('/', (req,res,next)=>{
    var username=req.body.username;
    var password=req.body.password;
    var firstname=req.body.firstname;
    var lastname=req.body.lastname;
    console.log("email:",username);
    try {
        mongo.connect(mongoURL, function(){
            console.log('Connected to mongo at: ' + mongoURL);
            var coll = mongo.collection('login');

            coll.findOne({"loginData.username":username}, function(err, user){
                if (user) {
                    console.log("User is: "+user);
                    return res.status(202).send({"message":"User exists"});
                } else {
                    coll.insert({
                        loginData:{username:username,password:password},
                        personalData:{firstname:firstname,lastname:lastname},
                    });
                    return res.status(201).send({"message":"Signup Successful"});
                }
            });
        });

    }
    catch (e){
        console.log("error in insertion");
    }
});

module.exports = router; 