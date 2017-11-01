var express = require('express');
var router = express.Router();
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/dropbox";
var kafka = require('./kafka/client');

var topic_name = "unstar_file_topic";


router.post('/', function (req, res, next) {

    var fileid= (req.body.fileid);
    
    kafka.make_request(topic_name,{fileid}, function(err,results){
        console.log('in result');
        console.log(results);
        if(err){
            done(err,{});
        }
        else
        {
            if(results.code == 201){
                console.log("File starred successfully");
                return res.status(201).send({"message":"File starred"});
            }
            else {
                res.status(202).send({"message":"File starring failed"});
                console.log("File starring Failed");
            }
        }
    });
});
    


module.exports=router;

