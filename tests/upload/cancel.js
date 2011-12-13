
    test("cancel fired when clicking cancel", 1, function() {
        uploadInstance = createUpload({ cancel:
            function(e) {
                ok(true);
            }
        });

        simulateFileSelect();
        $(".k-cancel", uploadInstance.wrapper).trigger("click");
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

    test("cancelling an upload should fire complete event", 1, function() {
        uploadInstance = createUpload({ complete:
            function(e) {
                ok(true);
            }
        });

        simulateFileSelect();
        $(".k-cancel", uploadInstance.wrapper).trigger("click");
    });
