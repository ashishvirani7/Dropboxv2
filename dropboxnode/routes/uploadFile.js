var express = require('express');
var router = express.Router();
var mkdirp = require('mkdirp');
var express = require('express');
var router = express.Router();
var multer  = require('multer');
var fs = require('fs');
var mongo = require("./mongo");
var autoIncrement = require("mongodb-autoincrement");
var mongoURL = "mongodb://localhost:27017/dropbox";

var storage = multer.diskStorage({
destination: function (req, file, cb) {
    mkdirp('./temp/', function(err){
        cb(null, './temp');
    });
},
filename: function (req, file, cb) {
    console.log(file);
    cb(null, file.originalname);
}
});

var upload = multer({storage:storage});

router.post('/', upload.single('myfile'), function (req, res, next) {
    console.log(req.body.path);
    console.log(req.file);
    var oldpath = req.file.path;
    var newpath = './UserFiles/'+req.body.path+'/'+req.file.originalname;
    fs.rename(oldpath, newpath, function (err) {
      if (err) throw err;
      else{
        console.log("file uploaded");
        var filedata={
            ownerid:req.body.userid,
            filename:req.file.filename,
            filesize:req.file.size,
            path:req.body.path,
        };
        try{
            mongo.connect(mongoURL, function(db){
                const filesCollectionName = 'files'; 
                const filesCollection = db.collection(filesCollectionName);
                filesCollection.findOne({name:filedata.filename,path:filedata.path},(err,file) =>{
                    if(file){

                    }
                    else{
                        autoIncrement.getNextSequence(db, filesCollectionName, function (err, autoIndex) {
                            console.log("file: "+JSON.stringify(filedata));
                            filesCollection.insert(
                                {
                                    fileid:autoIndex,
                                    ownerid:filedata.ownerid,
                                    name:filedata.filename,
                                    path:filedata.path,
                                    size:filedata.filesize
                                }
                            );
                        });
                    }
                });
                   
            });
        }
        catch(e){
            console.log(e);
        }
      }
    });
    res.status(201).end();
});


module.exports=router;