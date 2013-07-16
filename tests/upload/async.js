    test("Upload wrapper should contain k-upload-empty class", function() {
        ok($(uploadInstance.wrapper).is(".k-upload-empty"));
    });

    test("Upload wrapper should contain k-header class", function() {
        ok($(uploadInstance.wrapper).is(".k-header"));
    });

    test("k-upload-empty class is removed when file is selected", function() {
        simulateFileSelect();
        
        ok(!$(uploadInstance.wrapper).is(".k-upload-empty"));
    });

    test("k-upload-empty class is added again when file list is empty", function() {
        simulateFileSelect();
        $(".k-cancel", uploadInstance.wrapper).trigger("click");
        
        ok($(uploadInstance.wrapper).is(".k-upload-empty"));
    });

    test("remove icon is not rendered upon success if remove action is not configured", function() {
        uploadInstance = createUpload( { async: { saveUrl: "javascript:''", removeUrl: null } } );

        simulateUpload();
        equal($(".k-delete", uploadInstance.wrapper).length, 0);
    });

    test("status icon is rendered", function() {
        simulateFileSelect();
        
        equal($(".k-upload-files .k-file > span.k-icon", uploadInstance.wrapper).length, 1);
    });

    test("remove icon is rendered upon success", function() {
        simulateUpload();

        equal($(".k-delete", uploadInstance.wrapper).length, 1);
    });

    test("k-upload-status-total shows loading icon when upload starts", function(){
        simulateFileSelect();

        equal($(".k-upload-status-total .k-loading", uploadInstance.wrapper).length, 1);
    });

    test("k-upload-status-total loading icon span contains correct text when upload starts", function(){
        simulateFileSelect();

        equal($(".k-upload-status-total .k-loading", uploadInstance.wrapper).text(), "uploading");
    });

    test("k-upload-status-total contains correct text when upload starts", function(){
        simulateFileSelect();

        equal($(".k-upload-status-total", uploadInstance.wrapper).clone().children().remove().end().text(), "Uploading...");
    });

    test("k-upload-status-total text reverts back to Done if upload is canceled and there are other finished uploads", function(){
        simulateUpload();
        simulateFileSelect();
        $(".k-cancel", uploadInstance.wrapper).trigger("click");
        equal($(".k-upload-status-total", uploadInstance.wrapper).clone().children().remove().end().text(), "Done");
    });

    test("k-upload-status-total icon reverts back to warning if upload is canceled and there are other finished uploads", function(){
        simulateUpload();
        simulateFileSelect();
        $(".k-cancel", uploadInstance.wrapper).trigger("click");
        equal($(".k-upload-status-total .k-warning", uploadInstance.wrapper).length, 1);
    });

    test("k-upload-status-total shows warning icon when upload is finished", function(){
        simulateUpload();

        equal($(".k-upload-status-total .k-warning", uploadInstance.wrapper).length, 1);
    });

    test("k-upload-status-total contains correct text when upload is finished", function(){
        simulateUpload();

        equal($(".k-upload-status-total", uploadInstance.wrapper).clone().children().remove().end().text(), "Done");
    });

    test("k-upload-status-total warning icon span contains correct text when upload is finished", function(){
        simulateUpload();

        equal($(".k-upload-status-total .k-warning", uploadInstance.wrapper).text(), "uploaded");
    });

    test("k-file-progress is rendered when upload starts", function() {
        simulateFileSelect();
        
        equal($(".k-upload-files li.k-file-progress", uploadInstance.wrapper).length, 1);
    });

    test("k-file-progress is cleared upon success", function() {
        simulateUpload();

        equal($(".k-upload-files li.k-file-progress", uploadInstance.wrapper).length, 0);
    });

    test("uploading status text is rendered when upload starts", function() {
        simulateFileSelect();
        
        equal($(".k-upload-files .k-file > .k-icon", uploadInstance.wrapper).text(), "uploading");
    });

    test("k-file-success is rendered upon success", function() {
        simulateUpload();
        
        equal($(".k-upload-files li.k-file-success", uploadInstance.wrapper).length, 1);
    });

    test("uploaded status text is rendered upon success", function() {
        simulateUpload();
        
        equal($(".k-upload-files .k-file > .k-icon", uploadInstance.wrapper).text(), "uploaded");
    });

    test("k-file-error is rendered upon upload error", function() {
        uploadInstance = createUpload();
        simulateUploadWithResponse(errorResponse);

        equal($(".k-upload-files li.k-file-error", uploadInstance.wrapper).length, 1);
    });

    test("error status text is rendered upon upload error", function() {
        uploadInstance = createUpload();
        simulateUploadWithResponse(errorResponse);

        equal($(".k-upload-files .k-file > .k-icon", uploadInstance.wrapper).text(), "failed");
    });

    test("retry button is rendered upon upload error", function() {
        uploadInstance = createUpload();
        simulateUploadWithResponse(errorResponse);

        equal($(".k-upload-files li.k-file .k-upload-action .k-retry", uploadInstance.wrapper).length, 1);
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

    test("Rails CSRF token is sent to remove action", 1, function() {
        $("head").append('<meta content="authenticity_token" name="csrf-param" />');
        $("head").append('<meta content="42" name="csrf-token" />');

        $.mockjax(function(settings) {
            equal(settings.data["authenticity_token"], 42);
        });

        simulateUpload();
        simulateRemoveClick();

        $("meta[name='csrf-param'], meta[name='csrf-token']").remove();
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

    test("Progress event is raised", 1, function() {
        uploadInstance = createUpload({ progress:
            function() {
                ok(true);
            }
        });

        simulateUpload();
    });

    test("Progress event arguments contains percentComplete", 1, function() {
        uploadInstance = createUpload({ progress:
            function(e) {
                ok(e.percentComplete > 0);
            }
        });

        simulateUpload();
    });

    test("Progress event arguments contains files", 1, function() {
        uploadInstance = createUpload({ progress:
            function(e) {
                ok(e.files.length == 1);
            }
        });

        simulateUpload();
    });
