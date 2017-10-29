var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/dropbox";
var autoIncrement = require("mongodb-autoincrement");
var mkdirp = require('mkdirp');

function handle_request(msg, callback){

    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));

    // Without Connection Pooling
    try {
        mongo.connect(mongoURL, function(db){
        console.log('Connected to mongo at: ' + mongoURL);
        const loginCollectionName = 'login'; 
        const loginCollection = db.collection(loginCollectionName);
        const personalCollectionName = 'user'; 
        const personalCollection = db.collection(personalCollectionName);
        const username=msg.username;
        const password=msg.password;
        const firstname=msg.firstname;
        const lastname=msg.lastname;

        loginCollection.findOne({"username":username}, function(err, user){
            if (user) {
                console.log("User is: "+user);

                //return res.status(202).send({"message":"User exists"});
                res.code="202";
                res.data="User Exists";
                callback(null,res);
            } 
            else {
                autoIncrement.getNextSequence(db, loginCollectionName, function (err, autoIndex) {
                    
                    loginCollection.insert({
                        userid: autoIndex+'',
                        username:username,
                        password:password,
                    });
                    personalCollection.insert({
                        userid: autoIndex+'',
                        firstname,
                        lastname,
                    });
                    var dir = './UserFiles/'+autoIndex; 
                    var homedir = './UserFiles/'+autoIndex+'/home'; 
                    mkdirp('./UserFiles/', function(err){
                        mkdirp(dir, function (err) {
                            if (err) console.error(err)
                            else{
                                mkdirp(homedir,(err) =>{
                                    console.log("created!");
                                });
                            }
                        });
                    });
                });
                //return res.status(201).send({"message":"Signup Successful"});
                res.code="201";
                res.data="Signup Successful";
                callback(null,res);
            }
        });
    });

    }
    catch (e){
            console.log("error in insertion");
        }
        
}


exports.handle_request = handle_request;