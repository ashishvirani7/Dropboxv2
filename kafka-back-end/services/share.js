var mongo = require("./mongo");
const dateTime = require('date-time');

function handle_request(msg, callback){
    
    var res = {};
    //var req=msg.req;
    console.log("In handle request:"+ JSON.stringify(msg));
    var ownerid =  msg.ownerid;
    var content = msg.content;
    var type = msg.type;
    var email = msg.email;

    mongo.getConnection((connectionNumber,db)=>{
        const loginCollectionName = 'login'; 
        const loginCollection = db.collection(loginCollectionName);
    
        loginCollection.findOne({"username":email}, function(err, user){
            if (user) {
                const sharedFilesCollectionName = 'sharedfiles'; 
                const sharedFilesCollection = db.collection(sharedFilesCollectionName);
                const sharedFoldersCollectionName = 'sharefolders'; 
                const sharedFoldersCollection = db.collection(sharedFoldersCollectionName);

                if(type==="file"){
                    sharedFilesCollection.findOne({
                        fileid:content.fileid,
                        sharedWith:user.userid,
                    },function(err,result){
                        if(result){
                            res.code="203";
                            res.data="Already shared";
                            callback(null,res);
                        }
                        else{
                            sharedFilesCollection.insert({
                                fileid:content.fileid,
                                ownerid,
                                name:content.name,
                                path:content.path,
                                sharedWith:user.userid,
                                starred:false,
                                dateShared:dateTime(),
                            });
                            res.code="201";
                            res.data="Success";
                            callback(null,res);
                        }
                    });
                }
                else{
                    sharedFoldersCollection.findOne({
                        folderid:content.folderid,
                        sharedWith:user.userid,
                    },function(err,result){
                        if(result){
                            res.code="203";
                            res.data="Already shared";
                            callback(null,res);
                        }
                        else{
                            sharedFoldersCollection.insert({
                                folderid:content.folderid,
                                ownerid,
                                name:content.name,
                                path:content.path,
                                sharedWith:user.userid,
                                starred:false,
                                dateShared:dateTime(),
                            });
                            res.code="201";
                            res.data="Success";
                            callback(null,res);
                        }
                    });
                }
            } 
            else {
                res.code="202";
                res.data="User doesn't Exist";
                callback(null,res);
            }
            mongo.releaseConnection(connectionNumber);
        });
    });
    
      
}
exports.handle_request = handle_request;