var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/dropbox";
var autoIncrement = require("mongodb-autoincrement");
var mkdirp = require('mkdirp');
const dateTime = require('date-time');

function handle_request(msg, callback){

    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));

    try{
        ownerid=msg.ownerid;
        foldername=msg.foldername;
        path=msg.path;

        mongo.connect(mongoURL, function(db){
            const foldersCollectionName = 'folders'; 
            const foldersCollection = db.collection(foldersCollectionName);

            foldersCollection.findOne({name:foldername,path,ownerid},(err,folder) =>{
                if(folder){
                    res.code="202";
                    res.data="folder exists";
                    callback(null,res);
                }
                else{
                    autoIncrement.getNextSequence(db, foldersCollectionName, function (err, autoIndex) {
                        
                        foldersCollection.insert(
                            {
                                folderid:autoIndex.toString(),
                                ownerid:ownerid,
                                name:foldername,
                                path:path,
                                dateUploaded:dateTime(),
                                starred:false,
                            }
                        );
                    });

                    const activityCollectionName="activity";
                    const activityCollection = db.collection(activityCollectionName);

                    activityCollection.insert(
                        {
                            ownerid,
                            activitytype:"Folder Uploaded",
                            type:"folder",
                            date:dateTime(),
                            name:foldername,
                            
                        }
                    );


                    var dir = './UserFiles/'+ownerid+path+foldername+'/'; 
                    mkdirp(dir, function(err){
                        if (err) {
                            console.error(err);
                            res.code="202";
                            res.data="Folder creation failed";
                            callback(null,res);
                        }
                        else console.log('Cretaed!')
                    });
                    res.code="201";
                    res.data="folder created";
                    callback(null,res);
                }
            });       
            
            
        });
    }
    catch(e){
        console.log(e);
    }    
}


exports.handle_request = handle_request;

