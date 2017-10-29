var mkdirp = require('mkdirp');
var multer  = require('multer');
var fs = require('fs');
var mongo = require("./mongo");
var autoIncrement = require("mongodb-autoincrement");
var mongoURL = "mongodb://localhost:27017/dropbox";

function handle_request(msg, callback){
    
    var res = {};
    //var req=msg.req;
    console.log("In handle request:"+ JSON.stringify(msg));
    file = msg.file;
    var path = msg.path;
    var ownerid = msg.ownerid;
    var filename = file.name;
    var newpath = './UserFiles/'+ownerid+path+filename;
    
    fs.writeFile(newpath,Buffer.from(file.data),(err)=>{
        if(err) throw err;
        else{
            console.log("file uploaded.");
            try{
                mongo.connect(mongoURL, function(db){
                console.log("in mongo");
                const filesCollectionName = 'files'; 
                const filesCollection = db.collection(filesCollectionName);
                filesCollection.findOne({name:filename,path:path},(err,file) =>{
                    if(file){
                        res.code="202";
                        res.data="file exists";
                        callback(null,res);
                    }
                    else{
                        autoIncrement.getNextSequence(db, filesCollectionName, function (err, autoIndex) {
                            filesCollection.insert(
                                {
                                    fileid:autoIndex,
                                    ownerid:ownerid,
                                    name:filename,
                                    path:path,
                                }
                            );
                        });
                        res.code="201";
                        res.data="file uploaded";
                        callback(null,res);
                    }
                });       
                });
            }
            catch(e){
                console.log(e);
            }
        }
    })

}

    // file = msg.file;
    // var path = msg.path;
    // var ownerid = msg.ownerid;
    // var oldpath = file.path;
    // var filename = file.originalname;
    // try{
    //     upload.single(file, function(err){
    //         if (err) {console.log(err);}
    //         console.log("working");
    //         var newpath = './UserFiles/'+ownerid+path+filename;
    //         fs.rename(oldpath, newpath, function (err) {
    //           if (err) throw err;
    //           else{
    //             console.log("file uploaded");
    //             var filedata={
    //                 ownerid:ownerid,
    //                 filename:filename,
    //                 filesize:file.size,
    //                 path:path,
    //             };
    //             try{
    //                 mongo.connect(mongoURL, function(db){
    //                     console.log("in mongo");
    //                     const filesCollectionName = 'files'; 
    //                     const filesCollection = db.collection(filesCollectionName);
    //                     filesCollection.findOne({name:filedata.filename,path:filedata.path},(err,file) =>{
    //                         if(file){
    //                             res.code="202";
    //                             res.data="file exists";
    //                             callback(null,res);
    //                         }
    //                         else{
    //                             autoIncrement.getNextSequence(db, filesCollectionName, function (err, autoIndex) {
    //                                 console.log("file: "+JSON.stringify(filedata));
    //                                 filesCollection.insert(
    //                                     {
    //                                         fileid:autoIndex,
    //                                         ownerid:filedata.ownerid,
    //                                         name:filedata.filename,
    //                                         path:filedata.path,
    //                                         size:filedata.filesize
    //                                     }
    //                                 );
    //                             });
    //                             res.code="201";
    //                             res.data="file uploaded";
    //                             callback(null,res);
    //                         }
    //                     });
                           
    //                 });
    //             }
    //             catch(e){
    //                 console.log(e);
    //             }
    //           }
    //         }); 
    //     });   
    // }
    // catch(e){
    //     console.log(e);
    // }
         


exports.handle_request = handle_request;
