var express = require('express');
var router = express.Router();
var path = require('path');
var mongo = require("./mongo");
var autoIncrement = require("mongodb-autoincrement");
var mongoURL = "mongodb://localhost:27017/dropbox";
var mkdirp = require('mkdirp');

router.post('/', function (req, res, next) {
    var ownerid = req.body.userid;
    var foldername = req.body.foldername;
    var path = req.body.path;

    try{
        mongo.connect(mongoURL, function(db){
            const foldersCollectionName = 'folders'; 
            const foldersCollection = db.collection(foldersCollectionName);
            
            autoIncrement.getNextSequence(db, foldersCollectionName, function (err, autoIndex) {
                
                foldersCollection.insert(
                    {
                        folderid:autoIndex,
                        ownerid:ownerid,
                        name:foldername,
                        path:path,
                    }
                );
            });
            var dir = './UserFiles/'+path+foldername+'/'; 
            mkdirp(dir, function(err){
                if (err) console.error(err)
                else console.log('Cretaed!')
            });
        });
        return res.status(201).send({"message":"Folder Created"});
    }
    catch(e){
        console.log(e);
    }

    mongo.getConnection((connectionNumber,db)=>{
        
        
        filesCollection.findOne({"fileid":fileid}, function(err, file){
            if(err) throw err;
            else{
                console.log("Path I found is :"+file.path);
                var finalPath = "UserFiles/"+file.path+file.name;
                console.log(finalPath);
                
                res.download(finalPath);
            }
            mongo.releaseConnection(connectionNumber);
        });
    });
});


module.exports = router;