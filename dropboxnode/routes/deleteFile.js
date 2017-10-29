var express = require('express');
var router = express.Router();
var mongo = require("./mongo");
var path = require('path');
var fs = require('fs');
var kafka = require('./kafka/client');

var topic_name = "delete_file_topic";

router.post('/', function (req, res, next) {
    
    var fileid= parseInt(req.body.fileid);
    var ownerid= parseInt(req.body.userid);

    kafka.make_request(topic_name,{fileid,ownerid}, function(err,results){
        console.log('in result');
        console.log(results);
        if(err){
            done(err,{});
        }
        else
        {
            if(results.code == 201){
                console.log("File deleted successfully");
                return res.status(201).send({"message":"File deleted"});
            }
            else {
                res.status(202).send({"message":"File letion failed"});
                console.log("File deletion Failed");
            }
        }
    });
});

module.exports = router;


    
