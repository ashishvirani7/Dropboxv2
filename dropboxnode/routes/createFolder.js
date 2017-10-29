var express = require('express');
var router = express.Router();
var path = require('path');
var mongo = require("./mongo");
var autoIncrement = require("mongodb-autoincrement");
var mongoURL = "mongodb://localhost:27017/dropbox";
var mkdirp = require('mkdirp');
var kafka = require('./kafka/client');

var topic_name = "create_folder_topic";

router.post('/', function (req, res, next) {
    var ownerid = req.body.userid;
    var foldername = req.body.foldername;
    var path = req.body.path;

    kafka.make_request(topic_name,{ownerid,foldername,path}, function(err,results){
        console.log('in result');
        console.log(results);
        if(err){
            done(err,{});
        }
        else
        {
            if(results.code == 201){
                console.log("Folder created successfully");
                return res.status(201).send({"message":"Folder Created"});
            }
            else {
                res.status(202).send({"message":"Folder creation failed"});
                console.log("Folder creation Failed");
            }
        }
    });
});

// try{
//     mongo.connect(mongoURL, function(db){
//         const foldersCollectionName = 'folders'; 
//         const foldersCollection = db.collection(foldersCollectionName);
        
//         autoIncrement.getNextSequence(db, foldersCollectionName, function (err, autoIndex) {
            
//             foldersCollection.insert(
//                 {
//                     folderid:autoIndex,
//                     ownerid:ownerid,
//                     name:foldername,
//                     path:path,
//                 }
//             );
//         });
//         var dir = './UserFiles/'+ownerid+path+foldername+'/'; 
//         mkdirp(dir, function(err){
//             if (err) console.error(err)
//             else console.log('Cretaed!')
//         });
//     });
//     return res.status(201).send({"message":"Folder Created"});
// }
// catch(e){
//     console.log(e);
// }


module.exports = router;