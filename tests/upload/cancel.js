
    test("cancel fired when clicking cancel", function() {
        var cancelFired = false;
        uploadInstance = createUpload({ cancel:
            function(e) {
                cancelFired = true;
            }
        });

        simulateFileSelect();
        $(".k-cancel", uploadInstance.wrapper).trigger("click");

        ok(cancelFired);
    });

    test("cancel event arguments contain list of files", function() {
        var files = false;
        uploadInstance = createUpload({ cancel:
            function(e) {
                files = e.files;
            }
        });

        simulateFileSelect();
        $(".k-cancel", uploadInstance.wrapper).trigger("click");

        assertSelectedFile(files);
    });
