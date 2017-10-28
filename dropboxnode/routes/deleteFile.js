var express = require('express');
var router = express.Router();
var mongo = require("./mongo");
var path = require('path');
var fs = require('fs');

router.post('/', function (req, res, next) {
    var fileid= parseInt(req.body.fileid);
    var path,filename,finalpath;
    console.log("fileid is :"+fileid);
    mongo.getConnection((connectionNumber,db)=>{
        const filesCollectionName = 'files'; 
        const filesCollection = db.collection(filesCollectionName);

        filesCollection.findOne({"fileid":fileid}, function(err, fileData){
            if(err) throw err;
            else{
                path=fileData.path;
                name=fileData.name;
                finalpath = "./UserFiles/"+path+name;
                filesCollection.remove({"fileid":fileid}, function(err){
                    if(err) throw err;
                    else{
                        fs.unlink(finalpath, function(error) {
                            if (error) {
                                throw error;
                            }
                            console.log('file deleted');
                         });  
                    }
                    mongo.releaseConnection(connectionNumber);
                });
            }
        }); 
    });
    res.status(201).end();
});


module.exports = router;