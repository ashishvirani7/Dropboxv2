var express = require('express');
var router = express.Router();
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/dropbox";
var kafka = require('./kafka/client');

var topic_name = "star_folder_topic";


router.post('/', function (req, res, next) {

    var folderid= (req.body.folderid);
    
    kafka.make_request(topic_name,{folderid}, function(err,results){
        console.log('in result');
        console.log(results);
        if(err){
            done(err,{});
        }
        else
        {
            if(results.code == 201){
                console.log("Folder starred successfully");
                return res.status(201).send({"message":"Folder starred"});
            }
            else {
                res.status(202).send({"message":"Folder starring failed"});
                console.log("Folder starring Failed");
            }
        }
    });
});
    


module.exports=router;

