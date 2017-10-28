var express = require('express');
var router = express.Router();
var mongo = require("./mongo");
var path = require('path');
var rimraf = require('rimraf');

router.post('/', function (req, res, next) {
    var folderid= parseInt(req.body.folderid);
    var ownerid= parseInt(req.body.userid);
    console.log("folderid is :"+folderid);
    var path,foldername,finalpath;
    mongo.getConnection((connectionNumber,db)=>{
        const foldersCollectionName = 'folders'; 
        const foldersCollection = db.collection(foldersCollectionName);

        foldersCollection.findOne({"folderid":folderid}, function(err, folderData){
            if(err) throw err;
            else{
                path=folderData.path;
                name=folderData.name;
                finalpath = "./UserFiles/"+ownerid+path+name;
                console.log("final path:   "+finalpath);
                foldersCollection.remove({"folderid":folderid}, function(err){
                    if(err) throw err;
                    else{
                        rimraf(finalpath, function () { console.log('folder deletion done'); });
                    }
                    mongo.releaseConnection(connectionNumber);
                });
            }
        }); 
    });
    res.status(201).end();
});


module.exports = router;