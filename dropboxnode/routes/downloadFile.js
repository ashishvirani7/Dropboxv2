var express = require('express');
var router = express.Router();
var mongo = require("./mongo");
var path = require('path');

router.post('/', function (req, res, next) {
    var fileid= parseInt(req.body.fileid);
    console.log("fileid is :"+fileid);
    mongo.getConnection((connectionNumber,db)=>{
        const filesCollectionName = 'files'; 
        const filesCollection = db.collection(filesCollectionName);
        
        filesCollection.findOne({"fileid":fileid}, function(err, file){
            if(err) throw err;
            else{
                console.log("Path I found is :"+file.path);
                var finalPath = "UserFiles/"+file.path+file.name;
                console.log(finalPath);
                
                res.download(finalPath);
            }
            mongo.releaseConnection(connectionNumber);
        });
    });
});


module.exports = router;