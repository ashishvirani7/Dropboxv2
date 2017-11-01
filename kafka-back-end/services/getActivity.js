var mongo = require("./mongo");

function handle_request(msg, callback){
    
    var res = {};
    //var req=msg.req;
    console.log("In handle request:"+ JSON.stringify(msg));

    ownerid= msg.ownerid;
    
    mongo.getConnection((connectionNumber,db)=>{
        console.log("no.: "+connectionNumber);
        const activityCollectionName = 'activity'; 
        const activityCollection = db.collection(activityCollectionName);

        activityCollection.find({ownerid},{sort:{"date":-1}}, function(err, activityData){
            if(err) throw err;
            else{
                res.code="201";
                res.data=activityData;
                callback(null,res);
            }
            mongo.releaseConnection(connectionNumber);
        });
    });
     
}
exports.handle_request = handle_request;

