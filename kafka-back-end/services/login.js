var mongo = require("./mongo");

function handle_request(msg, callback){

    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));

    mongo.getConnection((connectionNumber,db)=>{
            console.log("no.: "+connectionNumber);
            const loginCollectionName = 'login'; 
            const loginCollection = db.collection(loginCollectionName);
            const personalCollectionName = 'user'; 
            const personalCollection = db.collection(personalCollectionName);
            const username=msg.username;
            const password=msg.password;
            var userid;
            var response={};

            loginCollection.findOne({"username":username,"password": password}, function(err, loginData){
                if (loginData) {
                    console.log("user id is: "+loginData.userid);
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
                    mongo.releaseConnection(connectionNumber,db);
                    });
                } 
                else {
                    mongo.releaseConnection(connectionNumber,db);
                    res.code="401";
                    res.data=null;
                    callback(null, res);
                }
                mongo.releaseConnection(connectionNumber);
            });
        });
            
}

exports.handle_request = handle_request;