

var mongo = require("./mongo");

function handle_request(msg, callback){
    
    var res = {};
    var sendThis={};
    //var req=msg.req;
    console.log("In handle request:"+ JSON.stringify(msg));

    path = msg.path;
    ownerid= msg.ownerid;
    
    mongo.getConnection((connectionNumber,db)=>{
        console.log("no.: "+connectionNumber);
        const sharedFilesCollectionName = 'sharedfiles'; 
        const sharedFilesCollection = db.collection(sharedFilesCollectionName);
        const sharedFoldersCollectionName = 'sharefolders'; 
        const sharedFoldersCollection = db.collection(sharedFoldersCollectionName);

        sharedFilesCollection.find({sharedWith:ownerid},{sort:{"dateShared":-1}}, function(err, fileData){
            if(err) throw err;
            else{
                sharedFoldersCollection.find({sharedWith:ownerid},{sort:{"dateShared":-1}}, function(err, folderData){
                   
                    res.code="201";
                    res.files=fileData;
                    res.folders =folderData;
                    callback(null,res);
                });
                
            }
            mongo.releaseConnection(connectionNumber);
        });
    });
     
}
exports.handle_request = handle_request;



