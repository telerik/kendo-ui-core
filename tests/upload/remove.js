
    test("remove fired when clicking remove", function() {
        var removeFired = false;
        uploadInstance = createUpload({ remove:
            function(e) {
                removeFired = true;
            }
        });

        simulateUpload();
        simulateRemove();

        ok(removeFired);
    });

    test("remove event arguments contain list of files", function() {
        var files = false;
        uploadInstance = createUpload({ remove:
            function(e) {
                files = e.files;
            }
        });

        simulateUpload();
        simulateRemove();

        assertSelectedFile(files);
    });

    test("user data set in remove event is sent to server", 1, function() {
        uploadInstance = createUpload({ remove:
            function(e) {
                e.data = { id: 1 };
            }
        });

        simulateUpload();

        $.mockjax(function(s) {
            equal(s.data.id, 1);
            return {
                url: "/removeAction",
                responseTime: 0,
                responseText: ""
            };
        });

        simulateRemoveClick();
    });

    test("remove HTTP verb can be changed", 1, function() {
        uploadInstance = createUpload();
        uploadInstance.options.async.removeVerb = "DELETE";

        simulateUpload();

        $.mockjax(function(s) {
            equal(s.type, "DELETE");
            return {
                url: "/removeAction",
                responseTime: 0,
                responseText: ""
            };
        });

        simulateRemoveClick();
    });

    test("remove field is fileNames", 1, function() {
        uploadInstance = createUpload();

        simulateUpload();

        $.mockjax(function(s) {
            deepEqual(s.data["fileNames"], [ "first.txt" ]);
            return {
                url: "/removeAction",
                responseTime: 0,
                responseText: ""
            };
        });

        simulateRemoveClick();
    });

    test("remove field can be changed", 1, function() {
        uploadInstance = createUpload();
        uploadInstance.options.async.removeField = "fileNames[]";

        simulateUpload();

        $.mockjax(function(s) {
            deepEqual(s.data["fileNames[]"], [ "first.txt" ]);
            return {
                url: "/removeAction",
                responseTime: 0,
                responseText: ""
            };
        });

        simulateRemoveClick();
    });

    test("cancelling remove aborts remove operation", function() {
        uploadInstance = createUpload({ remove:
            function(e) {
                e.preventDefault();
            }
        });

        var removeCalled = false;
        uploadInstance._submitRemove = function(data, onSuccess) {
            removeCalled = true;
        };

        simulateUpload();
        simulateRemove();

        ok(!removeCalled);
    });


    // -----------------------------------------------------------------------------------
    // -----------------------------------------------------------------------------------
    //Remove tests for initial files
    test("remove is fired when clicking remove on initially rendered file", function(){
        var removeFired = false;
        uploadInstance = createUpload({
            files: [
                { name: "test.doc", size: 50, extension: ".doc"}
            ], 
            remove: function(e) {
                removeFired = true;
            }
        });

        simulateRemove();

        ok(removeFired);
    });

    test("remove event arguments contain list of files when removing initially rendered file", function() {
        var files = false;
        uploadInstance = createUpload({ 
            files: [
                { name: "test.doc", size: 50, extension: ".doc"}
            ],
            remove: function(e) {
                files = e.files;
            }
        });

        simulateRemove();

        deepEqual(files, [ { name: "test.doc", extension: ".doc", size: 50 } ]);
    });

    test("remove HTTP verb can be changed when removing initially rendered file", 1, function() {
        uploadInstance = createUpload({
            files: [
                { name: "test.doc", size: 50, extension: ".doc"}
            ]
        });
        uploadInstance.options.async.removeVerb = "DELETE";

        $.mockjax(function(s) {
            equal(s.type, "DELETE");
            return {
                url: "/removeAction",
                responseTime: 0,
                responseText: ""
            };
        });

        simulateRemoveClick();
    });

    test("remove field is fileNames for initially rendered files", 1, function() {
        uploadInstance = createUpload({
            files: [
                { name: "test.doc", size: 50, extension: ".doc"}
            ]
        });

        $.mockjax(function(s) {
            deepEqual(s.data["fileNames"], [ "test.doc" ]);
            return {
                url: "/removeAction",
                responseTime: 0,
                responseText: ""
            };
        });

        simulateRemoveClick();
    });

    test("remove field can be changed for initially rendered files", 1, function() {
        uploadInstance = createUpload({
            files: [
                { name: "test.doc", size: 50, extension: ".doc"}
            ]
        });
        uploadInstance.options.async.removeField = "fileNames[]";

        $.mockjax(function(s) {
            deepEqual(s.data["fileNames[]"], [ "test.doc" ]);
            return {
                url: "/removeAction",
                responseTime: 0,
                responseText: ""
            };
        });

        simulateRemoveClick();
    });

    test("cancelling remove aborts remove operation for initially rendered files", function() {
        uploadInstance = createUpload({ 
            files: [
                { name: "test.doc", size: 50, extension: ".doc"}
            ],
            remove: function(e) {
                e.preventDefault();
            }
        });

        var removeCalled = false;
        uploadInstance._submitRemove = function(data, onSuccess) {
            removeCalled = true;
        };

        simulateRemove();

        ok(!removeCalled);
    });