var mongo = require("./mongo");
var fs = require('fs');
const dateTime = require('date-time');

function handle_request(msg, callback){
    
    var res = {};
    //var req=msg.req;
    console.log("In handle request:"+ JSON.stringify(msg));
    var fileid= msg.fileid;
    var ownerid= msg.ownerid;
    var type=msg.type;
 
    var path,filename,finalpath;
    mongo.getConnection((connectionNumber,db)=>{
        

        if(type=="own"){
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
                            
                            const activityCollectionName="activity";
                            const activityCollection = db.collection(activityCollectionName);
    
                            activityCollection.insert(
                                {
                                    ownerid,
                                    activitytype:"File Deleted",
                                    type:"file",
                                    date:dateTime(),
                                    name:name,
                                }
                            );
    
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
        }
        else{
            const sharedFilesCollectionName = 'sharedfiles'; 
            const sharedFilesCollection = db.collection(sharedFilesCollectionName);
            sharedFilesCollection.findOne({fileid,"sharedWith":ownerid}, function(err, fileData){
                if (err) {
                    console.error(err);
                    res.code="202";
                    res.data="File deletion failed";
                    callback(null,res);
                }
                else{
                    
                    sharedFilesCollection.remove({fileid,"sharedWith":ownerid}, function(err){
                        if (err) {
                            console.error(err);
                            res.code="202";
                            res.data="File deletion failed";
                            callback(null,res);
                        }
                        else{
                            
                            const activityCollectionName="activity";
                            const activityCollection = db.collection(activityCollectionName);
    
                            activityCollection.insert(
                                {
                                    ownerid,
                                    activitytype:"Shared File Deleted",
                                    type:"file",
                                    date:dateTime(),
                                    name:fileData.name,
                                }
                            );
                        }
                        mongo.releaseConnection(connectionNumber);
                    });
                }
            }); 
        }
    
        
    });
    res.code="201";
    res.data="file deleted";
    callback(null,res);    
}
exports.handle_request = handle_request;