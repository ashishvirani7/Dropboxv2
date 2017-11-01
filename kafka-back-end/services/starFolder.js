var mongo = require("./mongo");
var fs = require('fs');

function handle_request(msg, callback){
    
    var res = {};
    //var req=msg.req;
    console.log("In handle request:"+ JSON.stringify(msg));
    var folderid= msg.folderid;
    
    mongo.getConnection((connectionNumber,db)=>{
        const foldersCollectionName = 'folders'; 
        const foldersCollection = db.collection(foldersCollectionName);
    
        foldersCollection.findOneAndUpdate({"folderid":folderid},{$set:{"starred":true}}, function(err, folderData){
            if (err) {
                console.error(err);
                res.code="202";
                res.data="folder starred failed";
                callback(null,res);
            }
            else{
                res.code="201";
                res.data="folder starred";
                callback(null,res);  
            }
            mongo.releaseConnection(connectionNumber);
        }); 
    });
      
}
exports.handle_request = handle_request;