var express = require('express');
var router = express.Router();
var mongo = require("./mongo");
var kafka = require('./kafka/client');

var topic_name = "get_activity_topic";

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
                console.log("Activity getting successfully");
                res.status(201).send(results.data);
            }
            else {
                res.status(202).send({"message":"Activity getting failed"});
                console.log("activity getting Failed");
            }
        }
    });
});
module.exports = router;