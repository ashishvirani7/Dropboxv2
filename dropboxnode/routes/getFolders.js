var express = require('express');
var router = express.Router();
var mongo = require("./mongo");

router.post('/', function (req, res, next) {
    path = req.body.path;
    userid= req.body.userid;
    console.log("userid is :"+userid + " path is :"+path);
    mongo.getConnection((connectionNumber,db)=>{
        console.log("no.: "+connectionNumber);
        const foldersCollectionName = 'folders'; 
        const foldersCollection = db.collection(foldersCollectionName);
        
        var response={};

        foldersCollection.find({"ownerid":userid,"path": path}, function(err, folderData){
            if(err) throw err;
            else{
                res.status(201).send(folderData);
            }
            mongo.releaseConnection(connectionNumber);
        });
    });

});
module.exports = router;