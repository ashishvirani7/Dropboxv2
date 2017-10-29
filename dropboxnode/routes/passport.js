var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/dropbox";
var kafka = require('./kafka/client');

var topic_name = "login_topic";

module.exports = function(passport) {
    passport.use('login', new LocalStrategy(function(username,password, done) {

        kafka.make_request(topic_name,{username,password}, function(err,results){
            console.log('in result');
            console.log(results);
            if(err){
                done(err,{});
            }
            else
            {
                if(results.code == 201){
                    done(null,results.data);
                }
                else {
                    done(null,false);
                }
            }
        });
        
        
    }));
};

/* Without Connection Pool */
// module.exports = function(passport) {
//     passport.use('login', new LocalStrategy(function(username,password, done) {
        
//             mongo.connect(mongoURL, function(db){
//             //mongo.getConnection((connectionNumber,db)=>{
//                 //console.log("no.: "+connectionNumber);
//                 const loginCollectionName = 'login'; 
//                 const loginCollection = db.collection(loginCollectionName);
//                 const personalCollectionName = 'user'; 
//                 const personalCollection = db.collection(personalCollectionName);
//                 var userid;
//                 var response={};

//                 loginCollection.findOne({"username":username,"password": password}, function(err, loginData){
//                     if (loginData) {
//                         console.log("user id is: "+loginData._id);
//                         userid=loginData._id;
                        
//                         personalCollection.findOne({"_id":userid}, function(err, personalData){
//                             if (personalData) {
//                                 response={
//                                     loginData,
//                                     personalData,
//                                 };
//                                 done(null, response);
//                             }
//                         //mongo.releaseConnection(connectionNumber,db);
//                         });
//                     } else {
//                         //mongo.releaseConnection(connectionNumber,db);
//                         done(null, false);
//                     }
//                 });
//             });
            
//     }));
// };


