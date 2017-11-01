var express = require('express');
var router = express.Router();
var mongo = require("./mongo");
var path = require('path');
var kafka = require('./kafka/client');

var topic_name = "download_file_topic";


router.post('/', function (req, res, next) {
    var fileid= req.body.fileid;
    var ownerid= req.body.userid;

    kafka.make_request(topic_name,{fileid,ownerid}, function(err,results){
        console.log('in result');
        console.log(results);
        if(err){
            done(err,{});
        }
        else
        {
            if(results.code == 201){
                console.log("File downloaded successfully");
                console.log(results.data);
                res.status(201).send({file:results.data.data});
            }
            else {
                res.status(202).send({"message":"File download failed"});
                console.log("File download Failed");
            }
        }
    });
    
});


module.exports = router;



// mongo.getConnection((connectionNumber,db)=>{
//     const filesCollectionName = 'files'; 
//     const filesCollection = db.collection(filesCollectionName);
    
//     filesCollection.findOne({"fileid":fileid}, function(err, file){
//         if(err) throw err;
//         else{
//             console.log("Path I found is :"+file.path);
//             var finalPath = "./UserFiles/"+ownerid+file.path+file.name;
//             console.log(finalPath);
            
//             res.download(finalPath);
//         }
//         mongo.releaseConnection(connectionNumber);
//     });
// });