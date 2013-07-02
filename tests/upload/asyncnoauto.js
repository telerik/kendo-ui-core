
    test("upload button is rendered on select", function() {
        simulateFileSelect();

        equal($("> button.k-button.k-upload-selected", uploadInstance.wrapper).length, 1);
    });

    test("upload button is removed when upload starts", function() {
        simulateFileSelect();

        $(".k-upload-selected", uploadInstance.wrapper).trigger("click");

        equal($(".k-upload-selected", uploadInstance.wrapper).length, 0);
    });

    test("remove icon is rendered if remove action is configured", function() {
        simulateFileSelect();

        equal($(".k-delete", uploadInstance.wrapper).length, 1);
    });

    test("remove icon is not rendered if remove action is not configured", function() {
        uploadInstance = createUpload({ async: {"saveUrl":'javascript:;', autoUpload: false } });

        simulateFileSelect();

        equal($(".k-delete", uploadInstance.wrapper).length, 0);
    });

    test("clicking remove should remove file entry", function() {
        simulateFileSelect();

        simulateRemove();

        equal($(".k-file", uploadInstance.wrapper).length, 0);
    });

    test("removing last queued file should remove upload button", function() {
        simulateFileSelect();

        simulateRemove();

        equal($(".k-upload-selected", uploadInstance.wrapper).length, 0);
    });

    test("removing last queued file should remove upload button ignoring failed uploads", function() {
        simulateUploadWithResponse(errorResponse, function() {
            $(".k-upload-selected").click();
        });

        simulateFileSelect();
        simulateRemoveClick();
        equal($(".k-upload-selected", uploadInstance.wrapper).length, 0);
    });

    test("file list should remain if contains failed uploads", function() {
        simulateUploadWithResponse(errorResponse, function() {
            $(".k-upload-selected").click();
        });

        simulateFileSelect();
        simulateRemove();

        equal($(".k-upload-files", uploadInstance.wrapper).length, 1);
    });

    test("removing non-last file should not remove upload button", function() {
        uploadInstance._module.onIframeLoad = function() { };
        simulateFileSelect();
        simulateFileSelect();

        $(".k-delete:first", uploadInstance.wrapper).trigger("click");

        equal($(".k-upload-selected", uploadInstance.wrapper).length, 1);
    });

    test("k-upload-status-total is not rendered before upload is started", function() {
        simulateFileSelect();

        equal($(".k-upload-status-total", uploadInstance.wrapper).length, 0);
    });

    test("k-upload-status-total is rendered when upload is started", function() {
        simulateFileSelect();
        $(".k-upload-selected").click();
        
        equal($(".k-upload-status-total", uploadInstance.wrapper).length, 1);
    });