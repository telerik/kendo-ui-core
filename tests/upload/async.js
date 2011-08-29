
    test("remove icon is not rendered upon success if remove action is not configured", function() {
        uploadInstance = createUpload( { async: { saveUrl: "javascript:''", removeUrl: null } } );

        simulateUpload();
        equal($(".k-delete", uploadInstance.wrapper).length, 0);
    });

    test("remove icon is rendered upon success", function() {
        simulateUpload();

        equal($(".k-delete", uploadInstance.wrapper).length, 1);
    });

    test("k-loading is rendered when upload starts", function() {
        simulateFileSelect();
        equal($(".k-upload-files li.k-file. > span.k-icon.k-loading", uploadInstance.wrapper).length, 1);
    });

    test("k-loading is cleared upon success", function() {
        simulateUpload();

        equal($(".k-upload-files li.k-file. > span.k-icon.k-loading", uploadInstance.wrapper).length, 0);
    });

    test("uploading status text is rendered when upload starts", function() {
        simulateFileSelect();
        equal($(".k-upload-files .k-file > .k-icon", uploadInstance.wrapper).text(), "uploading");
    });

    test("k-success is rendered upon success", function() {
        simulateUpload();

        equal($(".k-upload-files li.k-file > .k-icon.k-success", uploadInstance.wrapper).length, 1);
    });

    test("uploaded status text is rendered upon success", function() {
        simulateUpload();

        equal($(".k-upload-files .k-file > .k-icon", uploadInstance.wrapper).text(), "uploaded");
    });

    test("k-fail is rendered upon upload error", function() {
        uploadInstance = createUpload();
        simulateUploadWithResponse(errorResponse);

        equal($(".k-upload-files li.k-file > .k-icon.k-fail", uploadInstance.wrapper).length, 1);
    });

    test("error status text is rendered upon upload error", function() {
        uploadInstance = createUpload();
        simulateUploadWithResponse(errorResponse);

        equal($(".k-upload-files .k-file > .k-icon", uploadInstance.wrapper).text(), "failed");
    });

    test("retry button is rendered upon upload error", function() {
        uploadInstance = createUpload();
        simulateUploadWithResponse(errorResponse);

        equal($(".k-upload-files li.k-file > .k-upload-action .k-retry", uploadInstance.wrapper).length, 1);
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
            equal($(".k-file", uploadInstance.wrapper).length, 0);
            start();
        }, 100);
    });

    asyncTest("disable prevents clicking remove", function () {
        simulateUpload();
        uploadInstance.disable();
        simulateRemove();
        setTimeout(function() {
            equal($(".k-file", uploadInstance.wrapper).length, 1);
            start();
        }, 100);
    });

    test("cancel icon is rendered", function() {
        simulateFileSelect();
        equal($(".k-upload-files li.k-file button.k-upload-action span.k-cancel", uploadInstance.wrapper).length, 1);
    });

    test("cancel icon is cleared upon success", function() {
        simulateUpload();

        equal($(".k-cancel", uploadInstance.wrapper).length, 0);
    });
