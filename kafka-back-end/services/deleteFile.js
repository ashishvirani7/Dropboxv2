var mongo = require("./mongo");
var fs = require('fs');

function handle_request(msg, callback){
    
    var res = {};
    //var req=msg.req;
    console.log("In handle request:"+ JSON.stringify(msg));
    var fileid= msg.fileid;
    var ownerid= msg.ownerid;
    
    var path,filename,finalpath;
    mongo.getConnection((connectionNumber,db)=>{
        const filesCollectionName = 'files'; 
        const filesCollection = db.collection(filesCollectionName);
    
        filesCollection.findOne({"fileid":fileid}, function(err, fileData){
            if (err) {
                console.error(err);
                res.code="202";
                res.data="File deletion failed";
                callback(null,res);
            }
            else{
                path=fileData.path;
                name=fileData.name;
                finalpath = "./UserFiles/" +ownerid+path+name;
                filesCollection.remove({"fileid":fileid}, function(err){
                    if (err) {
                        console.error(err);
                        res.code="202";
                        res.data="File deletion failed";
                        callback(null,res);
                    }
                    else{
                        fs.unlink(finalpath, function(error) {
                            if (error) {
                                throw error;
                            }
                            console.log('file deleted');
                         });  
                    }
                    mongo.releaseConnection(connectionNumber);
                });
            }
        }); 
    });
    res.code="201";
    res.data="file deleted";
    callback(null,res);    
}
exports.handle_request = handle_request;