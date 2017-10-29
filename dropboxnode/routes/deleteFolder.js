var express = require('express');
var router = express.Router();
var mongo = require("./mongo");
var rimraf = require('rimraf');

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

router.post('/', function (req, res, next) {
    var folderid= parseInt(req.body.folderid);
    var ownerid= parseInt(req.body.userid);
    console.log("folderid is :"+folderid);
    var path,foldername,finalpath;
    mongo.getConnection((connectionNumber,db)=>{
        const foldersCollectionName = 'folders'; 
        const foldersCollection = db.collection(foldersCollectionName);
        const filesCollectionName = 'files'; 
        const filesCollection = db.collection(filesCollectionName);

        foldersCollection.findOne({"folderid":folderid}, function(err, folderData){
            if(err) throw err;
            else{
                path=folderData.path;
                name=folderData.name;
                finalpath = "./UserFiles/"+ownerid+path+name;

                var folderpath=folderData.path+name+"/";
                console.log("path is: "+folderpath);
                folderpath = folderpath.replaceAll("/","\\/");
                console.log("new path is: "+folderpath);

                foldersCollection.remove({"folderid":folderid},(err)=>{
                    if(err) throw err;
                    else{
                        foldersCollection.remove({"path":{$regex:"^"+folderpath}}, (err)=>{
                            if(err) throw err;
                            else{
                                filesCollection.remove({"path":{$regex:"^"+folderpath}},(err)=>{
                                    if(err) throw err;
                                    else{
                                        console.log("All deleted");
                                        rimraf(finalpath, function () { console.log('folder deletion done'); });
                                    }
                                    mongo.releaseConnection(connectionNumber);
                                });
                            }
                        });
                    }
                });
            }
        }); 
    });
    res.status(201).end();
});


module.exports = router;