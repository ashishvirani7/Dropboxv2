var express = require('express');
var router = express.Router();
var mongo = require("./mongo");
var kafka = require('./kafka/client');

var topic_name = "get_folders_topic";

router.post('/', function (req, res, next) {
    path = req.body.path;
    ownerid= req.body.userid;

    kafka.make_request(topic_name,{path,ownerid}, function(err,results){
        console.log('in result');
        console.log(results);
        if(err){
            done(err,{});
        }
        else
        {
            if(results.code == 201){
                console.log("Folders getting successfully");
                res.status(201).send(results.data);
            }
            else {
                res.status(202).send({"message":"Files getting failed"});
                console.log("Folders getting Failed");
            }
        }
    });

});
module.exports = router;
