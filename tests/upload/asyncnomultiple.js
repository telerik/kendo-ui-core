function uploadAsyncNoMultiple(createUpload, simulateUpload) {
 test("adding a second file should call remove action (multiple = false)", 1, function() {
        var uploadInstance = createUpload({ multiple: false, async: {"saveUrl":'javascript:;',"removeUrl":'javascript:;'} });

        uploadInstance._submitRemove = function(data, onSuccess) {
            ok(true);
        };

        simulateUpload();
        simulateUpload();
    });

    test("adding a second file should not call remove action if it is not configured (multiple = false)", function() {
        var uploadInstance = createUpload({ multiple: false, async: {"saveUrl":'javascript:;'} });

        var removeCalled = false;
        uploadInstance._submitRemove = function(data, onSuccess) {
            removeCalled = true;
        };

        simulateUpload();
        simulateUpload();

        ok(!removeCalled);
    });

    test("adding a second file should remove first one from list every time (multiple = false)", function() {
        var uploadInstance = createUpload({ multiple: false, async: {"saveUrl":'javascript:;'} });

        simulateUpload();
        simulateUpload();

        equal($(".k-file", uploadInstance.wrapper).length, 1);
    });

    test("adding a second file should remove first one from list when remove action fails (multiple = false)", function() {
        var uploadInstance = createUpload({ multiple: false, async: {"saveUrl":'javascript:;', "removeUrl":'javascript:;'} });

        uploadInstance._submitRemove = function(fileNames, data, onSuccess, onError) {
            onError({ responseText: "fail" });
        }

        simulateUpload();
        simulateUpload();

        equal($(".k-file", uploadInstance.wrapper).length, 1);
    });
}