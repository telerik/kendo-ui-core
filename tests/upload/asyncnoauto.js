
    test("upload button is rendered on select", function() {
        simulateFileSelect();

        equal($("> button.t-button.t-upload-selected", uploadInstance.wrapper).length, 1);
    });

    test("upload button is removed when upload starts", function() {
        simulateFileSelect();

        $(".t-upload-selected", uploadInstance.wrapper).trigger("click");

        equal($(".t-upload-selected", uploadInstance.wrapper).length, 0);
    });

    test("remove icon is rendered if remove action is configured", function() {
        simulateFileSelect();

        equal($(".t-delete", uploadInstance.wrapper).length, 1);
    });

    test("remove icon is not rendered if remove action is not configured", function() {
        uploadInstance = createUpload({ async: {"saveUrl":'javascript:;', autoUpload: false } });

        simulateFileSelect();

        equal($(".t-delete", uploadInstance.wrapper).length, 0);
    });

    test("clicking remove should remove file entry", function() {
        simulateFileSelect();

        simulateRemove();

        equal($(".t-file", uploadInstance.wrapper).length, 0);
    });

    test("removing last queued file should remove upload button", function() {
        simulateFileSelect();

        simulateRemove();

        equal($(".t-upload-selected", uploadInstance.wrapper).length, 0);
    });

    test("removing non-last file should not remove upload button", function() {
        uploadInstance._module.onIframeLoad = function() { };
        simulateFileSelect();
        simulateFileSelect();

        $(".t-delete:first", uploadInstance.wrapper).trigger("click");

        equal($(".t-upload-selected", uploadInstance.wrapper).length, 1);
    });
