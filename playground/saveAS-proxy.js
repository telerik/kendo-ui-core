#! /usr/bin/env node

"use strict";

var HTTP = require("http");
var FS = require("fs");
var FORMIDABLE = require("formidable");
var PATH = require("path");
var SERVER = HTTP.createServer(function(req, res){
    if (/^post$/i.test(req.method)) {
        var form = new FORMIDABLE.IncomingForm();
        form.encoding = "utf-8";
        form.parse(req, function(err, fields, files){
            if (err) {
                console.log("ERROR");
                console.log(err);
            } else {
                var contentType = fields.contentType;
                var base64 = fields.base64;
                var fileName = fields.fileName;
                var data = new Buffer(base64, "base64");
                console.log(fileName, contentType, data.length);
                FS.writeFileSync("/tmp/kendo.pdf", data);
                res.writeHead(200, {
                    "Content-Type": contentType,
                    "Content-Disposition": "attachment; filename=\"" + fileName + "\""
                });
                res.write(data);
                res.end();
            }
        });
    }
});

SERVER.listen(7569, "0.0.0.0");
console.log("Listening on port 7569");
