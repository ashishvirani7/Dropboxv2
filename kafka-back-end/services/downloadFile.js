var mongo = require("./mongo");
var fs = require('fs');

function handle_request(msg, callback){
    
    var res = {};
    //var req=msg.req;
    console.log("In handle request:"+ JSON.stringify(msg));

    var fileid= msg.fileid;
    var ownerid= msg.ownerid;
    
    mongo.getConnection((connectionNumber,db)=>{
        const filesCollectionName = 'files'; 
        const filesCollection = db.collection(filesCollectionName);
        
        filesCollection.findOne({"fileid":fileid}, function(err, file){
            if (err) {
                console.error(err);
                res.code="202";
                res.data="File download failed";
                callback(null,res);
            }
            else{
                var finalPath = "./UserFiles/"+ownerid+file.path+file.name;
                console.log(finalPath);
                
                fs.readFile(finalPath,(err,data)=>{
                    res.code="201";
                    res.data=data;
                    callback(null,res);   
                });
            }
            mongo.releaseConnection(connectionNumber);
        });
    });
     
}
exports.handle_request = handle_request;

