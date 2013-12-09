(function(){

var uploadInstance, _supportsDrop,
    Upload = kendo.ui.Upload;

function createUpload(options) {
    removeHTML();
    copyUploadPrototype();

    $('#uploadInstance').kendoUpload(options);
    return $('#uploadInstance').data("kendoUpload");
}

function moduleSetup() {
    uploadInstance = createUpload();
    _supportsDrop = Upload.prototype._supportsDrop;
}

function moduleTeardown() {
    Upload.prototype._supportsDrop = _supportsDrop;
    removeHTML();
}

// -----------------------------------------------------------------------------------
module("enable / disable / toggle", {
    setup: moduleSetup,
    teardown: moduleTeardown
});

test("disable renders k-state-disabled class", function () {
    uploadInstance.disable();
    ok(uploadInstance.wrapper.hasClass("k-state-disabled"));
});

test("enable removes k-state-disabled class", function () {
    uploadInstance.disable();
    uploadInstance.enable();
    ok(!uploadInstance.wrapper.hasClass("k-state-disabled"));
});

test("enable does not disable the upload", function () {
    uploadInstance.enable();
    ok(!uploadInstance.wrapper.hasClass("k-state-disabled"));
});

test("initially disabled state is applied", function () {
    uploadInstance = createUpload({ enabled: false });
    ok(uploadInstance.wrapper.hasClass("k-state-disabled"));
});

test("toggle alternates between states", function() {
    uploadInstance.toggle();
    ok(uploadInstance.wrapper.hasClass("k-state-disabled"));
    uploadInstance.toggle();
    ok(!uploadInstance.wrapper.hasClass("k-state-disabled"));
});

// ------------------------------------------------------------
module("destroy", {
    setup: moduleSetup,
    teardown: moduleTeardown
});

test("unbinds form submit handler", function() {
    kendo.destroy($("#uploadInstance"));
    ok(!($("#parentForm").data("events") || {}).submit);
});

test("unbinds form reset handler", function() {
    kendo.destroy($("#uploadInstance"));
    ok(!($("#parentForm").data("events") || {}).reset);
});

test("unbinds drop zone handlers", function() {
    Upload.prototype._supportsDrop = function() { return true; };
    uploadInstance = createUpload();

    kendo.destroy($("#uploadInstance"));

    var dropZoneEvents = $(".k-dropzone").data("events") || {};
    ok(!dropZoneEvents.dragenter);
    ok(!dropZoneEvents.dragover);
    ok(!dropZoneEvents.drop);

    var documentEvents = $(document).data("events") || {};
    ok(!documentEvents.dragenter);
    ok(!documentEvents.dragover);
});

})();
