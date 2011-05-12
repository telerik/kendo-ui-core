
    test("new input is created after choosing a file", function() {
        simulateFileSelect();
        equal($("input:visible", uploadInstance.wrapper).length, 1);
    });

    test("new input has same id", function() {
        simulateFileSelect();
        equal($("input:visible", uploadInstance.wrapper).attr("id"), "uploadInstance");
    });

    test("client-side object accessible throught new input", function() {
        simulateFileSelect();
        ok($("input:visible", uploadInstance.wrapper).data("kendoUpload") === uploadInstance);
    });

    test("upload list is created", function() {
        simulateFileSelect();
        equal($("> ul.t-upload-files", uploadInstance.wrapper).length, 1);
    });

    test("upload list is visible by default", function() {
        simulateFileSelect();
        equal($("> ul.t-upload-files:visible", uploadInstance.wrapper).length, 1);
    });

    test("upload list is hidden when showFileList is false", function() {
        uploadInstance = createUpload({showFileList: false});
        simulateFileSelect();
        equal($("> ul.t-upload-files:not(:visible)", uploadInstance.wrapper).length, 1);
    });

    test("file name is rendered", function() {
        simulateFileSelect();
        equal($(".t-upload-files .t-file .t-filename", uploadInstance.wrapper).text(), "first.txt");
    });

    test("status icon is rendered", function() {
        simulateFileSelect();
        equal($(".t-upload-files .t-file > span.t-icon", uploadInstance.wrapper).length, 1);
    });

    test("progress bar is not rendered", function() {
        simulateFileSelect();
        equal($(".t-upload-files li.t-file .t-progress", uploadInstance.wrapper).length, 0);
    })

    test("disable prevents selection", function () {
        uploadInstance.disable();
        simulateFileSelect();
        equal($(".t-file", uploadInstance.wrapper).length, 0);
    });

    test("enable allows selection", function () {
        uploadInstance.disable();
        uploadInstance.enable();
        simulateFileSelect();
        equal($(".t-file", uploadInstance.wrapper).length, 1);
    });

    test("file action button is rendered", function() {
        simulateFileSelect();
        equal($(".t-upload-files li.t-file button.t-upload-action", uploadInstance.wrapper).length, 1);
    });

    test("selecting a second file replaces the first when multiple is set to false", function () {
        uploadInstance.multiple = false;

        simulateFileSelect();
        simulateFileSelect();
        equal($(".t-file", uploadInstance.wrapper).length, 1);
    });

    test("files are removed when the original form is reset", function() {
        simulateFileSelect();
        $("#parentForm").trigger("reset");

        equal($(".t-file", uploadInstance.wrapper).length, 0);
    });
