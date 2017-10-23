var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/demo";

module.exports = function(passport) {
    passport.use('login', new LocalStrategy(function(username,password, done) {
        try {
            console.log("hey");
            mongo.connect(mongoURL, function(){
                console.log('Connected to mongo at: ' + mongoURL);
                var coll = mongo.collection('login');

                coll.findOne({"loginData":{username: username, password:password}}, function(err, user){
                    if (user) {
                        var response={};
                        response={
                            ...user,
                            "loginData":{username:user.loginData.username},
                        };
                        done(null, response);

                    } else {
                        console.log("success");
                        done(null, false);
                    }
                });
            });
        }
        catch (e){
            done(e,{});
        }
    }));
};


