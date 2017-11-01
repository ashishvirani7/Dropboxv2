var mongo = require("./mongo");
var fs = require('fs');

function handle_request(msg, callback){
    
    var res = {};
    //var req=msg.req;
    console.log("In handle request:"+ JSON.stringify(msg));
    var fileid= msg.fileid;
    
    mongo.getConnection((connectionNumber,db)=>{
        const filesCollectionName = 'files'; 
        const filesCollection = db.collection(filesCollectionName);
    
        filesCollection.findOneAndUpdate({"fileid":fileid},{$set:{"starred":true}}, function(err, fileData){
            if (err) {
                console.error(err);
                res.code="202";
                res.data="File starred failed";
                callback(null,res);
            }
            else{
                res.code="201";
                res.data="file starred";
                callback(null,res);  
            }
            mongo.releaseConnection(connectionNumber);
        }); 
    });
      
}
exports.handle_request = handle_request;