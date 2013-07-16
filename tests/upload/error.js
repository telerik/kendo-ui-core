
    test("error is fired when upload action returns response that is not JSON", function() {
        var errorFired = false;
        uploadInstance = createUpload({ error:
            function() {
                errorFired = true;
            }
        });

        simulateUploadWithResponse(errorResponse);

        ok(errorFired);
    });

    test("error is not fired when upload action returns empty response", function() {
        var errorFired = false;
        uploadInstance = createUpload({ error:
            function() {
                errorFired = true;
            }
        });

        simulateUploadWithResponse("");

        ok(!errorFired);
    });

    test("error is not fired when upload action returns valid JSON", function() {
        var errorFired = false;
        uploadInstance = createUpload({ error:
            function() {
                errorFired = true;
            }
        });

        simulateUploadWithResponse(validJSON);

        ok(!errorFired);
    });

    test("error event arguments contain list of uploaded files", function() {
        var files = null;
        uploadInstance = createUpload({ error:
            function(e) {
                files = e.files;
            }
        });

        simulateUploadWithResponse(errorResponse);

        assertSelectedFile(files);
    });

    test("error event arguments contain original XHR", function() {
        var xhr = null;
        uploadInstance = createUpload({ error:
            function(e) {
                xhr = e.XMLHttpRequest;
            }
        });

        simulateUploadWithResponse(errorResponse);

        notEqual(xhr, null);
    });

    test("error event arguments contain XHR object with responseText", function() {
        var xhr = null;
        uploadInstance = createUpload({ error:
            function(e) {
                xhr = e.XMLHttpRequest;
            }
        });

        simulateUploadWithResponse(errorResponse);

        equal(xhr.responseText, errorResponse);
    });

    // -----------------------------------------------------------------------------------
    // -----------------------------------------------------------------------------------
    test("error is raised when remove action returns error code", function() {
        stop(1);

        uploadInstance = createUpload({ error:
            function(e) {
                ok(true);
                start();
            }
        });

        simulateUpload();
        simulateRemoveError();
    });

    test("error is raised when remove action returns response that is not JSON", function() {
        stop(1);

        uploadInstance = createUpload({ error:
            function(e) {
                ok(true);
                start();
            }
        });

        simulateUpload();
        simulateRemoveWithResponse(errorResponse);
    });

    asyncTest("error is not fired when remove action returns empty response", function() {
        uploadInstance = createUpload({ error:
            function(e) {
                ok(false);
            }
        });

        simulateUpload();
        simulateRemove();

        setTimeout(function() {
            ok(true);
            start();
        }, 100);
    });

    asyncTest("error is not fired when remove action returns valid JSON", function() {
        uploadInstance = createUpload({ error:
            function(e) {
                ok(false);
            }
        });

        simulateUpload();
        simulateRemoveWithResponse(validJSON);

        setTimeout(function() {
            ok(true);
            start();
        }, 100);
    });

    test("error event arguments contain list of removed files", function() {
        stop(1);

        uploadInstance = createUpload({ error:
            function(e) {
                assertSelectedFile(e.files);
                start();
            }
        });

        simulateUpload();
        simulateRemoveError();
    });

    test("error event arguments contain remove operation name", function() {
        stop(1);

        uploadInstance = createUpload({ error:
            function(e) {
                equal(e.operation, "remove");
                start();
            }
        });

        simulateUpload();
        simulateRemoveError();
    });

    test("error event arguments contains original XHR for remove action", function() {
        stop(1);

        uploadInstance = createUpload({ error:
            function(e) {
                notEqual(e.XMLHttpRequest, null);
                start();
            }
        });

        simulateUpload();
        simulateRemoveWithResponse(errorResponse);
    });

    test("error event arguments contains XHR with responseText for remove action", function() {
        stop(1);

        uploadInstance = createUpload({ error:
            function(e) {
                equal(e.XMLHttpRequest.responseText, errorResponse);
                start();
            }
        });

        simulateUpload();
        simulateRemoveWithResponse(errorResponse);
    });

    test("error event arguments contains XHR with status for remove action", function() {
        stop(1);

        uploadInstance = createUpload({ error:
            function(e) {
                equal(e.XMLHttpRequest.status, "200");
                start();
            }
        });

        simulateUpload();
        simulateRemoveWithResponse(errorResponse);
    });


    // -----------------------------------------------------------------------------------
    // -----------------------------------------------------------------------------------
    //Error tests for initial files

    test("error is raised when remove action returns error code for initially rendered files", function() {
        stop(1);

        uploadInstance = createUpload({ 
            files: [
                { name: "test.doc", size: 50, extension: ".doc"}
            ],
            error: function(e) {
                ok(true);
                start();
            }
        });

        simulateRemoveError();
    });

    test("error is raised when remove action returns response that is not JSON for initially rendered files", function() {
        stop(1);

        uploadInstance = createUpload({
            files: [
                { name: "test.doc", size: 50, extension: ".doc"}
            ],
            error: function(e) {
                ok(true);
                start();
            }
        });

        simulateRemoveWithResponse(errorResponse);
    });

    asyncTest("error is not fired when remove action returns empty response for initially rendered files", function() {
        uploadInstance = createUpload({ 
            files: [
                { name: "test.doc", size: 50, extension: ".doc"}
            ],
            error: function(e) {
                ok(false);
            }
        });

        simulateRemove();

        setTimeout(function() {
            ok(true);
            start();
        }, 100);
    });

    asyncTest("error is not fired when remove action returns valid JSON for initially rendered files", function() {
        uploadInstance = createUpload({ 
            files: [
                { name: "test.doc", size: 50, extension: ".doc"}
            ],
            error: function(e) {
                ok(false);
            }
        });

        simulateRemoveWithResponse(validJSON);

        setTimeout(function() {
            ok(true);
            start();
        }, 100);
    });

    test("error event arguments contain list of removed files for initially rendered files", function() {
        stop(1);

        uploadInstance = createUpload({ 
            files: [
                { name: "test.doc", size: 50, extension: ".doc"}
            ],
            error: function(e) {
                deepEqual(e.files, [ { name: "test.doc", extension: ".doc", size: 50 } ]);
                start();
            }
        });

        simulateRemoveError();
    });

    test("error event arguments contain remove operation name for initially rendered files", function() {
        stop(1);

        uploadInstance = createUpload({ 
            files: [
                { name: "test.doc", size: 50, extension: ".doc"}
            ],
            error: function(e) {
                equal(e.operation, "remove");
                start();
            }
        });

        simulateRemoveError();
    });

    test("error event arguments contains original XHR for remove action for initially rendered files", function() {
        stop(1);

        uploadInstance = createUpload({ 
            files: [
                { name: "test.doc", size: 50, extension: ".doc"}
            ],
            error: function(e) {
                notEqual(e.XMLHttpRequest, null);
                start();
            }
        });

        simulateRemoveWithResponse(errorResponse);
    });

    test("error event arguments contains XHR with responseText for remove action for initially rendered files", function() {
        stop(1);

        uploadInstance = createUpload({ 
            files: [
                { name: "test.doc", size: 50, extension: ".doc"}
            ],
            error: function(e) {
                equal(e.XMLHttpRequest.responseText, errorResponse);
                start();
            }
        });

        simulateRemoveWithResponse(errorResponse);
    });

    test("error event arguments contains XHR with status for remove action for initially rendered files", function() {
        stop(1);

        uploadInstance = createUpload({ 
            files: [
                { name: "test.doc", size: 50, extension: ".doc"}
            ],
            error: function(e) {
                equal(e.XMLHttpRequest.status, "200");
                start();
            }
        });

        simulateRemoveWithResponse(errorResponse);
    });