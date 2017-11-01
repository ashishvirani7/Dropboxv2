var express = require('express');
var router = express.Router();
var mongo = require("./mongo");
var rimraf = require('rimraf');
var mongoURL = "mongodb://localhost:27017/dropbox";
var mkdirp = require('mkdirp');
var kafka = require('./kafka/client');

var topic_name = "delete_folder_topic";

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

router.post('/', function (req, res, next) {
    var folderid= (req.body.folderid);
    var ownerid= (req.body.userid);
    
    kafka.make_request(topic_name,{folderid,ownerid}, function(err,results){
        console.log('in result');
        console.log(results);
        if(err){
            done(err,{});
        }
        else
        {
            if(results.code == 201){
                console.log("Folder deleted successfully");
                return res.status(201).send({"message":"Folder Deleted"});
            }
            else {
                res.status(202).send({"message":"Folder deletion failed"});
                console.log("Folder deletion Failed");
            }
        }
    });
});


module.exports = router;


// var folderid= parseInt(req.body.folderid);
// var ownerid= parseInt(req.body.userid);
// console.log("folderid is :"+folderid);
// var path,foldername,finalpath;
// mongo.getConnection((connectionNumber,db)=>{
//     const foldersCollectionName = 'folders'; 
//     const foldersCollection = db.collection(foldersCollectionName);
//     const filesCollectionName = 'files'; 
//     const filesCollection = db.collection(filesCollectionName);

//     foldersCollection.findOne({"folderid":folderid}, function(err, folderData){
//         if(err) throw err;
//         else{
//             path=folderData.path;
//             name=folderData.name;
//             finalpath = "./UserFiles/"+ownerid+path+name;

//             var folderpath=folderData.path+name+"/";
//             console.log("path is: "+folderpath);
//             folderpath = folderpath.replaceAll("/","\\/");
//             console.log("new path is: "+folderpath);

//             foldersCollection.remove({"folderid":folderid},(err)=>{
//                 if(err) throw err;
//                 else{
//                     foldersCollection.remove({"path":{$regex:"^"+folderpath}}, (err)=>{
//                         if(err) throw err;
//                         else{
//                             filesCollection.remove({"path":{$regex:"^"+folderpath}},(err)=>{
//                                 if(err) throw err;
//                                 else{
//                                     console.log("All deleted");
//                                     rimraf(finalpath, function () { console.log('folder deletion done'); });
//                                 }
//                                 mongo.releaseConnection(connectionNumber);
//                             });
//                         }
//                     });
//                 }
//             });
//         }
//     }); 
// });
// res.status(201).end();