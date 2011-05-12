
    test("remove icon is not rendered upon success if remove action is not configured", function() {
        uploadInstance = createUpload( { async: { saveUrl: "javascript:''", removeUrl: null } } );

        simulateUpload();
        equal($(".t-delete", uploadInstance.wrapper).length, 0);
    });

    test("remove icon is rendered upon success", function() {
        simulateUpload();

        equal($(".t-delete", uploadInstance.wrapper).length, 1);
    });

    test("t-loading is rendered when upload starts", function() {
        simulateFileSelect();
        equal($(".t-upload-files li.t-file. > span.t-icon.t-loading", uploadInstance.wrapper).length, 1);
    });

    test("t-loading is cleared upon success", function() {
        simulateUpload();

        equal($(".t-upload-files li.t-file. > span.t-icon.t-loading", uploadInstance.wrapper).length, 0);
    });

    test("uploading status text is rendered when upload starts", function() {
        simulateFileSelect();
        equal($(".t-upload-files .t-file > .t-icon", uploadInstance.wrapper).text(), "uploading");
    });

    test("t-success is rendered upon success", function() {
        simulateUpload();

        equal($(".t-upload-files li.t-file > .t-icon.t-success", uploadInstance.wrapper).length, 1);
    });

    test("uploaded status text is rendered upon success", function() {
        simulateUpload();

        equal($(".t-upload-files .t-file > .t-icon", uploadInstance.wrapper).text(), "uploaded");
    });

    test("t-fail is rendered upon upload error", function() {
        uploadInstance = createUpload();
        simulateUploadWithResponse(errorResponse);

        equal($(".t-upload-files li.t-file > .t-icon.t-fail", uploadInstance.wrapper).length, 1);
    });

    test("error status text is rendered upon upload error", function() {
        uploadInstance = createUpload();
        simulateUploadWithResponse(errorResponse);

        equal($(".t-upload-files .t-file > .t-icon", uploadInstance.wrapper).text(), "failed");
    });

    test("retry button is rendered upon upload error", function() {
        uploadInstance = createUpload();
        simulateUploadWithResponse(errorResponse);

        equal($(".t-upload-files li.t-file > .t-upload-action .t-retry", uploadInstance.wrapper).length, 1);
    });

    test("clicking remove should call remove action", function() {
        var removeCalled = false;
        uploadInstance._submitRemove = function(data, onSuccess) {
            removeCalled = true;
        };

        simulateUpload();
        simulateRemove();

        ok(removeCalled);
    });

    test("Anti-Forgery Token is sent to remove action", 1, function() {
        $(document.body).append("<input type='hidden' name='__RequestVerificationToken' value='42' />");

        $.mockjax(function(settings) {
            equal(settings.data["__RequestVerificationToken"], 42);
        });

        simulateUpload();
        simulateRemoveClick();

        $("input[name='__RequestVerificationToken']").remove();
    });

    asyncTest("clicking remove should remove file entry upon success", function() {
        simulateUpload();
        simulateRemove();

        setTimeout(function() {
            equal($(".t-file", uploadInstance.wrapper).length, 0);
            start();
        }, 100);
    });

    asyncTest("disable prevents clicking remove", function () {
        simulateUpload();
        uploadInstance.disable();
        simulateRemove();
        setTimeout(function() {
            equal($(".t-file", uploadInstance.wrapper).length, 1);
            start();
        }, 100);
    });

    test("cancel icon is rendered", function() {
        simulateFileSelect();
        equal($(".t-upload-files li.t-file button.t-upload-action span.t-cancel", uploadInstance.wrapper).length, 1);
    });

    test("cancel icon is cleared upon success", function() {
        simulateUpload();

        equal($(".t-cancel", uploadInstance.wrapper).length, 0);
    });
