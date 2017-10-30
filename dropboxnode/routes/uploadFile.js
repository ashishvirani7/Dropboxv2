var express = require('express');
var router = express.Router();
var mkdirp = require('mkdirp');
var express = require('express');
var router = express.Router();
var fs = require('fs');
var mongo = require("./mongo");
var autoIncrement = require("mongodb-autoincrement");
var mongoURL = "mongodb://localhost:27017/dropbox";
var kafka = require('./kafka/client');
const fileUpload = require('express-fileupload');

var topic_name = "upload_file_topic";


router.post('/', function (req, res, next) {

    file = req.files.myfile;
    var ownerid=req.body.userid;
    var path=req.body.path;
    
    kafka.make_request(topic_name,{file,path,ownerid}, function(err,results){
        console.log('in result');
        console.log(results);
        if(err){
            done(err,{});
        }
        else
        {
            if(results.code == 201){
                console.log("File uploaded successfully");
                return res.status(201).send({"message":"File uploaded"});
            }
            else {
                res.status(202).send({"message":"File upload failed"});
                console.log("File upload Failed");
            }
        }
    });
});
    


module.exports=router;

