
test("select event fires upon file selection", function() {
    var selectFired = false;
    uploadInstance = createUpload({ "select" : (function() { selectFired = true; }) });

    simulateFileSelect();

    ok(selectFired);
});

test("select event contains information for single file", function() {
    var files = null;
    uploadInstance = createUpload({ "select" : (function(e) { files = e.files; }) });

    simulateFileSelect()

    assertSelectedFile(files);
});

test("select event contains information for multiple files", function() {
    var files = null;
    uploadInstance = createUpload({ "select" : (function(e) {
        files = e.files;
    }) });

    simulateMultipleFileSelect();

    assertMultipleSelectedFiles(files);
});

test("cancelling select event prevents file selection", function() {
    uploadInstance = createUpload({ "select" : (function(e) { e.preventDefault(); }) });

    simulateFileSelect()
    equal($(".k-upload-files li.k-file", uploadInstance.wrapper).length, 0);
});

test("cancelling select event clears active input", function() {
    uploadInstance = createUpload({ "select" : (function(e) { e.preventDefault(); }) });

    simulateFileSelect()
    equal($("#uploadInstance").val(), "");
});

test("cancelling select event removes input", function() {
    uploadInstance = createUpload({ "select" : (function(e) { e.preventDefault(); }) });

    simulateFileSelect()
    equal($("input", uploadInstance.wrapper).length, 1);
});

test("multiple selection is disabled in Opera", function() {
    var opera = kendo.support.browser.opera;
    kendo.support.browser.opera = true;

    uploadInstance = createUpload();
    equal(uploadInstance._supportsMultiple(), false);

    kendo.support.browser.opera = opera;
});

test("multiple selection is disabled in Safari on Windows", function() {
    var safari = kendo.support.browser.safari;
    kendo.support.browser.safari = true;

    uploadInstance = createUpload();
    uploadInstance._userAgent = function() {
        return "Mozilla/5.0 (Windows NT 6.1; WOW64) " +
        "AppleWebKit/534.57.2 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2";
    };

    equal(uploadInstance._supportsMultiple(), false);

    kendo.support.browser.safari = safari;
});

test("multiple selection is enabled in Safari", function() {
    var safari = kendo.support.browser.safari;
    kendo.support.browser.safari = true;

    uploadInstance = createUpload();
    uploadInstance._userAgent = function() {
        return "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) " +
        "AppleWebKit/534.55.3 (KHTML, like Gecko) Version/5.1.3 Safari/534.53.10";
    };

    equal(uploadInstance._supportsMultiple(), true);

    kendo.support.browser.safari = safari;
});

