

 test("adding a second file should call remove action (multiple = false)", 1, function() {
        uploadInstance = createUpload({ multiple: false, async: {"saveUrl":'javascript:;',"removeUrl":'javascript:;'} });

        uploadInstance._submitRemove = function(data, onSuccess) {
            ok(true);
        };

        simulateUpload();
        simulateUpload();
    });

    test("adding a second file should not call remove action if it is not configured (multiple = false)", function() {
        uploadInstance = createUpload({ multiple: false, async: {"saveUrl":'javascript:;'} });

        var removeCalled = false;
        uploadInstance._submitRemove = function(data, onSuccess) {
            removeCalled = true;
        };

        simulateUpload();
        simulateUpload();

        ok(!removeCalled);
    });

