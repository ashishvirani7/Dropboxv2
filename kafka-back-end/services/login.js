var mongo = require("./mongo");
var bcrypt = require('bcrypt');
var CryptoJS = require("crypto-js");
var mongoURL = "mongodb://localhost:27017/dropbox";

function handle_request(msg, callback){

    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));

    // With Connection Pooling

    // mongo.getConnection((connectionNumber,db)=>{
    //         console.log("no.: "+connectionNumber);
    //         const loginCollectionName = 'login'; 
    //         const loginCollection = db.collection(loginCollectionName);
    //         const personalCollectionName = 'user'; 
    //         const personalCollection = db.collection(personalCollectionName);
    //         const username=msg.username;
    //         var password=msg.password;
    //         var userid;
    //         var response={};
    //         var bytes  = CryptoJS.AES.decrypt(password.toString(), "ashish7");
    //         password = bytes.toString(CryptoJS.enc.Utf8);

    //         loginCollection.findOne({"username":username}, function(err, loginData){

    //             if(loginData){
    //                 var dbPassword = loginData.password;
    //                 bcrypt.compare(password, dbPassword).then(function(result) {
    //                     if(result){
    //                         userid=loginData.userid;  
    //                         personalCollection.findOne({"userid":userid}, function(err, personalData){
    //                             if (personalData) {
    //                                 response={
    //                                     loginData,
    //                                     personalData,
    //                                 };
    //                                 res.code="201";
    //                                 res.data=response;
    //                                 callback(null, res);
    //                             }
    //                         mongo.releaseConnection(connectionNumber,db);
    //                         });
    //                     }
    //                     else{
    //                         mongo.releaseConnection(connectionNumber,db);
    //                         res.code="401";
    //                         res.data=null;
    //                         callback(null, res);
    //                     }
    //                 });
    //             }
    //             else{
    //                         mongo.releaseConnection(connectionNumber,db);
    //                         res.code="401";
    //                         res.data=null;
    //                         callback(null, res);
    //                     }
    //         });
    //         mongo.releaseConnection(connectionNumber,db);
    //     });

    // Without connection Pooling

        mongo.connect(mongoURL,(db)=>{
            const loginCollectionName = 'login'; 
            const loginCollection = db.collection(loginCollectionName);
            const personalCollectionName = 'user'; 
            const personalCollection = db.collection(personalCollectionName);
            const username=msg.username;
            var password=msg.password;
            var userid;
            var response={};
            var bytes  = CryptoJS.AES.decrypt(password.toString(), "ashish7");
            password = bytes.toString(CryptoJS.enc.Utf8);

            loginCollection.findOne({"username":username}, function(err, loginData){

                if(loginData){
                    var dbPassword = loginData.password;
                    bcrypt.compare(password, dbPassword).then(function(result) {
                        if(result){
                            userid=loginData.userid;  
                            personalCollection.findOne({"userid":userid}, function(err, personalData){
                                if (personalData) {
                                    response={
                                        loginData,
                                        personalData,
                                    };
                                    res.code="201";
                                    res.data=response;
                                    callback(null, res);
                                }
                
                            });
                        }
                        else{
                        
                            res.code="401";
                            res.data=null;
                            callback(null, res);
                        }
                    });
                }
                else{
                            res.code="401";
                            res.data=null;
                            callback(null, res);
                        }
            });
            
        });
            
}

exports.handle_request = handle_request;