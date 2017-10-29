var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/dropbox";
var autoIncrement = require("mongodb-autoincrement");
var mkdirp = require('mkdirp');
var rimraf = require('rimraf');

function handle_request(msg, callback){

    String.prototype.replaceAll = function(search, replacement) {
        var target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
    };
    
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));

    var folderid= msg.folderid;
    var ownerid= msg.ownerid;
    console.log("folderid is :"+folderid);
    var path,foldername,finalpath;
    var flag=true;
    
    mongo.getConnection((connectionNumber,db)=>{
        const foldersCollectionName = 'folders'; 
        const foldersCollection = db.collection(foldersCollectionName);
        const filesCollectionName = 'files'; 
        const filesCollection = db.collection(filesCollectionName);
    
        foldersCollection.findOne({"folderid":folderid}, function(err, folderData){
            if(err) {flag=false;throw err;}
            else{
                path=folderData.path;
                name=folderData.name;
                finalpath = "./UserFiles/"+ownerid+path+name;
    
                var folderpath=folderData.path+name+"/";
                console.log("path is: "+folderpath);
                folderpath = folderpath.replaceAll("/","\\/");
                console.log("new path is: "+folderpath);
    
                foldersCollection.remove({"folderid":folderid},(err)=>{
                    if(err) {flag=false;throw err;}
                    else{
                        foldersCollection.remove({"path":{$regex:"^"+folderpath}}, (err)=>{
                            if(err) {flag=false;throw err;}
                            else{
                                filesCollection.remove({"path":{$regex:"^"+folderpath}},(err)=>{
                                    if(err) {flag=false;throw err;}
                                    else{
                                        console.log("All deleted");
                                        rimraf(finalpath, function () { console.log('folder deletion done'); });
                                    }
                                    mongo.releaseConnection(connectionNumber);
                                });
                            }
                        });
                    }
                });
            }
        }); 
    });
    
    if(flag){
        res.code="201";
        res.data="folder deleted";
        callback(null,res);
    }
    else{
        res.code="202";
        res.data="folder deletion failed.";
        callback(null,res);
    }
        
}

exports.handle_request = handle_request;


