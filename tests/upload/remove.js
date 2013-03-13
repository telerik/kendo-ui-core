
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
