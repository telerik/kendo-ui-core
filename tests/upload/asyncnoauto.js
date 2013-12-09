function asyncNoAuto(createUpload, simulateUploadWithResponse, noAutoConfig, simulateRemove, errorResponse) {
    test("upload button is rendered on select", function() {
        var uploadInstance = createUpload(noAutoConfig);
        simulateFileSelect();

        equal($("> button.k-button.k-upload-selected", uploadInstance.wrapper).length, 1);
    });

    test("upload button is removed when upload starts", function() {
        var uploadInstance = createUpload(noAutoConfig);
        simulateFileSelect();

        $(".k-upload-selected", uploadInstance.wrapper).trigger("click");

        equal($(".k-upload-selected", uploadInstance.wrapper).length, 0);
    });

    test("remove icon is rendered if remove action is configured", function() {
        var uploadInstance = createUpload(noAutoConfig);
        simulateFileSelect();

        equal($(".k-delete", uploadInstance.wrapper).length, 1);
    });

    test("remove icon is not rendered if remove action is not configured", function() {
        var uploadInstance = createUpload(noAutoConfig);
        uploadInstance = createUpload({ async: {"saveUrl":'javascript:;', autoUpload: false } });

        simulateFileSelect();

        equal($(".k-delete", uploadInstance.wrapper).length, 0);
    });

    test("clicking remove should remove file entry", function() {
        var uploadInstance = createUpload(noAutoConfig);
        simulateFileSelect();

        simulateRemove();

        equal($(".k-file", uploadInstance.wrapper).length, 0);
    });

    test("removing last queued file should remove upload button", function() {
        var uploadInstance = createUpload(noAutoConfig);
        simulateFileSelect();

        simulateRemove();

        equal($(".k-upload-selected", uploadInstance.wrapper).length, 0);
    });

    test("removing last queued file should remove upload button ignoring failed uploads", function() {
        var uploadInstance = createUpload(noAutoConfig);
        simulateUploadWithResponse(errorResponse, function() {
            $(".k-upload-selected").click();
        });

        simulateFileSelect();
        simulateRemoveClick();
        equal($(".k-upload-selected", uploadInstance.wrapper).length, 0);
    });

    test("removing last queued file should remove upload button ignoring successful uploads", function() {
        var uploadInstance = createUpload(noAutoConfig);
        simulateUploadWithResponse("", function() {
            $(".k-upload-selected").click();
        });

        simulateFileSelect();
        simulateRemoveClick(1);

        equal($(".k-upload-selected", uploadInstance.wrapper).length, 0);
    });

    test("file list should remain if contains failed uploads", function() {
        var uploadInstance = createUpload(noAutoConfig);
        simulateUploadWithResponse(errorResponse, function() {
            $(".k-upload-selected").click();
        });

        simulateFileSelect();
        simulateRemove();

        equal($(".k-upload-files", uploadInstance.wrapper).length, 1);
    });

    test("removing non-last file should not remove upload button", function() {
        var uploadInstance = createUpload(noAutoConfig);
        uploadInstance._module.onIframeLoad = function() { };
        simulateFileSelect();
        simulateFileSelect();

        $(".k-delete:first", uploadInstance.wrapper).trigger("click");

        equal($(".k-upload-selected", uploadInstance.wrapper).length, 1);
    });

    test("k-upload-status-total is not rendered before upload is started", function() {
        var uploadInstance = createUpload(noAutoConfig);
        simulateFileSelect();

        equal($(".k-upload-status-total", uploadInstance.wrapper).length, 0);
    });

    test("k-upload-status-total is rendered when upload is started", function() {
        var uploadInstance = createUpload(noAutoConfig);
        simulateFileSelect();
        $(".k-upload-selected").click();
        
        equal($(".k-upload-status-total", uploadInstance.wrapper).length, 1);
    });
}