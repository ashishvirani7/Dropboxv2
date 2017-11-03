var express = require('express');
var router = express.Router();
var mongo = require("./mongo");
var kafka = require('./kafka/client');

var topic_name = "get_shared_files_topic";

router.post('/', function (req, res, next) {
    ownerid= req.body.userid;

    kafka.make_request(topic_name,{ownerid}, function(err,results){
        console.log('in result');
        console.log(results);
        if(err){
            done(err,{});
        }
        else
        {
            if(results.code == 201){
                console.log("Files getting successfully");
                res.status(201).send({files:results.files,folders:results.folders});
            }
            else {
                res.status(202).send({"message":"Files getting failed"});
                console.log("Files getting Failed");
            }
        }
    });
});
module.exports = router;