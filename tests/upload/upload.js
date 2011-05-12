
    test("upload fires when a file is about to be uploaded", function() {
        var uploadFired = false;
        uploadInstance = createUpload({ upload:
            function() {
                uploadFired = true;
            }
        });

        simulateFileSelect();

        ok(uploadFired);
    });

    test("upload does not fire until upload button is pressed", function() {
        var uploadFired = false;
        uploadInstance = createUpload({
            upload:
                function() {
                    uploadFired = true;
                },
            async: {"saveUrl": 'javascript:;', "removeUrl": 'javascript:;', autoUpload: false }
        });

        simulateFileSelect();

        ok(!uploadFired);

        $(".t-upload-selected", uploadInstance.wrapper).trigger("click");

        ok(uploadFired);
    });

    test("upload event contains list of files", function() {
        var files = null;
        uploadInstance = createUpload({ upload:
            function(e) {
                files = e.files;
            }
        });

        simulateFileSelect();

        assertSelectedFile(files);
    });

    test("cancelling the upload event removes the file entry", function() {
        uploadInstance = createUpload({ upload:
            function(e) {
                e.preventDefault();
            }
        });

        simulateFileSelect();

        equal($(".t-file", uploadInstance.wrapper).length, 0);
    });
