var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/dropbox";
function handle_request(msg, callback){
    
    var res = {};
    //var req=msg.req;
    console.log("In handle request:"+ JSON.stringify(msg));

    ownerid= msg.ownerid;
    path = msg.path;
    
    //With Connection Pooling
    mongo.getConnection((connectionNumber,db)=>{

        console.log("no.: "+connectionNumber);
        const filesCollectionName = 'files'; 
        const filesCollection = db.collection(filesCollectionName);

        filesCollection.find({ownerid,path},{sort:{"dateUploaded":-1}}, function(err, fileData){
            if(err) throw err;
            else{
                console.log("File is: "+fileData);
                res.code="201";
                res.data=fileData;
                callback(null,res);
            }
            mongo.releaseConnection(connectionNumber);
        });
    });

    // Without Connection Pooling
    mongo.connect(mongoURL,(db)=>{
        const filesCollectionName = 'files'; 
        const filesCollection = db.collection(filesCollectionName);

        filesCollection.find({ownerid,path},{sort:{"dateUploaded":-1}}).toArray(function(err, fileData){
            if(err) throw err;
            else{
                console.log("File is: "+fileData);
                res.code="201";
                res.data=fileData;
                callback(null,res);
            }
    
        });
    });
}
exports.handle_request = handle_request;