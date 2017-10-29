var mongo = require("./mongo");

function handle_request(msg, callback){
    
    var res = {};
    //var req=msg.req;
    console.log("In handle request:"+ JSON.stringify(msg));

    path = msg.path;
    ownerid= msg.ownerid;
    
    mongo.getConnection((connectionNumber,db)=>{
        console.log("no.: "+connectionNumber);
        const foldersCollectionName = 'folders'; 
        const foldersCollection = db.collection(foldersCollectionName);
        
        foldersCollection.find({ownerid,path}, function(err, folderData){
            if(err) throw err;
            else{
                res.code="201";
                res.data=folderData;
                callback(null,res);
            }
            mongo.releaseConnection(connectionNumber);
        });
    });
     
}
exports.handle_request = handle_request;

