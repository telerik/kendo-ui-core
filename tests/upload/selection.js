
    test("new input is created after choosing a file", function() {
        simulateFileSelect();
        equal($("input:visible", uploadInstance.wrapper).length, 1);
    });

    test("new input is created after choosing a file with no extension", function() {
        simulateFileSelect("file");
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
        equal($("> ul.k-upload-files", uploadInstance.wrapper).length, 1);
    });

    test("upload list is visible by default", function() {
        simulateFileSelect();
        equal($("> ul.k-upload-files:visible", uploadInstance.wrapper).length, 1);
    });

    test("upload list is hidden when showFileList is false", function() {
        uploadInstance = createUpload({showFileList: false});
        simulateFileSelect();
        equal($("> ul.k-upload-files:not(:visible)", uploadInstance.wrapper).length, 1);
    });

    test("file name is rendered", function() {
        simulateFileSelect();
        equal($(".k-upload-files .k-file .k-filename", uploadInstance.wrapper).text(), "first.txt");
    });

    test("empty progress bar is rendered", function() {
        simulateFileSelect();
        equal($(".k-upload-files li.k-file .k-progress", uploadInstance.wrapper).length, 1);
    })

    test("disable prevents selection", function () {
        uploadInstance.disable();
        simulateFileSelect();
        equal($(".k-file", uploadInstance.wrapper).length, 0);
    });

    test("enable allows selection", function () {
        uploadInstance.disable();
        uploadInstance.enable();
        simulateFileSelect();
        equal($(".k-file", uploadInstance.wrapper).length, 1);
    });

    test("file action button is rendered", function() {
        simulateFileSelect();
        equal($(".k-upload-files li.k-file button.k-upload-action", uploadInstance.wrapper).length, 1);
    });

    test("selecting a second file replaces the first when multiple is set to false", function () {
        uploadInstance.multiple = false;

        simulateFileSelect();
        simulateFileSelect();
        equal($(".k-file", uploadInstance.wrapper).length, 1);
    });

    test("file list is removed when the original form is reset", function() {
        simulateFileSelect();
        $("#parentForm").trigger("reset");

        equal($(".k-upload-files", uploadInstance.wrapper).length, 0);
    });

    test("k-upload-empty is removed when a file is selected", function() {
        simulateFileSelect();

        ok(!$(uploadInstance.wrapper).is(".k-upload-empty"));
    });
