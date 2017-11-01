var connection =  new require('./kafka/Connection');
var login = require('./services/login');
var signup = require('./services/signup');
var create_folder = require('./services/createFolder');
var delete_folder = require('./services/deleteFolder');
var upload_file = require('./services/uploadFile');
var delete_file = require('./services/deleteFile');
var download_file = require('./services/downloadFile');
var get_files = require('./services/getFiles');
var get_folders = require('./services/getFolders');
var star_file = require('./services/starFile');
var unstar_file = require('./services/unStarFile');
var star_folder = require('./services/starFolder');
var unstar_folder = require('./services/unStarFolder');
var get_activity = require('./services/getActivity');

var login_topic_name = 'login_topic';
var signup_topic_name = "signup_topic";
var create_folder_topic_name = "create_folder_topic";
var delete_folder_topic_name = "delete_folder_topic";
var upload_file_topic_name = "upload_file_topic";
var delete_file_topic_name = "delete_file_topic";
var download_file_topic_name = "download_file_topic";
var get_files_topic_name = "get_files_topic";
var get_folders_topic_name = "get_folders_topic";
var star_file_topic_name = "star_file_topic";
var unstar_file_topic_name = "unstar_file_topic";
var star_folder_topic_name = "star_folder_topic";
var unstar_folder_topic_name = "unstar_folder_topic";
var get_activity_topic_name = "get_activity_topic";

var response_topic_name = "response_topic";

var producer = connection.getProducer();

producer.on('ready', function () {
    producer.createTopics([login_topic_name,signup_topic_name,create_folder_topic_name, delete_folder_topic_name,
        upload_file_topic_name, delete_file_topic_name, download_file_topic_name, get_files_topic_name,
        get_folders_topic_name, response_topic_name, star_file_topic_name, unstar_file_topic_name,
        star_folder_topic_name, unstar_folder_topic_name, get_activity_topic_name,



    ], 
        false, function (err, data) {
    }); 
    var login_consumer = connection.getConsumer(login_topic_name);
    var signup_consumer = connection.getConsumer(signup_topic_name);
    var create_folder_consumer = connection.getConsumer(create_folder_topic_name);
    var delete_folder_consumer = connection.getConsumer(delete_folder_topic_name);
    var upload_file_consumer =  connection.getConsumer(upload_file_topic_name);
    var delete_file_consumer = connection.getConsumer(delete_file_topic_name);
    var download_file_consumer = connection.getConsumer(download_file_topic_name);
    var get_files_consumer = connection.getConsumer(get_files_topic_name);
    var get_folders_consumer = connection.getConsumer(get_folders_topic_name);
    var star_file_consumer =connection.getConsumer(star_file_topic_name);
    var unstar_file_consumer = connection.getConsumer(unstar_file_topic_name);
    var star_folder_consumer =connection.getConsumer(star_folder_topic_name);
    var unstar_folder_consumer = connection.getConsumer(unstar_folder_topic_name);
    var get_activity_consumer = connection.getConsumer(get_activity_topic_name);


    console.log('login server is running');
    login_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        login.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });
    
    console.log('signup server is running');
    signup_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        signup.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });
    
    console.log('create folder server is running');
    create_folder_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        create_folder.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });
    
    console.log('delete folder server is running');
    delete_folder_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        delete_folder.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });
    
    console.log('upload file server is running');
    upload_file_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        upload_file.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });
    
    console.log('delete file server is running');
    delete_file_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        delete_file.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });
    
    console.log('download file server is running');
    download_file_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        download_file.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });
    
    console.log('get files server is running');
    get_files_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        get_files.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });
    
    console.log('get folders server is running');
    get_folders_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        get_folders.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });

    console.log('star file server is running');
    star_file_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        star_file.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });

    console.log('unstar file server is running');
    unstar_file_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        unstar_file.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });

    console.log('star folder server is running');
    star_folder_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        star_folder.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });

    console.log('unstar folder server is running');
    unstar_folder_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        unstar_folder.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });

    console.log('get activity server is running');
    get_activity_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        get_activity.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });
       
});

