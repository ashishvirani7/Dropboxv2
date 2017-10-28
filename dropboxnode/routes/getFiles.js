var express = require('express');
var router = express.Router();
var mongo = require("./mongo");

router.post('/', function (req, res, next) {
    path = req.body.path;
    userid= req.body.userid;
    
    console.log("userid is :"+userid + " path is :"+path);
    mongo.getConnection((connectionNumber,db)=>{
        console.log("no.: "+connectionNumber);
        const filesCollectionName = 'files'; 
        const filesCollection = db.collection(filesCollectionName);
        
        var response={};

        filesCollection.find({"ownerid":userid,"path": path}, function(err, fileData){
            if(err) throw err;
            else{
                res.status(201).send(fileData);
            }
            mongo.releaseConnection(connectionNumber);
        });
    });

});
module.exports = router;