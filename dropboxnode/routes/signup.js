var express = require('express');
var autoIncrement = require("mongodb-autoincrement");
var router = express.Router();

var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/dropbox";

router.post('/', (req,res,next)=>{
    var username=req.body.username;
    var password=req.body.password;
    var firstname=req.body.firstname;
    var lastname=req.body.lastname;
    console.log("email:",username);
    // try {
    //         mongo.getConnection((connectionNumber,db)=>{
    //         const loginCollectionName = 'login'; 
    //         const loginCollection = db.collection(loginCollectionName);
    //         const personalCollectionName = 'user'; 
    //         const personalCollection = db.collection(personalCollectionName);

    //         loginCollection.findOne({"username":username}, function(err, user){
    //             if (user) {
    //                 console.log("User is: "+user);
    //                 return res.status(202).send({"message":"User exists"});
    //             } 
    //             else {
    //                 autoIncrement.getNextSequence(db, loginCollectionName, function (err, autoIndex) {
    //                     loginCollection.insert({
    //                         _id: autoIndex,
    //                         username:username,
    //                         password:password,
    //                     });
    //                     personalCollection.insert({
    //                         _id: autoIndex,
    //                         firstname,
    //                         lastname,
    //                     });
                    
    //                 });
    //                 return res.status(201).send({"message":"Signup Successful"});
    //             }
    //         });
    //     });
    //
    // }
    // catch (e){
    //     console.log("error in insertion");
    // }


// Without Connection Pooling
try {
    mongo.connect(mongoURL, function(db){
    console.log('Connected to mongo at: ' + mongoURL);
    const loginCollectionName = 'login'; 
    const loginCollection = db.collection(loginCollectionName);
    const personalCollectionName = 'user'; 
    const personalCollection = db.collection(personalCollectionName);

    loginCollection.findOne({"username":username}, function(err, user){
        if (user) {
            console.log("User is: "+user);
            return res.status(202).send({"message":"User exists"});
        } 
        else {
            autoIncrement.getNextSequence(db, loginCollectionName, function (err, autoIndex) {
                
                loginCollection.insert({
                    _id: autoIndex,
                    username:username,
                    password:password,
                });
                personalCollection.insert({
                    _id: autoIndex,
                    firstname,
                    lastname,
                });
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