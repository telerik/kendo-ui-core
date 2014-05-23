function uploadSelection(createUpload){

test("new input is created after choosing a file", function() {
    var uploadInstance = createUpload();
    simulateFileSelect();
    equal($("input:visible", uploadInstance.wrapper).length, 1);
});

test("new input is created after choosing a file with no extension", function() {
    var uploadInstance = createUpload();
    simulateFileSelect("file");
    equal($("input:visible", uploadInstance.wrapper).length, 1);
});

test("new input has same id", function() {
    var uploadInstance = createUpload();
    simulateFileSelect();
    equal($("input:visible", uploadInstance.wrapper).attr("id"), "uploadInstance");
});

test("client-side object accessible throught new input", function() {
    var uploadInstance = createUpload();
    simulateFileSelect();
    ok($("input:visible", uploadInstance.wrapper).data("kendoUpload") === uploadInstance);
});

test("upload list is created", function() {
    var uploadInstance = createUpload();
    simulateFileSelect();
    equal($("> ul.k-upload-files", uploadInstance.wrapper).length, 1);
});

test("upload list is visible by default", function() {
    var uploadInstance = createUpload();
    simulateFileSelect();
    equal($("> ul.k-upload-files:visible", uploadInstance.wrapper).length, 1);
});

test("upload list is hidden when showFileList is false", function() {
    var uploadInstance = createUpload({showFileList: false});
    simulateFileSelect();
    equal($("> ul.k-upload-files:not(:visible)", uploadInstance.wrapper).length, 1);
});

test("file name is rendered", function() {
    var uploadInstance = createUpload();
    simulateFileSelect();
    equal($(".k-upload-files .k-file .k-filename", uploadInstance.wrapper).text(), "first.txt");
});

test("empty progress bar is rendered", function() {
    var uploadInstance = createUpload();
    simulateFileSelect();
    equal($(".k-upload-files li.k-file .k-progress", uploadInstance.wrapper).length, 1);
})

test("disable prevents selection", function () {
    var uploadInstance = createUpload();
    uploadInstance.disable();
    simulateFileSelect();
    equal($(".k-file", uploadInstance.wrapper).length, 0);
});

test("enable allows selection", function () {
    var uploadInstance = createUpload();
    uploadInstance.disable();
    uploadInstance.enable();
    simulateFileSelect();
    equal($(".k-file", uploadInstance.wrapper).length, 1);
});

test("file action button is rendered", function() {
    var uploadInstance = createUpload();
    simulateFileSelect();
    equal($(".k-upload-files li.k-file button.k-upload-action", uploadInstance.wrapper).length, 1);
});

test("selecting a second file replaces the first when multiple is set to false", function () {
    var uploadInstance = createUpload();
    uploadInstance.multiple = false;

    simulateFileSelect();
    simulateFileSelect();
    equal($(".k-file", uploadInstance.wrapper).length, 1);
});

test("file list is removed when the original form is reset", function() {
    var uploadInstance = createUpload();
    simulateFileSelect();
    $("#parentForm").trigger("reset");

    equal($(".k-upload-files", uploadInstance.wrapper).length, 0);
});

test("k-upload-empty is removed when a file is selected", function() {
    var uploadInstance = createUpload();
    simulateFileSelect();

    ok(!$(uploadInstance.wrapper).is(".k-upload-empty"));
});

test("data-uid attribute is added to the list item when a file is selected", function() {
    var uploadInstance = createUpload();
    simulateFileSelect();

    notEqual($(".k-file").data("uid"), undefined);
});

test("input element remains focused after selection", function() {
    var uploadInstance = createUpload();
    simulateFileSelect();

    equal(uploadInstance.element[0], document.activeElement);
});

test("next focusable element is focused on first tab key press", function(){
    var uploadInstance = createUpload();
    simulateFileSelect();
    var firstRemoveButton = uploadInstance.wrapper.find(".k-upload-action:first");

    $(document.activeElement).trigger( { type: "keydown", keyCode: kendo.keys.TAB } );

    equal(firstRemoveButton[0], document.activeElement);
});

}
