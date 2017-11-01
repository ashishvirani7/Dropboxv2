#!/bin/bash

/Users/ashish/Sem1/'CMPE 273'/mongodb/bin/mongod &

(cd /Users/ashish/Sem1/'CMPE 273'/'Lab 2 Codes'/Dropbox/kafka-back-end && npm start) &

(cd /Users/ashish/Sem1/'CMPE 273'/'Lab 2 Codes'/Dropbox/dropboxnode && npm start) &

(cd /Users/ashish/Sem1/'CMPE 273'/'Lab 2 Codes'/Dropbox/dropboxreact && npm start) 