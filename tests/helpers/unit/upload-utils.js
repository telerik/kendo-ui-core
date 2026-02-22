import '@progress/kendo-ui/src/kendo.upload.js';
import { asyncTest } from './async-utils.js';

export function copyUploadPrototype() {
    createHTML();
    Mocha.fixture.find("#testbed").html(
        Mocha.fixture.find("#prototype").html().replace(/uploadPrototype/g, "uploadInstance").replace(/file/g, "text")
    );
}

export function simulateDrop(srcFiles, uploadInstance) {
    let dropEvent = $.Event("drop", {
        originalEvent: {
            dataTransfer: {
                files: srcFiles
            }
        },
        stopPropagation: function() { },
        preventDefault: function() { }
    });
    $(uploadInstance.wrapper).find(".k-dropzone").trigger(dropEvent);
}

export function createHTML() {
    $("#testbed_container").remove();
    let html = '<div id="testbed_container"><div id="prototype" style="display:none">' +
        '<div class="k-upload k-header k-upload-empty">' +
        '<div class="k-dropzone k-upload-dropzone">' +
        '<div class="k-upload-button-wrap">' +
        '<div class="k-button k-upload-button" tabindex="0">' +
        '<span>Select...</span>' +
        '</div>' +
        '<input id="uploadPrototype" class="k-hidden" name="uploadPrototype" type="file" />' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<form id="parentForm" action="javascript:return \'\';" onsubmit="return false;" method="post">' +
        '<div id="testbed">' +
        '</div>' +
        '</form></div>';

    $(html).appendTo(Mocha.fixture);
}
export function removeHTML() {
    kendo.destroy(Mocha.fixture);
    Mocha.fixture.empty();
}

export function simulateFileSelect(fileName) {
    let clickEvent = $.Event("click");
    $("#uploadInstance").trigger(clickEvent);
    if (!clickEvent.isDefaultPrevented()) {
        $("#uploadInstance").val(fileName || "first.txt").trigger("change");
    }
}

export function simulateSingleFileSelect(fileName, fileSize) {
    let uploadInstance = $("#uploadInstance").data("kendoUpload");
    uploadInstance._onInputChange({
        target: {
            files: [
                { name: fileName || "first.txt", size: fileSize || 100 }
            ]
        }
    }
    );
}

export function simulateMultipleFileSelect() {
    let uploadInstance = $("#uploadInstance").data("kendoUpload");
    uploadInstance._onInputChange({
        target: {
            files: [
                { name: "first.txt", size: 1 },
                { fileName: "second.txt", fileSize: 2 } // fileName and fileSize are used by Firefox (versions before 3.6)
            ]
        }
    }
    );
}

export function simulateMultipleFileSelectWithFileInfo(files) {
    let uploadInstance = $("#uploadInstance").data("kendoUpload");
    uploadInstance._onInputChange({
        target: { files: files }
    });
}

export function getFileListMock() {
    return [
        { name: "first.txt", size: 1, extension: ".txt" },
        { name: "second.txt", size: 2, extension: ".txt" }
    ];
}

export function simulateRemoveClick(fileIndex) {
    let uploadInstance = $("#uploadInstance").data("kendoUpload");
    $(".k-svg-i-x,.k-svg-i-x", uploadInstance.wrapper).eq(fileIndex || 0).trigger("click");
}

export function assertSelectedFile(files) {
    // Exclude the raw file and uid from comparison
    delete files[0].rawFile;
    delete files[0].uid;

    assert.deepEqual(files, [{ name: "first.txt", extension: ".txt", size: null }]);
}

export function assertMultipleSelectedFiles(files) {
    // Exclude the raw file and uid from comparison
    delete files[0].rawFile;
    delete files[1].rawFile;

    delete files[0].uid;
    delete files[1].uid;

    assert.deepEqual(files, [
        { name: "first.txt", extension: ".txt", size: 1 },
        { name: "second.txt", extension: ".txt", size: 2 }
    ]);
}

/* ---------------------- GLOBAL TESTS BEGIN HERE ---------------------- */

export function uploadAsync(createUpload, simulateUpload, simulateUploadWithResponse, simulateRemove, errorResponse) {
    let isCsp = (function noUnsafeEval() {
        try {
            /* jshint -W031, -W054 */
            let fn = new Function('');
            /* jshint +W031, +W054 */
            return false;
        } catch (e) {
            return true;
        }
    })();

    it("Upload wrapper should contain k-upload-empty class", function() {
        let uploadInstance = createUpload();
        assert.isOk($(uploadInstance.wrapper).is(".k-upload-empty"));
    });

    it("Upload wrapper should contain k-header class", function() {
        let uploadInstance = createUpload();
        assert.isOk($(uploadInstance.wrapper).is(".k-header"));
    });

    it("k-upload-empty class is removed when file is selected", function() {
        let uploadInstance = createUpload();
        simulateFileSelect();

        assert.isOk(!$(uploadInstance.wrapper).is(".k-upload-empty"));
    });

    it("k-upload-empty class is added again when file list is empty", function() {
        let uploadInstance = createUpload();
        simulateFileSelect();
        $(".k-svg-i-cancel", uploadInstance.wrapper).trigger("click");

        assert.isOk($(uploadInstance.wrapper).is(".k-upload-empty"));
    });

    it("remove icon is not rendered upon success if remove action is not configured", function() {
        let uploadInstance = createUpload({ async: { saveUrl: "javascript:;", removeUrl: null } });

        simulateUpload();
        assert.equal($(".k-svg-i-x", uploadInstance.wrapper).length, 0);
    });

    it("status icon wrapper is rendered", function() {
        let uploadInstance = createUpload();
        simulateFileSelect();

        assert.equal($(".k-upload-files .k-file span.k-file-icon-wrapper", uploadInstance.wrapper).length, 1);
    });

    it("status icon is rendered", function() {
        let uploadInstance = createUpload();
        simulateFileSelect();

        assert.equal($(".k-upload-files .k-file-icon-wrapper span.k-file-icon.k-svg-icon", uploadInstance.wrapper).length, 1);
    });

    it("remove icon is rendered upon success", function() {
        let uploadInstance = createUpload();
        simulateUpload();

        assert.equal($(".k-svg-i-x", uploadInstance.wrapper).length, 1);
    });

    it("k-upload-status shows loading icon when upload starts", function() {
        let uploadInstance = createUpload();
        simulateFileSelect();

        assert.equal($(".k-upload-status .k-svg-i-upload", uploadInstance.wrapper).length, 1);
    });

    it("k-upload-status contains correct text when upload starts", function() {
        let uploadInstance = createUpload();
        simulateFileSelect();

        assert.equal($(".k-upload-status", uploadInstance.wrapper).clone().children().remove().end().text(), "Uploading...");
    });

    it("k-upload-status text reverts back to Done if upload is canceled and there are other finished uploads", function() {
        let uploadInstance = createUpload();
        simulateUpload();
        simulateFileSelect();
        $(".k-svg-i-cancel", uploadInstance.wrapper).trigger("click");
        assert.equal($(".k-upload-status", uploadInstance.wrapper).clone().children().remove().end().text(), "Done");
    });

    it("k-upload-status icon reverts back to success if upload is canceled and there are no failed uploads", function() {
        let uploadInstance = createUpload();
        simulateUpload();
        simulateFileSelect();
        $(".k-svg-i-cancel", uploadInstance.wrapper).trigger("click");
        assert.equal($(".k-upload-status .k-i-check,.k-upload-status .k-svg-i-check", uploadInstance.wrapper).length, 1);
    });

    it("k-upload-status icon reverts back to warning if upload is canceled and there are failed uploads", function() {
        let uploadInstance = createUpload();

        simulateUploadWithResponse(errorResponse);
        simulateFileSelect();
        $(".k-svg-i-cancel", uploadInstance.wrapper).trigger("click");
        assert.equal($(".k-upload-status .k-svg-i-exclamation-circle", uploadInstance.wrapper).length, 1);
    });

    it("k-upload-status shows warning icon when upload has not finished successfully", function() {
        let uploadInstance = createUpload();
        simulateUploadWithResponse(errorResponse);

        assert.equal($(".k-upload-status .k-svg-i-exclamation-circle", uploadInstance.wrapper).length, 1);
    });

    it("k-upload-status shows success icon when upload has finished successfully", function() {
        let uploadInstance = createUpload();
        simulateUpload();

        assert.equal($(".k-upload-status .k-i-check,.k-upload-status .k-svg-i-check", uploadInstance.wrapper).length, 1);
    });

    it("k-upload-status contains correct text when upload is finished", function() {
        let uploadInstance = createUpload();
        simulateUpload();

        assert.equal($(".k-upload-status", uploadInstance.wrapper).clone().children().remove().end().text(), "Done");
    });

    it("file size is hidden once a file is uploaded", function() {
        let uploadInstance = createUpload();
        simulateUpload();

        assert.equal($(".k-file-size.k-hidden", uploadInstance.wrapper).length, 1);
    });

    it("success message appears on successful upload", function() {
        let uploadInstance = createUpload();
        simulateUpload();

        assert.equal($(".k-file-success .k-file-validation-message", uploadInstance.wrapper).length, 1);
    });

    it("error message appears on failed upload", function() {
        let uploadInstance = createUpload();
        simulateUploadWithResponse(errorResponse);

        assert.equal($(".k-file-error .k-file-validation-message", uploadInstance.wrapper).length, 1);
    });

    it("Header status icon is displayed when selecting invalid file", function() {
        let uploadInstance = createUpload({
            validation: {
                allowedExtensions: [".txt"]
            }
        });

        simulateFileSelect("invalid.png");

        assert.equal($(".k-upload-status .k-svg-i-exclamation-circle", uploadInstance.wrapper).length, 1);
    });

    it("Header status icon is updated when selecting invalid file after valid", function() {
        let uploadInstance = createUpload({
            validation: {
                allowedExtensions: [".txt"]
            }
        });

        simulateUpload();
        simulateFileSelect("invalid.png");

        assert.equal($(".k-upload-status .k-svg-i-exclamation-circle", uploadInstance.wrapper).length, 1);
    });

    it("Header status icon is updated when only successfully uploaded files are left", function() {
        let uploadInstance = createUpload({
            validation: {
                allowedExtensions: [".txt"]
            }
        });

        simulateUpload();
        simulateFileSelect("invalid.png");
        simulateRemoveClick(1);

        assert.equal($(".k-upload-status .k-i-check,.k-upload-status .k-svg-i-check", uploadInstance.wrapper).length, 1);
    });

    it("k-file-progress is rendered when upload starts", function() {
        let uploadInstance = createUpload();
        simulateFileSelect();

        assert.equal($(".k-upload-files li.k-file-progress", uploadInstance.wrapper).length, 1);
    });

    it("k-file-progress is cleared upon success", function() {
        let uploadInstance = createUpload();
        simulateUpload();

        assert.equal($(".k-upload-files li.k-file-progress", uploadInstance.wrapper).length, 0);
    });

    it("uploading status text is rendered when upload starts", function() {
        let uploadInstance = createUpload();
        simulateFileSelect();

        assert.equal($(".k-upload-files .k-file span.k-file-state", uploadInstance.wrapper).text(), "uploading");
    });

    it("k-file-success is rendered upon success", function() {
        let uploadInstance = createUpload();
        simulateUpload();

        assert.equal($(".k-upload-files li.k-file-success", uploadInstance.wrapper).length, 1);
    });

    it("uploaded status text is rendered upon success", function() {
        let uploadInstance = createUpload();
        simulateUpload();

        assert.equal($(".k-upload-files .k-file span.k-file-state", uploadInstance.wrapper).text(), "uploaded");
    });

    it("k-file-error is rendered upon upload error", function() {
        let uploadInstance = createUpload();
        simulateUploadWithResponse(errorResponse);

        assert.equal($(".k-upload-files li.k-file-error", uploadInstance.wrapper).length, 1);
    });

    it("error status text is rendered upon upload error", function() {
        let uploadInstance = createUpload();
        simulateUploadWithResponse(errorResponse);

        assert.equal($(".k-upload-files .k-file span.k-file-state", uploadInstance.wrapper).text(), "failed");
    });

    it("retry button is rendered upon upload error", function() {
        let uploadInstance = createUpload();
        simulateUploadWithResponse(errorResponse);
        assert.equal($(".k-upload-files li.k-file .k-upload-action .k-i-arrow-rotate-cw-small,.k-upload-files li.k-file .k-upload-action .k-svg-i-arrow-rotate-cw-small", uploadInstance.wrapper).length, 1);
    });

    it("clicking remove should call remove action", function() {
        let uploadInstance = createUpload();
        let removeCalled = false;
        uploadInstance._submitRemove = function(data, onSuccess) {
            removeCalled = true;
        };

        simulateUpload();
        simulateRemove();

        assert.isOk(removeCalled);
    });

    it("Anti-Forgery Token is sent to remove action", function() {
        $(document.body).append("<input type='hidden' name='__RequestVerificationToken' value='42' />");

        $.mockjax(function(settings) {
            assert.equal(settings.data["__RequestVerificationToken"], 42);
        });

        simulateUpload();
        simulateRemoveClick();

        $("input[name='__RequestVerificationToken']").remove();
    });

    it("Rails CSRF token is sent to remove action", function() {
        $("head").append('<meta content="authenticity_token" name="csrf-param" />');
        $("head").append('<meta content="42" name="csrf-token" />');

        $.mockjax(function(settings) {
            assert.equal(settings.data["authenticity_token"], 42);
        });

        simulateUpload();
        simulateRemoveClick();

        $("meta[name='csrf-param'], meta[name='csrf-token']").remove();
    });


    asyncTest("clicking remove should remove file entry upon success", function(done) {
        let uploadInstance = createUpload();
        simulateUpload();
        simulateRemove();

        setTimeout(function() {
            done(() => assert.equal($(".k-file", uploadInstance.wrapper).length, 0));
        }, 100);
    });

    asyncTest("disable prevents clicking remove", function(done) {
        let uploadInstance = createUpload();
        simulateUpload();
        uploadInstance.disable();
        simulateRemove();
        setTimeout(function() {
            done(() => assert.equal($(".k-file", uploadInstance.wrapper).length, 1));
        }, 100);
    });

    it("cancel icon is rendered", function() {
        let uploadInstance = createUpload();
        simulateFileSelect();
        assert.equal($(".k-upload-files li.k-file button.k-upload-action span.k-svg-i-cancel", uploadInstance.wrapper).length, 1);
    });

    it("cancel icon is cleared upon success", function() {
        let uploadInstance = createUpload();
        simulateUpload();

        assert.equal($(".k-svg-i-cancel", uploadInstance.wrapper).length, 0);
    });

    it("aria-label is rendered for cancel button", function() {
        let uploadInstance = createUpload({
            localization: {
                cancel: "cancel the file upload"
            }
        });
        simulateFileSelect();
        let ariaLabelValue = $(".k-upload-action", uploadInstance.wrapper).attr("aria-label");
        assert.equal(ariaLabelValue, "cancel the file upload");
    });

    it("aria-label is rendered for cancel button", function() {
        let uploadInstance = createUpload({
            localization: {
                cancel: "cancel the file upload"
            }
        });
        simulateFileSelect();
        let ariaLabelValue = $(".k-upload-action", uploadInstance.wrapper).attr("aria-label");
        assert.isOk(typeof ariaLabelValue !== typeof undefined && ariaLabelValue !== false);
    });

    it("aria-label is rendered for cancel button when templates are defined", function() {
        let uploadInstance = createUpload({
            template: isCsp ? ({ name, size, files }) => `<div><p>Name: ${name}</p>` +
                `<p>Size: ${size} bytes</p><p>Extension: ${files[0].extension}</p>` +
                "<button type='button' class='k-upload-action' style='position: absolute; top: 0; right: 0;'></button>" +
                "</div>"
                : "<div><p>Name: #=name#</p>" +
                "<p>Size: #=size# bytes</p><p>Extension: #=files[0].extension#</p>" +
                "<button type='button' class='k-upload-action' style='position: absolute; top: 0; right: 0;'></button>" +
                "</div>",
            localization: {
                cancel: "cancel the file upload"
            }
        });
        simulateFileSelect();
        let ariaLabelValue = $(".k-upload-action span", uploadInstance.wrapper).attr("aria-label");
        assert.equal(ariaLabelValue, "cancel the file upload");
    });

    it("aria-label is rendered for cancel button when templates are defined", function() {
        let uploadInstance = createUpload({
            template: isCsp ? ({ name, size, files }) => `<div><p>Name: ${name}</p>` +
                `<p>Size: ${size} bytes</p><p>Extension: ${files[0].extension}</p>` +
                "<button type='button' class='k-upload-action' style='position: absolute; top: 0; right: 0;'></button>" +
                "</div>"
                : "<div><p>Name: #=name#</p>" +
                "<p>Size: #=size# bytes</p><p>Extension: #=files[0].extension#</p>" +
                "<button type='button' class='k-upload-action' style='position: absolute; top: 0; right: 0;'></button>" +
                "</div>",
            localization: {
                cancel: "cancel the file upload"
            }
        });
        simulateFileSelect();
        let ariaLabelValue = $(".k-upload-action span", uploadInstance.wrapper).attr("aria-label");
        assert.isOk(typeof ariaLabelValue !== typeof undefined && ariaLabelValue !== false);
    });

    it("Progress event is raised", function() {
        let uploadInstance = createUpload({
            progress:
                function() {
                    assert.isOk(true);
                }
        });

        simulateUpload();
    });

    it("Progress event arguments contains percentComplete", function() {
        let uploadInstance = createUpload({
            progress:
                function(e) {
                    assert.isOk(e.percentComplete > 0);
                }
        });

        simulateUpload();
    });

    it("Progress event arguments contains files", function() {
        let uploadInstance = createUpload({
            progress:
                function(e) {
                    assert.isOk(e.files.length == 1);
                }
        });

        simulateUpload();
    });

    it("k-file-error class is removed on upload retry", function() {
        let uploadInstance = createUpload();
        let performUploadCalled = false;

        simulateUploadWithResponse(errorResponse);

        uploadInstance._module.performUpload = function() { performUploadCalled = true; };

        $('.k-i-arrow-rotate-cw-small,.k-svg-i-arrow-rotate-cw-small', uploadInstance.wrapper).trigger("click");

        assert.isOk(performUploadCalled);
    });
}

export function asyncNoAuto(createUpload, simulateUploadWithResponse, noAutoConfig, simulateRemove, errorResponse) {
    it("upload button is rendered on select", function() {
        let uploadInstance = createUpload(noAutoConfig);
        simulateFileSelect();

        assert.equal($(".k-actions > button.k-button.k-upload-selected", uploadInstance.wrapper).length, 1);
    });

    it("clear button is rendered on select", function() {
        let uploadInstance = createUpload(noAutoConfig);
        simulateFileSelect();

        assert.equal($(".k-actions > button.k-button.k-clear-selected", uploadInstance.wrapper).length, 1);
    });

    it("upload button is removed when upload starts", function() {
        let uploadInstance = createUpload(noAutoConfig);
        simulateFileSelect();

        $(".k-upload-selected", uploadInstance.wrapper).trigger("click");

        assert.equal($(".k-upload-selected", uploadInstance.wrapper).length, 0);
    });

    it("upload method triggers upload process", function() {
        let uploadInstance = createUpload(noAutoConfig);
        simulateFileSelect();

        uploadInstance.upload();

        assert.equal($(".k-file-progress", uploadInstance.wrapper).length, 1);
    });

    it("clear button is removed when upload starts", function() {
        let uploadInstance = createUpload(noAutoConfig);
        simulateFileSelect();

        $(".k-upload-selected", uploadInstance.wrapper).trigger("click");

        assert.equal($(".k-clear-selected", uploadInstance.wrapper).length, 0);
    });

    it("remove icon is rendered if remove action is configured", function() {
        let uploadInstance = createUpload(noAutoConfig);
        simulateFileSelect();

        assert.equal($(".k-svg-i-x", uploadInstance.wrapper).length, 2);
    });

    it("remove icon is rendered even if remove action is not configured", function() {
        let uploadInstance = createUpload(noAutoConfig);
        uploadInstance = createUpload({ async: { "saveUrl": 'javascript:;', autoUpload: false } });

        simulateFileSelect();

        assert.equal($(".k-svg-i-x", uploadInstance.wrapper).length, 2);
    });

    it("clicking remove should remove file entry", function() {
        let uploadInstance = createUpload(noAutoConfig);
        simulateFileSelect();

        simulateRemove();

        assert.equal($(".k-file", uploadInstance.wrapper).length, 0);
    });

    it("removing last queued file should remove upload button", function() {
        let uploadInstance = createUpload(noAutoConfig);
        simulateFileSelect();

        simulateRemove();

        assert.equal($(".k-upload-selected", uploadInstance.wrapper).length, 0);
    });

    it("removing last queued file should remove clear button", function() {
        let uploadInstance = createUpload(noAutoConfig);
        simulateFileSelect();

        simulateRemove();

        assert.equal($(".k-clear-selected", uploadInstance.wrapper).length, 0);
    });

    it("removing last queued file should remove upload button ignoring failed uploads", function() {
        let uploadInstance = createUpload(noAutoConfig);
        simulateUploadWithResponse(errorResponse, function() {
            $(".k-upload-selected").click();
        });

        simulateFileSelect();
        simulateRemoveClick(1);
        assert.equal($(".k-upload-selected", uploadInstance.wrapper).length, 0);
    });

    it("removing last queued file should remove clear button ignoring failed uploads", function() {
        let uploadInstance = createUpload(noAutoConfig);
        simulateUploadWithResponse(errorResponse, function() {
            $(".k-upload-selected").click();
        });

        simulateFileSelect();
        simulateRemoveClick(1);
        assert.equal($(".k-clear-selected", uploadInstance.wrapper).length, 0);
    });

    it("removing last queued file should remove upload button ignoring successful uploads", function() {
        let uploadInstance = createUpload(noAutoConfig);
        simulateUploadWithResponse("", function() {
            $(".k-upload-selected").click();
        });

        simulateFileSelect();
        simulateRemoveClick(1);

        assert.equal($(".k-upload-selected", uploadInstance.wrapper).length, 0);
    });

    it("removing last queued file should remove clear button ignoring successful uploads", function() {
        let uploadInstance = createUpload(noAutoConfig);
        simulateUploadWithResponse("", function() {
            $(".k-upload-selected").click();
        });

        simulateFileSelect();
        simulateRemoveClick(1);

        assert.equal($(".k-clear-selected", uploadInstance.wrapper).length, 0);
    });

    it("file list should remain if contains failed uploads", function() {
        let uploadInstance = createUpload(noAutoConfig);
        simulateUploadWithResponse(errorResponse, function() {
            $(".k-upload-selected").click();
        });

        simulateFileSelect();
        simulateRemove();

        assert.equal($(".k-upload-files", uploadInstance.wrapper).length, 1);
    });

    it("removing non-last file should not remove upload button", function() {
        let uploadInstance = createUpload(noAutoConfig);
        uploadInstance._module.onIframeLoad = function() { };
        simulateFileSelect();
        simulateFileSelect();

        $(".k-svg-i-x:first", uploadInstance.wrapper).trigger("click");

        assert.equal($(".k-upload-selected", uploadInstance.wrapper).length, 1);
    });

    it("removing non-last file should not remove clear button", function() {
        let uploadInstance = createUpload(noAutoConfig);
        uploadInstance._module.onIframeLoad = function() { };
        simulateFileSelect();
        simulateFileSelect();

        $(".k-svg-i-x:first", uploadInstance.wrapper).trigger("click");

        assert.equal($(".k-clear-selected", uploadInstance.wrapper).length, 1);
    });

    it("k-upload-status is not rendered before upload is started", function() {
        let uploadInstance = createUpload(noAutoConfig);
        simulateFileSelect();

        assert.equal($(".k-upload-status", uploadInstance.wrapper).length, 0);
    });

    it("k-upload-status is rendered when upload is started", function() {
        let uploadInstance = createUpload(noAutoConfig);
        simulateFileSelect();
        $(".k-upload-selected").click();

        assert.equal($(".k-upload-status", uploadInstance.wrapper).length, 1);
    });

    it("file upload is prevented if the widget is disabled", function() {
        let uploadInstance = createUpload(noAutoConfig);
        simulateFileSelect();

        uploadInstance.disable();
        $(".k-upload-selected").click();

        assert.equal($(".k-upload-selected", uploadInstance.wrapper).length, 1);
    });

    it("clearing files is prevented if the widget is disabled", function() {
        let uploadInstance = createUpload(noAutoConfig);
        simulateFileSelect();

        uploadInstance.disable();
        $(".k-clear-selected").click();

        assert.equal($(".k-clear-selected", uploadInstance.wrapper).length, 1);
    });

    it("file upload is successful if the widget was disabled and reenabled", function() {
        let uploadInstance = createUpload(noAutoConfig);
        simulateFileSelect();

        uploadInstance.disable();
        uploadInstance.enable();
        $(".k-upload-selected").click();

        assert.equal($(".k-upload-selected", uploadInstance.wrapper).length, 0);
    });

    it("clearing files is working if the widget is not disabled", function() {
        let uploadInstance = createUpload(noAutoConfig);
        simulateFileSelect();

        $(".k-clear-selected").click();

        assert.equal($(".k-file", uploadInstance.wrapper).length, 0);
    });

    it("clear button is removed after clearing the files list", function() {
        let uploadInstance = createUpload(noAutoConfig);
        simulateFileSelect();

        $(".k-clear-selected").click();

        assert.equal($(".k-clear-selected", uploadInstance.wrapper).length, 0);
    });

    it("action buttons container is rendered on select", function() {
        let uploadInstance = createUpload(noAutoConfig);
        simulateFileSelect();

        assert.equal($(".k-actions", uploadInstance.wrapper).length, 1);
    });

    it("action buttons container is removed when upload starts", function() {
        let uploadInstance = createUpload(noAutoConfig);
        simulateFileSelect();

        $(".k-upload-selected", uploadInstance.wrapper).trigger("click");

        assert.equal($(".k-actions", uploadInstance.wrapper).length, 0);
    });
}

export function uploadAsyncNoMultiple(createUpload, simulateUpload) {
    it("adding a second file should call remove action (multiple = false)", function() {
        let uploadInstance = createUpload({ multiple: false, async: { "saveUrl": 'javascript:;', "removeUrl": 'javascript:;' } });

        uploadInstance._submitRemove = function(data, onSuccess) {
            assert.isOk(true);
        };

        simulateUpload();
        simulateUpload();
    });

    it("adding a second file should not call remove action if it is not configured (multiple = false)", function() {
        let uploadInstance = createUpload({ multiple: false, async: { "saveUrl": 'javascript:;' } });

        let removeCalled = false;
        uploadInstance._submitRemove = function(data, onSuccess) {
            removeCalled = true;
        };

        simulateUpload();
        simulateUpload();

        assert.isOk(!removeCalled);
    });

    it("adding a second file should remove first one from list every time (multiple = false)", function() {
        let uploadInstance = createUpload({ multiple: false, async: { "saveUrl": 'javascript:;' } });

        simulateUpload();
        simulateUpload();

        assert.equal($(".k-file", uploadInstance.wrapper).length, 1);
    });

    it("adding a second file should remove first one from list when remove action fails (multiple = false)", function() {
        let uploadInstance = createUpload({ multiple: false, async: { "saveUrl": 'javascript:;', "removeUrl": 'javascript:;' } });

        uploadInstance._submitRemove = function(fileNames, data, onSuccess, onError) {
            onError({ responseText: "fail" });
        };

        simulateUpload();
        simulateUpload();

        assert.equal($(".k-file", uploadInstance.wrapper).length, 1);
    });
}

export function uploadCancel(createUpload) {
    it("cancel fired when clicking cancel", function() {
        let uploadInstance = createUpload({
            cancel:
                function(e) {
                    assert.isOk(true);
                }
        });

        simulateFileSelect();
        $(".k-svg-i-cancel", uploadInstance.wrapper).trigger("click");
    });

    it("cancel event arguments contain list of files", function() {
        let files = false;
        let uploadInstance = createUpload({
            cancel:
                function(e) {
                    files = e.files;
                }
        });

        simulateFileSelect();
        $(".k-svg-i-cancel", uploadInstance.wrapper).trigger("click");

        assertSelectedFile(files);
    });

    it("cancelling an upload should fire complete event", function() {
        let uploadInstance = createUpload({
            complete:
                function(e) {
                    assert.isOk(true);
                }
        });

        simulateFileSelect();
        $(".k-svg-i-cancel", uploadInstance.wrapper).trigger("click");
    });
}

export function uploadClearEvent(params) {
    let createUpload = params.createUpload;
    let simulateFileSelect = params.simulateFileSelect;
    let noAutoConfig = params.noAutoConfig;
    it("clear event is fired when clear button is clicked", function() {
        let noAutoConfigClearEvent = $.extend({}, noAutoConfig, {
            clear: function(e) {

                assert.isOk(true);
            }
        });
        let uploadInstance = createUpload(noAutoConfigClearEvent);

        simulateFileSelect();
        $(".k-clear-selected", uploadInstance.wrapper).trigger("click");
    });

    it("cancelling clear event prevents files to be removed", function() {
        let noAutoConfigClearEvent = $.extend({}, noAutoConfig, {
            clear: function(e) {

                e.preventDefault();
            }
        });
        let uploadInstance = createUpload(noAutoConfigClearEvent);

        simulateFileSelect();
        $(".k-clear-selected", uploadInstance.wrapper).trigger("click");
        assert.equal($(".k-upload-files li.k-file", uploadInstance.wrapper).length, 1);
    });
}

export function uploadError(params) {
    let createUpload = params.createUpload;
    let simulateUpload = params.simulateUpload;
    let simulateUploadWithResponse = params.simulateUploadWithResponse;
    let errorResponse = params.errorResponse;
    let validJSON = params.validJSON;
    let simulateRemoveWithResponse = params.simulateRemoveWithResponse;
    let simulateRemove = params.simulateRemove;
    let simulateRemoveError = params.simulateRemoveError;

    it("error is fired when upload action returns response that is not JSON", function() {
        let errorFired = false;
        let uploadInstance = createUpload({
            error:
                function() {
                    errorFired = true;
                }
        });

        simulateUploadWithResponse(errorResponse);

        assert.isOk(errorFired);
    });

    it("error is not fired when upload action returns empty response", function() {
        let errorFired = false;
        let uploadInstance = createUpload({
            error:
                function() {
                    errorFired = true;
                }
        });

        simulateUploadWithResponse("");

        assert.isOk(!errorFired);
    });

    it("error is not fired when upload action returns valid JSON", function() {
        let errorFired = false;
        let uploadInstance = createUpload({
            error:
                function() {
                    errorFired = true;
                }
        });

        simulateUploadWithResponse(validJSON);

        assert.isOk(!errorFired);
    });

    it("error event arguments contain list of uploaded files", function() {
        let files = null;
        let uploadInstance = createUpload({
            error:
                function(e) {
                    files = e.files;
                }
        });

        simulateUploadWithResponse(errorResponse);

        assertSelectedFile(files);
    });

    it("error event arguments contain original XHR", function() {
        let xhr = null;
        let uploadInstance = createUpload({
            error:
                function(e) {
                    xhr = e.XMLHttpRequest;
                }
        });

        simulateUploadWithResponse(errorResponse);

        assert.notEqual(xhr, null);
    });

    it("error event arguments contain XHR object with responseText", function() {
        let xhr = null;
        let uploadInstance = createUpload({
            error:
                function(e) {
                    xhr = e.XMLHttpRequest;
                }
        });

        simulateUploadWithResponse(errorResponse);

        assert.equal(xhr.responseText, errorResponse);
    });

    // -----------------------------------------------------------------------------------
    // -----------------------------------------------------------------------------------
    asyncTest("error is raised when remove action returns error code", function(done) {
        let uploadInstance = createUpload({
            error:
                function(e) {
                    done(() => assert.isOk(true));
                }
        });

        simulateUpload();
        simulateRemoveError();
    });

    asyncTest("error is raised when remove action returns response that is not JSON", function(done) {
        let uploadInstance = createUpload({
            error:
                function(e) {
                    done(() => assert.isOk(true));
                }
        });

        simulateUpload();
        simulateRemoveWithResponse(errorResponse);
    });

    asyncTest("error is not fired when remove action returns empty response", function(done) {
        let uploadInstance = createUpload({
            error:
                function(e) {
                    assert.isOk(false);
                }
        });

        simulateUpload();
        simulateRemove();

        setTimeout(function() {
            done(() => assert.isOk(true));
        }, 100);
    });

    asyncTest("error is not fired when remove action returns valid JSON", function(done) {
        let uploadInstance = createUpload({
            error:
                function(e) {
                    assert.isOk(false);
                }
        });

        simulateUpload();
        simulateRemoveWithResponse(validJSON);

        setTimeout(function() {
            done(() => assert.isOk(true));
        }, 100);
    });

    asyncTest("error event arguments contain list of removed files", function(done) {
        let uploadInstance = createUpload({
            error:
                function(e) {
                    done(() => assertSelectedFile(e.files));
                }
        });

        simulateUpload();
        simulateRemoveError();
    });

    asyncTest("error event arguments contain remove operation name", function(done) {
        let uploadInstance = createUpload({
            error:
                function(e) {
                    done(() => assert.equal(e.operation, "remove"));
                }
        });

        simulateUpload();
        simulateRemoveError();
    });

    asyncTest("error event arguments contains original XHR for remove action", function(done) {
        let uploadInstance = createUpload({
            error:
                function(e) {
                    done(() => assert.notEqual(e.XMLHttpRequest, null));
                }
        });

        simulateUpload();
        simulateRemoveWithResponse(errorResponse);
    });

    asyncTest("error event arguments contains XHR with responseText for remove action", function(done) {
        let uploadInstance = createUpload({
            error:
                function(e) {
                    done(() => assert.equal(e.XMLHttpRequest.responseText, errorResponse));
                }
        });

        simulateUpload();
        simulateRemoveWithResponse(errorResponse);
    });

    asyncTest("error event arguments contains XHR with status for remove action", function(done) {
        let uploadInstance = createUpload({
            error:
                function(e) {
                    done(() => assert.equal(e.XMLHttpRequest.status, "200"));
                }
        });

        simulateUpload();
        simulateRemoveWithResponse(errorResponse);
    });


    // -----------------------------------------------------------------------------------
    // -----------------------------------------------------------------------------------
    //Error tests for initial files

    asyncTest("error is raised when remove action returns error code for initially rendered files", function(done) {
        let uploadInstance = createUpload({
            files: [
                { name: "test.doc", size: 50, extension: ".doc" }
            ],
            error: function(e) {
                done(() => assert.isOk(true));
            }
        });

        simulateRemoveError();
    });

    asyncTest("error is raised when remove action returns response that is not JSON for initially rendered files", function(done) {

        let uploadInstance = createUpload({
            files: [
                { name: "test.doc", size: 50, extension: ".doc" }
            ],
            error: function(e) {
                done(() => assert.isOk(true));
            }
        });

        simulateRemoveWithResponse(errorResponse);
    });

    asyncTest("error is not fired when remove action returns empty response for initially rendered files", function(done) {
        let uploadInstance = createUpload({
            files: [
                { name: "test.doc", size: 50, extension: ".doc" }
            ],
            error: function(e) {
                assert.isOk(false);
            }
        });

        simulateRemove();

        setTimeout(function() {
            done(() => assert.isOk(true));
        }, 100);
    });

    asyncTest("error is not fired when remove action returns valid JSON for initially rendered files", function(done) {
        let uploadInstance = createUpload({
            files: [
                { name: "test.doc", size: 50, extension: ".doc" }
            ],
            error: function(e) {
                assert.isOk(false);
            }
        });

        simulateRemoveWithResponse(validJSON);

        setTimeout(function() {
            done(() => assert.isOk(true));
        }, 100);
    });

    asyncTest("error event arguments contain list of removed files for initially rendered files", function(done) {
        let uploadInstance = createUpload({
            files: [
                { name: "test.doc", size: 50, extension: ".doc" }
            ],
            error: function(e) {
                delete e.files[0].uid;

                done(() => assert.deepEqual(e.files, [{ name: "test.doc", extension: ".doc", size: 50 }]));
            }
        });

        simulateRemoveError();
    });

    asyncTest("error event arguments contain remove operation name for initially rendered files", function(done) {
        let uploadInstance = createUpload({
            files: [
                { name: "test.doc", size: 50, extension: ".doc" }
            ],
            error: function(e) {
                done(() => assert.equal(e.operation, "remove"));
            }
        });

        simulateRemoveError();
    });

    asyncTest("error event arguments contains original XHR for remove action for initially rendered files", function(done) {
        let uploadInstance = createUpload({
            files: [
                { name: "test.doc", size: 50, extension: ".doc" }
            ],
            error: function(e) {
                done(() => assert.notEqual(e.XMLHttpRequest, null));
            }
        });

        simulateRemoveWithResponse(errorResponse);
    });

    asyncTest("error event arguments contains XHR with responseText for remove action for initially rendered files", function(done) {
        let uploadInstance = createUpload({
            files: [
                { name: "test.doc", size: 50, extension: ".doc" }
            ],
            error: function(e) {
                done(() => assert.equal(e.XMLHttpRequest.responseText, errorResponse));
            }
        });

        simulateRemoveWithResponse(errorResponse);
    });

    asyncTest("error event arguments contains XHR with status for remove action for initially rendered files", function(done) {
        let uploadInstance = createUpload({
            files: [
                { name: "test.doc", size: 50, extension: ".doc" }
            ],
            error: function(e) {
                done(() => assert.equal(e.XMLHttpRequest.status, "200"));
            }
        });

        simulateRemoveWithResponse(errorResponse);
    });
}

export function uploadSelect(createUpload) {

    it("select event fires upon file selection", function() {
        let selectFired = false;
        let uploadInstance = createUpload({ "select": (function() { selectFired = true; }) });

        simulateFileSelect();

        assert.isOk(selectFired);
    });

    it("select event contains information for single file", function() {
        let files = null;
        let uploadInstance = createUpload({ "select": (function(e) { files = e.files; }) });

        simulateFileSelect();

        assertSelectedFile(files);
    });

    it("select event contains information for multiple files", function() {
        let files = null;
        let uploadInstance = createUpload({
            "select": (function(e) {
                files = e.files;
            })
        });

        simulateMultipleFileSelect();

        assertMultipleSelectedFiles(files);
    });

    it("files information in select event contains uids", function() {
        let uid = null;

        let uploadInstance = createUpload({
            "select": (function(e) {
                uid = e.files[0].uid;
            })
        });

        simulateFileSelect();

        assert.notEqual(uid, null);
    });

    it("cancelling select event prevents file selection", function() {
        let uploadInstance = createUpload({ "select": (function(e) { e.preventDefault(); }) });

        simulateFileSelect();
        assert.equal($(".k-upload-files li.k-file", uploadInstance.wrapper).length, 0);
    });

    it("cancelling select event clears active input", function() {
        let uploadInstance = createUpload({ "select": (function(e) { e.preventDefault(); }) });

        simulateFileSelect();
        assert.equal($("#uploadInstance").val(), "");
    });

    it("cancelling select event removes input", function() {
        let uploadInstance = createUpload({ "select": (function(e) { e.preventDefault(); }) });

        simulateFileSelect();
        assert.equal($("input", uploadInstance.wrapper).length, 1);
    });

    it("multiple selection is disabled in Opera", function() {
        let opera = kendo.support.browser.opera;
        kendo.support.browser.opera = true;

        let uploadInstance = createUpload();
        assert.equal(uploadInstance._supportsMultiple(), false);

        kendo.support.browser.opera = opera;
    });

    it("multiple selection is disabled in Safari on Windows", function() {
        let safari = kendo.support.browser.safari;
        kendo.support.browser.safari = true;

        let uploadInstance = createUpload();
        uploadInstance._userAgent = function() {
            return "Mozilla/5.0 (Windows NT 6.1; WOW64) " +
                "AppleWebKit/534.57.2 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2";
        };

        assert.equal(uploadInstance._supportsMultiple(), false);

        kendo.support.browser.safari = safari;
    });

    it("multiple selection is enabled in Safari", function() {
        let safari = kendo.support.browser.safari;
        kendo.support.browser.safari = true;

        let uploadInstance = createUpload();
        uploadInstance._userAgent = function() {
            return "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) " +
                "AppleWebKit/534.55.3 (KHTML, like Gecko) Version/5.1.3 Safari/534.53.10";
        };

        assert.equal(uploadInstance._supportsMultiple(), true);

        kendo.support.browser.safari = safari;
    });
}

export function uploadSelection(createUpload) {

    it("new input is created after choosing a file", function() {
        let uploadInstance = createUpload();
        simulateFileSelect();
        assert.equal($("input:not(:visible)", uploadInstance.wrapper).length, uploadInstance._supportsFormData() ? 2 : 1);
    });

    it("new input is created after choosing a file with no extension", function() {
        let uploadInstance = createUpload();
        simulateFileSelect("file");
        assert.equal($("input:not(:visible)", uploadInstance.wrapper).length, uploadInstance._supportsFormData() ? 2 : 1);
    });

    it("new input has same id", function() {
        let uploadInstance = createUpload();
        simulateFileSelect();
        assert.equal($("input:not(:visible):last", uploadInstance.wrapper).attr("id"), "uploadInstance");
    });

    it("client-side object accessible throught new input", function() {
        let uploadInstance = createUpload();
        simulateFileSelect();
        assert.isOk($("input:not(:visible):last", uploadInstance.wrapper).data("kendoUpload") === uploadInstance);
    });

    it("upload list is created", function() {
        let uploadInstance = createUpload();
        simulateFileSelect();
        assert.equal($("> ul.k-upload-files", uploadInstance.wrapper).length, 1);
    });

    it("upload list is visible by default", function() {
        let uploadInstance = createUpload();
        simulateFileSelect();
        assert.equal($("> ul.k-upload-files:visible", uploadInstance.wrapper).length, 1);
    });

    it("upload list is hidden when showFileList is false", function() {
        let uploadInstance = createUpload({ showFileList: false });
        simulateFileSelect();
        assert.equal($("> ul.k-upload-files:not(:visible)", uploadInstance.wrapper).length, 1);
    });

    it("file name is rendered", function() {
        let uploadInstance = createUpload();
        simulateFileSelect();
        assert.equal($(".k-upload-files .k-file .k-file-name", uploadInstance.wrapper).text(), "first.txt");
    });

    it("empty progress bar is rendered", function() {
        let uploadInstance = createUpload();
        simulateFileSelect();
        assert.equal($(".k-upload-files li.k-file .k-progressbar", uploadInstance.wrapper).length, 1);
    });

    it("disable prevents selection", function() {
        let uploadInstance = createUpload();
        uploadInstance.disable();
        simulateFileSelect();
        assert.equal($(".k-file", uploadInstance.wrapper).length, 0);
    });

    it("enable allows selection", function() {
        let uploadInstance = createUpload();
        uploadInstance.disable();
        uploadInstance.enable();
        simulateFileSelect();
        assert.equal($(".k-file", uploadInstance.wrapper).length, 1);
    });

    it("file action button is rendered", function() {
        let uploadInstance = createUpload();
        simulateFileSelect();
        assert.equal($(".k-upload-files li.k-file button.k-upload-action", uploadInstance.wrapper).length, 1);
    });

    it("selecting a second file replaces the first when multiple is set to false", function() {
        let uploadInstance = createUpload();
        uploadInstance.multiple = false;

        simulateFileSelect();
        simulateFileSelect();
        assert.equal($(".k-file", uploadInstance.wrapper).length, 1);
    });

    it("file list is removed when the original form is reset", function() {
        let uploadInstance = createUpload();
        simulateFileSelect();
        $("#parentForm").trigger("reset");

        assert.equal($(".k-upload-files", uploadInstance.wrapper).length, 0);
    });

    it("k-upload-empty is removed when a file is selected", function() {
        let uploadInstance = createUpload();
        simulateFileSelect();

        assert.isOk(!$(uploadInstance.wrapper).is(".k-upload-empty"));
    });

    it("data-uid attribute is added to the list item when a file is selected", function() {
        let uploadInstance = createUpload();
        simulateFileSelect();

        assert.notEqual($(".k-file").data("uid"), undefined);
    });

    it("upload button is focused after upload", function() {
        let uploadInstance = createUpload();
        simulateFileSelect();

        assert.equal(uploadInstance.wrapper.find(".k-upload-button")[0], document.activeElement);
    });

    it("Total file count and size are displayed when selecting multiple files", function() {
        let uploadInstance = createUpload({
            async: {
                "saveUrl": 'javascript:;',
                "removeUrl": 'javascript:;',
                autoUpload: false,
                batch: true
            }
        });

        simulateMultipleFileSelectWithFileInfo([
            { name: "first.txt", size: 1000 },
            { name: "second.txt", size: 2000 }
        ]);

        let totalSize = (3000 / 1024).toFixed(2);

        assert.equal($(".k-file-summary", uploadInstance.wrapper).text(), "Total: 2 files, " + totalSize + " KB");
    });

    it("copy icon is rendered when multiple files are selected", function() {
        let uploadInstance = createUpload({
            async: {
                "saveUrl": 'javascript:;',
                "removeUrl": 'javascript:;',
                autoUpload: false,
                batch: true
            }
        });

        simulateMultipleFileSelectWithFileInfo([
            { name: "first.txt", size: 1000 },
            { name: "second.txt", size: 2000 }
        ]);

        let copyIcon = uploadInstance.wrapper.find(".k-i-copy,.k-svg-i-copy");

        assert.equal(copyIcon.length, 1);
    });

    it("Total size is displayed in MB if larger than 1024 KB", function() {
        let uploadInstance = createUpload({
            async: {
                "saveUrl": 'javascript:;',
                "removeUrl": 'javascript:;',
                autoUpload: false,
                batch: true
            }
        });

        simulateMultipleFileSelectWithFileInfo([
            { name: "first.txt", size: 1000000 },
            { name: "second.txt", size: 2000000 }
        ]);

        let totalSize = ((3000000 / 1024) / 1024).toFixed(2);

        assert.equal($(".k-file-summary", uploadInstance.wrapper).text(), "Total: 2 files, " + totalSize + " MB");
    });

    it("Invalid files message is displayed when multiple files selected at once and displayed in a single item", function() {
        let uploadInstance = createUpload({
            async: {
                "saveUrl": 'javascript:;',
                "removeUrl": 'javascript:;',
                autoUpload: false,
                batch: true
            },
            validation: {
                allowedExtensions: [".png"]
            }
        });

        simulateMultipleFileSelectWithFileInfo([
            { name: "first.txt", size: 1000 },
            { name: "second.png", size: 2000 }
        ]);

        assert.equal($(".k-file-validation-message", uploadInstance.wrapper).text(), "Invalid file(s). Please check file upload requirements.");
    });

    // ensures also double encoding is handled properly
    it("Uploaded file name is encoded properly when rendered", function() {
        let uploadInstance = createUpload();
        let faultyFileName = "<script>console.log(1)<\/script>.jpg";

        simulateFileSelect(faultyFileName);

        assert.equal($(".k-file-name", uploadInstance.wrapper).text(), faultyFileName);
    });

    // ensures also double encoding is handled properly
    it("Uploaded files' names are encoded properly when rendered", function() {
        let uploadInstance = createUpload({
            async: {
                "saveUrl": 'javascript:;',
                "removeUrl": 'javascript:;',
                autoUpload: false,
                batch: true
            },
        });

        let initialFiles = [
            {
                "name": "<script>console.log(1)</script>.jpg",
                "extension": ".jpg",
                "size": 318821
            },
            {
                "name": "<script>console.log('encoded')</script>.jpg",
                "extension": ".jpg",
                "size": 318821
            }
        ];

        simulateMultipleFileSelectWithFileInfo(initialFiles);

        let fileNames = $(".k-file-name", uploadInstance.wrapper).map(function() { return $(this).text(); });

        assert.equal(fileNames[0], "<script>console.log(1)<\/script>.jpg");
        assert.equal(fileNames[1], "<script>console.log('encoded')<\/script>.jpg");
    });
}

export function validation(params) {
    let createUpload = params.createUpload;
    let autoConfig = {
        async: {
            "saveUrl": 'javascript:;',
            "removeUrl": 'javascript:;'
        }
    };

    let noAutoConfig = {
        async: {
            "saveUrl": 'javascript:;',
            "removeUrl": 'javascript:;',
            autoUpload: false
        }
    };

    it("Upload without validation allows selection of any file type", function() {
        let uploadInstance = createUpload(noAutoConfig);
        let allFiles;

        simulateFileSelect("first.jpg");
        simulateFileSelect("second.txt");

        allFiles = uploadInstance.getFiles();

        assert.isOk(allFiles[0].validationErrors === undefined);
        assert.isOk(allFiles[1].validationErrors === undefined);
    });

    it("Upload with file extension validation adds validation error", function() {
        let uploadInstance = createUpload($.extend({}, noAutoConfig, {
            validation: {
                allowedExtensions: [".jpg"]
            }
        }));
        let allFiles;

        simulateFileSelect("first.jpg");
        simulateFileSelect("second.txt");

        allFiles = uploadInstance.getFiles();

        assert.isOk(allFiles[0].validationErrors === undefined);
        assert.isOk(allFiles[1].validationErrors && allFiles[1].validationErrors[0] === "invalidFileExtension");
    });

    it("Upload with file extension validation adds validation message", function() {
        let uploadInstance = createUpload($.extend({}, noAutoConfig, {
            validation: {
                allowedExtensions: [".jpg"]
            }
        }));

        simulateFileSelect("second.png");

        assert.equal($(".k-file span.k-file-validation-message").text(), uploadInstance.localization.invalidFileExtension);
    });

    it("Upload with file extension validation allows defining extension without a dot at the begining", function() {
        let uploadInstance = createUpload($.extend({}, noAutoConfig, {
            validation: {
                allowedExtensions: ["jpg"]
            }
        }));

        simulateFileSelect("first.jpg");
        simulateFileSelect("second.txt");

        let allFiles = uploadInstance.getFiles();

        assert.isOk(allFiles[0].validationErrors === undefined);
        assert.isOk(allFiles[1].validationErrors && allFiles[1].validationErrors[0] === "invalidFileExtension");
    });

    it("Upload with file extension validation adds validation message", function() {
        let uploadInstance = createUpload($.extend({}, noAutoConfig, {
            validation: {
                allowedExtensions: ["jpg"]
            }
        }));

        simulateFileSelect("second.png");

        assert.equal($(".k-file span.k-file-validation-message").text(), uploadInstance.localization.invalidFileExtension);
    });

    it("Upload with file extension validation pass validation when extension name does not start with dot or contains uppercase", function() {
        let uploadInstance = createUpload($.extend({}, noAutoConfig, {
            validation: {
                allowedExtensions: ["JPg", ".tXt"]
            }
        }));

        simulateFileSelect("first.jpg");
        simulateFileSelect("second.txt");

        let allFiles = uploadInstance.getFiles();

        assert.isOk(allFiles[0].validationErrors === undefined);
        assert.isOk(allFiles[1].validationErrors === undefined);
    });

    it("Upload with max file size validation adds validation error", function() {
        let uploadInstance = createUpload($.extend({}, noAutoConfig, {
            validation: {
                maxFileSize: 1
            }
        }));
        let allFiles;

        simulateMultipleFileSelect();
        allFiles = uploadInstance.getFiles();

        assert.isOk(allFiles[0].validationErrors === undefined);
        assert.isOk(allFiles[1].validationErrors && allFiles[1].validationErrors[0] === "invalidMaxFileSize");
    });

    it("Upload with max file size validation adds validation message", function() {
        let uploadInstance = createUpload($.extend({}, noAutoConfig, {
            validation: {
                maxFileSize: 1
            }
        }));

        simulateSingleFileSelect("first.png", 2);

        assert.equal($(".k-file span.k-file-validation-message").text(), uploadInstance.localization.invalidMaxFileSize);
    });

    it("Upload with min file size validation adds validation error", function() {
        let uploadInstance = createUpload($.extend({}, noAutoConfig, {
            validation: {
                minFileSize: 2
            }
        }));
        let allFiles;

        simulateMultipleFileSelect();
        allFiles = uploadInstance.getFiles();

        assert.isOk(allFiles[0].validationErrors && allFiles[0].validationErrors[0] === "invalidMinFileSize");
        assert.isOk(allFiles[1].validationErrors === undefined);
    });

    it("Upload with min file size validation adds validation message", function() {
        let uploadInstance = createUpload($.extend({}, noAutoConfig, {
            validation: {
                minFileSize: 2
            }
        }));

        simulateSingleFileSelect("first.png", 1);

        assert.equal($(".k-file span.k-file-validation-message").text(), uploadInstance.localization.invalidMinFileSize);
    });

    it("Upload file extension validation works for multiple allowed extensions", function() {
        let uploadInstance = createUpload($.extend({}, noAutoConfig, {
            validation: {
                allowedExtensions: [".jpg", ".png"]
            }
        }));
        let allFiles;

        simulateFileSelect("first.jpg");
        simulateFileSelect("second.png");
        simulateFileSelect("third.txt");

        allFiles = uploadInstance.getFiles();

        assert.isOk(allFiles[0].validationErrors === undefined);
        assert.isOk(allFiles[1].validationErrors === undefined);
        assert.isOk(allFiles[2].validationErrors && allFiles[2].validationErrors[0] === "invalidFileExtension");
    });

    it("Upload adds multiple validation errors when file fails on multiple criteria", function() {
        let uploadInstance = createUpload($.extend({}, noAutoConfig, {
            validation: {
                allowedExtensions: [".jpg"],
                minFileSize: 2
            }
        }));
        let allFiles;

        simulateSingleFileSelect("first.png", 1);
        allFiles = uploadInstance.getFiles();

        assert.isOk(allFiles[0].validationErrors && allFiles[0].validationErrors.length === 2);
    });

    it("Upload files button is not displayed when only invalid files are selected", function() {
        let uploadInstance = createUpload($.extend({}, noAutoConfig, {
            validation: {
                allowedExtensions: [".jpg"]
            }
        }));

        simulateSingleFileSelect("first.png");

        assert.isOk($(".k-upload-selected", uploadInstance.wrapper).length === 0);
    });

    it("Upload files button is displayed when there is at least one valid file", function() {
        let uploadInstance = createUpload($.extend({}, noAutoConfig, {
            validation: {
                allowedExtensions: [".jpg"]
            }
        }));

        simulateSingleFileSelect("first.png");
        simulateSingleFileSelect("first.jpg");

        assert.isOk($(".k-upload-selected", uploadInstance.wrapper).length === 1);
    });

    it("Upload files button is hidden when after removing a file only invalid ones are left", function() {
        let uploadInstance = createUpload($.extend({}, noAutoConfig, {
            validation: {
                allowedExtensions: [".jpg"]
            }
        }));

        simulateSingleFileSelect("first.jpg");
        simulateSingleFileSelect("first.png");
        simulateRemoveClick(0);

        assert.isOk($(".k-upload-selected", uploadInstance.wrapper).length === 0);
    });

    it("Upload request is not initiated when selecting invalid file", function() {
        let uploadFired = false;

        let uploadInstance = createUpload($.extend({}, autoConfig, {
            validation: {
                allowedExtensions: [".jpg"]
            },
            upload: function() {
                uploadFired = true;
            }
        }));

        simulateFileSelect("first.txt");

        assert.isOk(!uploadFired);
    });

    it("Invalid file can be removed normally from the list", function() {
        let uploadInstance = createUpload($.extend({}, noAutoConfig, {
            validation: {
                allowedExtensions: [".jpg"]
            }
        }));

        simulateSingleFileSelect("first.png");
        simulateRemoveClick(0);

        assert.equal($(".k-file", uploadInstance.wrapper).length, 0);
    });

    it("Upload clears validation errors on a new try", function() {
        let uploadInstance = createUpload($.extend({}, noAutoConfig, {
            validation: {
                allowedExtensions: [".jpg"],
                minFileSize: 2
            }
        }));
        let allFiles;

        simulateSingleFileSelect("first.png", 1);
        allFiles = uploadInstance.getFiles();

        assert.isOk(allFiles[0].validationErrors);
        assert.equal(allFiles[0].validationErrors.length, 2);

        simulateRemoveClick(0);
        allFiles = uploadInstance.getFiles();

        assert.isNotOk(allFiles.length);

        simulateSingleFileSelect("first.jpg", 3);

        allFiles = uploadInstance.getFiles();

        assert.isNotOk(allFiles[0].validationErrors);
    });
}

export function uploadUploadEvent(createUpload) {
    it("upload fires when a file is about to be uploaded", function() {
        let uploadFired = false;
        let uploadInstance = createUpload({
            upload:
                function() {
                    uploadFired = true;
                }
        });

        simulateFileSelect();

        assert.isOk(uploadFired);
    });

    it("upload does not fire until upload button is pressed", function() {
        let uploadFired = false;
        let uploadInstance = createUpload({
            upload:
                function() {
                    uploadFired = true;
                },
            async: { "saveUrl": 'javascript:;', "removeUrl": 'javascript:;', autoUpload: false }
        });

        simulateFileSelect();

        assert.isOk(!uploadFired);

        $(".k-upload-selected", uploadInstance.wrapper).trigger("click");

        assert.isOk(uploadFired);
    });

    it("upload event contains list of files", function() {
        let files = null;
        let uploadInstance = createUpload({
            upload:
                function(e) {
                    files = e.files;
                }
        });

        simulateFileSelect();

        assertSelectedFile(files);
    });

    it("cancelling the upload event removes the file entry", function() {
        let uploadInstance = createUpload({
            upload:
                function(e) {
                    e.preventDefault();
                }
        });

        simulateFileSelect();

        assert.equal($(".k-file", uploadInstance.wrapper).length, 0);
    });
}

export function uploadSuccess(params) {
    let createUpload = params.createUpload;
    let simulateUpload = params.simulateUpload;
    let simulateUploadWithResponse = params.simulateUploadWithResponse;
    let validJSON = params.validJSON;
    let simulateRemove = params.simulateRemove;
    let simulateRemoveWithResponse = params.simulateRemoveWithResponse;

    // -----------------------------------------------------------------------------------
    // -----------------------------------------------------------------------------------
    it("success is fired when upload action succeeds", function() {
        let uploadInstance = createUpload({
            success:
                function() {
                    assert.isOk(true);
                }
        });

        simulateUpload();
    });

    it("success is fired when the upload action returns empty response", function() {
        let uploadInstance = createUpload({
            success:
                function(e) {
                    assert.isOk(true);
                }
        });

        simulateUploadWithResponse("");
    });

    it("success is fired on a subsequent upload after cancelling the upload event", function() {
        let successFired = false,
            shouldPreventUpload = true;
        let uploadInstance = createUpload({
            onUpload: function(e) {
                if (shouldPreventUpload) {
                    e.preventDefault();
                }
            },
            success: function() {
                successFired = true;
            }
        });

        simulateFileSelect();
        shouldPreventUpload = false;
        simulateUpload();

        assert.isOk(successFired);
    });

    it("success event arguments contain upload operation name", function() {
        let operation;
        let uploadInstance = createUpload({
            success:
                function(e) {
                    operation = e.operation;
                }
        });

        simulateUpload();

        assert.equal(operation, "upload");
    });

    it("success event arguments contain list of uploaded files", function() {
        let files = null;
        let uploadInstance = createUpload({
            success:
                function(e) {
                    files = e.files;
                }
        });

        simulateUpload();

        assertSelectedFile(files);
    });

    it("success event arguments contain server response", function() {
        let response = null;
        let uploadInstance = createUpload({
            success:
                function(e) {
                    response = e.response;
                }
        });

        simulateUploadWithResponse(validJSON);

        assert.equal(response.status, "OK");
    });

    it("success event arguments contain original XHR", function() {
        let xhr = null;
        let uploadInstance = createUpload({
            success:
                function(e) {
                    xhr = e.XMLHttpRequest;
                }
        });

        simulateUploadWithResponse(validJSON);

        assert.notEqual(xhr, null);
    });

    it("success event arguments contains XHR object with responseText", function() {
        let xhr = null;
        let uploadInstance = createUpload({
            success:
                function(e) {
                    xhr = e.XMLHttpRequest;
                }
        });

        simulateUploadWithResponse(validJSON);

        assert.equal(xhr.responseText, validJSON);
    });

    it("success event arguments contains XHR object with status", function() {
        let xhr = null;
        let uploadInstance = createUpload({
            success:
                function(e) {
                    xhr = e.XMLHttpRequest;
                }
        });

        simulateUploadWithResponse(validJSON);

        assert.equal(xhr.status, "200");
    });

    it("success event arguments contains XHR object with statusText", function() {
        let xhr = null;
        let uploadInstance = createUpload({
            success:
                function(e) {
                    xhr = e.XMLHttpRequest;
                }
        });

        simulateUploadWithResponse(validJSON);

        assert.equal(xhr.statusText, "OK");
    });

    it("preventing success event on upload sets file error state", function() {
        let uploadInstance = createUpload({
            success:
                function(e) {
                    e.preventDefault();
                }
        });

        simulateUpload();

        assert.equal($(".k-file-error", uploadInstance.wrapper).length, 1);
    });

    it("preventing success event on upload sets warning header status", function() {
        let uploadInstance = createUpload({
            success:
                function(e) {
                    e.preventDefault();
                }
        });

        simulateUpload();

        assert.equal($(".k-upload-status .k-i-exclamation-circle,.k-upload-status .k-svg-i-exclamation-circle", uploadInstance.wrapper).length, 1);
    });

    // -----------------------------------------------------------------------------------
    // -----------------------------------------------------------------------------------
    asyncTest("success is fired when remove action succeeds", function(done) {
        let successFired;
        let uploadInstance = createUpload({
            success:
                function(e) {
                    successFired = true;
                }
        });

        simulateUpload();
        successFired = false;
        simulateRemove();

        setTimeout(function() {
            done(() => assert.isOk(successFired));
        }, 100);
    });

    asyncTest("success event arguments contain list of removed files", function(done) {
        let uploadInstance = createUpload({
            success:
                function(e) {
                    done(() => assertSelectedFile(e.files));
                }
        });

        simulateUpload();
        simulateRemove();
    });

    asyncTest("success event arguments contain remove operation name", function(done) {
        let operation = null;
        let uploadInstance = createUpload({
            success:
                function(e) {
                    operation = e.operation;
                }
        });

        simulateUpload();
        simulateRemove();

        setTimeout(function() {
            done(() => assert.equal(operation, "remove"));
        }, 100);
    });

    asyncTest("success event arguments contain remove action response", function(done) {
        let data = null;
        let uploadInstance = createUpload({
            success:
                function(e) {
                    data = e.response;
                }
        });

        simulateUpload();
        simulateRemoveWithResponse(validJSON);

        setTimeout(function() {
            done(() => assert.equal(data.status, "OK"));
        }, 100);
    });

    asyncTest("success event arguments contain original XHR for remove action", function(done) {
        let xhr = null;
        let uploadInstance = createUpload({
            success:
                function(e) {
                    xhr = e.XMLHttpRequest;
                }
        });

        simulateUpload();
        xhr = null;
        simulateRemove();

        setTimeout(function() {
            done(() => assert.notEqual(xhr, null));
        }, 100);
    });

    asyncTest("success event arguments contain XHR with responseText for remove action", function(done) {
        let responseText;
        let uploadInstance = createUpload({
            success:
                function(e) {
                    responseText = e.XMLHttpRequest.responseText;
                }
        });

        simulateUpload();
        simulateRemoveWithResponse(validJSON);

        setTimeout(function() {
            done(() => assert.equal(responseText, validJSON));
        }, 100);
    });

    asyncTest("success event arguments contain XHR with status for remove action", function(done) {
        let status;
        let uploadInstance = createUpload({
            success:
                function(e) {
                    status = e.XMLHttpRequest.status;
                }
        });

        simulateUpload();
        simulateRemove();

        setTimeout(function() {
            done(() => assert.equal(status, "200"));
        }, 100);
    });

    asyncTest("preventing success event on remove leaves the file in the list", function(done) {
        let uploadInstance = createUpload({
            success:
                function(e) {
                    if (e.operation === "remove") {
                        e.preventDefault();
                    }
                }
        });

        simulateUpload();
        simulateRemove();

        setTimeout(function() {
            done(() => assert.equal($(".k-file", uploadInstance.wrapper).length, 1));
        }, 100);
    });

    // -----------------------------------------------------------------------------------
    // -----------------------------------------------------------------------------------
    //Success tests for initial files

    asyncTest("success is fired when remove action succeeds for initially rendered files", function(done) {
        let successFired;
        let uploadInstance = createUpload({
            files: [
                { name: "test.doc", size: 50, extension: ".doc" }
            ],
            success: function(e) {
                successFired = true;
            }
        });

        successFired = false;
        simulateRemove();

        setTimeout(function() {
            done(() => assert.isOk(successFired));
        }, 100);
    });

    asyncTest("success event arguments contain list of removed files for initially rendered files", function(done) {
        let uploadInstance = createUpload({
            files: [
                { name: "test.doc", size: 50, extension: ".doc" }
            ],
            success: function(e) {
                let files = e.files;
                delete files[0].uid;

                done(() => assert.deepEqual(files, [{ name: "test.doc", extension: ".doc", size: 50 }]));
            }
        });

        simulateRemove();
    });

    asyncTest("success event arguments contain remove operation name for initially rendered files", function(done) {
        let operation = null;
        let uploadInstance = createUpload({
            files: [
                { name: "test.doc", size: 50, extension: ".doc" }
            ],
            success: function(e) {
                operation = e.operation;
            }
        });

        simulateRemove();

        setTimeout(function() {
            done(() => assert.equal(operation, "remove"));
        }, 100);
    });

    asyncTest("success event arguments contain remove action response for initially rendered files", function(done) {
        let data = null;
        let uploadInstance = createUpload({
            files: [
                { name: "test.doc", size: 50, extension: ".doc" }
            ],
            success: function(e) {
                data = e.response;
            }
        });

        simulateRemoveWithResponse(validJSON);

        setTimeout(function() {
            done(() => assert.equal(data.status, "OK"));
        }, 100);
    });

    asyncTest("success event arguments contain original XHR for remove action for initially rendered files", function(done) {
        let xhr = null;
        let uploadInstance = createUpload({
            files: [
                { name: "test.doc", size: 50, extension: ".doc" }
            ],
            success: function(e) {
                xhr = e.XMLHttpRequest;
            }
        });

        xhr = null;
        simulateRemove();

        setTimeout(function() {
            done(() => assert.notEqual(xhr, null));
        }, 100);
    });

    asyncTest("success event arguments contain XHR with responseText for remove action for initially rendered files", function(done) {
        let responseText;
        let uploadInstance = createUpload({
            files: [
                { name: "test.doc", size: 50, extension: ".doc" }
            ],
            success: function(e) {
                responseText = e.XMLHttpRequest.responseText;
            }
        });

        simulateRemoveWithResponse(validJSON);

        setTimeout(function() {
            done(() => assert.equal(responseText, validJSON));
        }, 100);
    });

    asyncTest("success event arguments contain XHR with status for remove action for initially rendered files", function(done) {
        let status;
        let uploadInstance = createUpload({
            files: [
                { name: "test.doc", size: 50, extension: ".doc" }
            ],
            success: function(e) {
                status = e.XMLHttpRequest.status;
            }
        });

        simulateRemove();

        setTimeout(function() {
            done(() => assert.equal(status, "200"));
        }, 100);
    });
}

export function removeApi(params) {
    let createUpload = params.createUpload;
    let simulateFileSelect = params.simulateFileSelect;
    let simulateUpload = params.simulateUpload;
    let getFileUid = params.getFileUid;
    let simulateUploadWithResponse = params.simulateUploadWithResponse;
    let errorResponse = params.errorResponse;

    asyncTest("removeFileByUid removes successfully uploaded file", function(done) {
        let uploadInstance = createUpload();

        simulateUpload();

        $.mockjax({
            url: "/removeAction",
            responseTime: 0,
            responseText: ""
        });

        uploadInstance.removeFileByUid(getFileUid(0));

        setTimeout(function() {
            done(() => assert.equal($(".k-file", uploadInstance.wrapper).length, 0));
        }, 100);
    });

    it("removeFileByUid removes unsuccessfully uploaded file", function() {
        let uploadInstance = createUpload();

        simulateUploadWithResponse(errorResponse);

        uploadInstance.removeFileByUid(getFileUid(0));

        assert.equal($(".k-file", uploadInstance.wrapper).length, 0);
    });

    it("removeFileByUid removes currently uploaded file", function() {
        let uploadInstance = createUpload();

        simulateFileSelect();

        uploadInstance.removeFileByUid(getFileUid(0));

        assert.equal($(".k-file", uploadInstance.wrapper).length, 0);
    });

    asyncTest("Removing a file with removeFileByUid correctly updates the header status", function(done) {
        let uploadInstance = createUpload();

        simulateUpload();
        simulateUploadWithResponse(errorResponse, undefined, 1);

        $.mockjax({
            url: "/removeAction",
            responseTime: 0,
            responseText: ""
        });

        uploadInstance.removeFileByUid(getFileUid(1));

        setTimeout(function() {
            let statusTotal = uploadInstance.wrapper.find(".k-upload-status span");

            done(() => {
                assert.isOk(statusTotal.hasClass("k-svg-i-check"));
                assert.isOk(!statusTotal.hasClass("k-svg-i-exclamation-circle"));
            });
        }, 100);
    });

    it("Removing a file with removeFileByUid triggers remove request", function() {
        let uploadInstance = createUpload();
        let removeCalled = false;

        uploadInstance._submitRemove = function(data, onSuccess) {
            removeCalled = true;
        };

        simulateUpload();
        uploadInstance.removeFileByUid(getFileUid(0));

        assert.isOk(removeCalled);
    });

    asyncTest("removeAllFiles removes all files", function(done) {
        let uploadInstance = createUpload();

        simulateFileSelect();
        simulateUpload();
        simulateUploadWithResponse(errorResponse);

        $.mockjax({
            url: "/removeAction",
            responseTime: 0,
            responseText: ""
        });

        uploadInstance.removeAllFiles();

        setTimeout(function() {
            done(() => assert.equal($(".k-file", uploadInstance.wrapper).length, 0));
        }, 100);
    });

    it("removeAllFiles triggers remove requests", function() {
        let uploadInstance = createUpload();

        simulateUpload(0);
        simulateUpload(1);
        simulateUpload(2);

        let removeCalledCount = 0;
        uploadInstance._submitRemove = function(data, onSuccess) {
            removeCalledCount += 1;
        };

        uploadInstance.removeAllFiles();
        assert.equal(removeCalledCount, 3);
    });

    it("clearFileByUid removes successfully uploaded file", function() {
        let uploadInstance = createUpload();

        simulateUpload();

        uploadInstance.clearFileByUid(getFileUid(0));

        assert.equal($(".k-file", uploadInstance.wrapper).length, 0);
    });

    it("clearFileByUid removes unsuccessfully uploaded file", function() {
        let uploadInstance = createUpload();

        simulateUploadWithResponse(errorResponse);

        uploadInstance.clearFileByUid(getFileUid(0));

        assert.equal($(".k-file", uploadInstance.wrapper).length, 0);
    });

    it("clearFileByUid removes currently uploaded file", function() {
        let uploadInstance = createUpload();

        simulateFileSelect();

        uploadInstance.clearFileByUid(getFileUid(0));

        assert.equal($(".k-file", uploadInstance.wrapper).length, 0);
    });

    asyncTest("Clearing a file with clearFileByUid correctly updates the header status", function(done) {
        let uploadInstance = createUpload();

        simulateUpload();
        simulateUploadWithResponse(errorResponse, undefined, 1);

        $.mockjax({
            url: "/removeAction",
            responseTime: 0,
            responseText: ""
        });

        uploadInstance.clearFileByUid(getFileUid(1));

        setTimeout(function() {
            let statusTotal = uploadInstance.wrapper.find(".k-upload-status span");

            done(() => {
                assert.isOk(statusTotal.hasClass("k-svg-i-check"));
                assert.isOk(!statusTotal.hasClass("k-svg-i-exclamation-circle"));
            });
        }, 100);

    });

    it("Clearing a file with clearFileByUid does not trigger remove request", function() {
        let uploadInstance = createUpload();
        let removeCalled = false;

        uploadInstance._submitRemove = function(data, onSuccess) {
            removeCalled = true;
        };

        simulateUpload();
        uploadInstance.clearFileByUid(getFileUid(0));

        assert.isOk(!removeCalled);
    });

    asyncTest("clearAllFiles clears all files", function(done) {
        let uploadInstance = createUpload();

        simulateFileSelect();
        simulateUpload();
        simulateUploadWithResponse(errorResponse);

        $.mockjax({
            url: "/removeAction",
            responseTime: 0,
            responseText: ""
        });

        uploadInstance.clearAllFiles();

        setTimeout(function() {
            done(() => assert.equal($(".k-file", uploadInstance.wrapper).length, 0));
        }, 100);
    });

    it("clearAllFiles does not trigger remove requests", function() {
        let uploadInstance = createUpload();

        simulateUpload();
        simulateUpload();
        simulateUpload();

        let removeCalledCount = 0;
        uploadInstance._submitRemove = function(data, onSuccess) {
            removeCalledCount += 1;
        };

        uploadInstance.clearAllFiles();
        assert.equal(removeCalledCount, 0);
    });
}

export function uploadRemoveEvent(params) {
    let createUpload = params.createUpload;
    let simulateUpload = params.simulateUpload;
    let simulateRemove = params.simulateRemove;

    it("remove fired when clicking remove", function() {
        let removeFired = false;
        let uploadInstance = createUpload({
            remove:
                function(e) {
                    removeFired = true;
                }
        });

        simulateUpload();
        simulateRemove();

        assert.isOk(removeFired);
    });

    it("remove event arguments contain list of files", function() {
        let files = false;
        let uploadInstance = createUpload({
            remove:
                function(e) {
                    files = e.files;
                }
        });

        simulateUpload();
        simulateRemove();

        assertSelectedFile(files);
    });

    it("user data set in remove event is sent to server", function() {
        let uploadInstance = createUpload({
            remove:
                function(e) {
                    e.data = { id: 1 };
                }
        });

        simulateUpload();

        $.mockjax(function(s) {
            assert.equal(s.data.id, 1);
            return {
                url: "/removeAction",
                responseTime: 0,
                responseText: ""
            };
        });

        simulateRemoveClick();
    });

    it("user headers set in remove event are sent to server", function() {
        let uploadInstance = createUpload({
            remove:
                function(e) {
                    e.headers = { foo: "bar" };
                }
        });

        simulateUpload();

        $.mockjax(function(s) {
            assert.equal(s.headers.foo, "bar");
            return {
                url: "/removeAction",
                responseTime: 0,
                responseText: ""
            };
        });

        simulateRemoveClick();
    });

    it("remove request sends credentials", function() {
        let uploadInstance = createUpload();
        uploadInstance.options.async.withCredentials = false;

        simulateUpload();

        $.mockjax(function(s) {
            assert.equal(s.xhrFields.withCredentials, false);
            return {
                url: "/removeAction",
                responseTime: 0,
                responseText: ""
            };
        });

        simulateRemoveClick();
    });

    it("remove HTTP verb can be changed", function() {
        let uploadInstance = createUpload();
        uploadInstance.options.async.removeVerb = "DELETE";

        simulateUpload();

        $.mockjax(function(s) {
            assert.equal(s.type, "DELETE");
            return {
                url: "/removeAction",
                responseTime: 0,
                responseText: ""
            };
        });

        simulateRemoveClick();
    });

    it("remove field is fileNames", function() {
        let uploadInstance = createUpload();

        simulateUpload();

        $.mockjax(function(s) {
            assert.deepEqual(s.data["fileNames"], ["first.txt"]);
            return {
                url: "/removeAction",
                responseTime: 0,
                responseText: ""
            };
        });

        simulateRemoveClick();
    });

    it("remove field can be changed", function() {
        let uploadInstance = createUpload();
        uploadInstance.options.async.removeField = "fileNames[]";

        simulateUpload();

        $.mockjax(function(s) {
            assert.deepEqual(s.data["fileNames[]"], ["first.txt"]);
            return {
                url: "/removeAction",
                responseTime: 0,
                responseText: ""
            };
        });

        simulateRemoveClick();
    });

    it("cancelling remove aborts remove operation", function() {
        let uploadInstance = createUpload({
            remove:
                function(e) {
                    e.preventDefault();
                }
        });

        let removeCalled = false;
        uploadInstance._submitRemove = function(data, onSuccess) {
            removeCalled = true;
        };

        simulateUpload();
        simulateRemove();

        assert.isOk(!removeCalled);
    });

    // -----------------------------------------------------------------------------------
    // -----------------------------------------------------------------------------------
    //Remove tests for multiple false
    it("remove event is fired for first file, when selecting a second one", function() {
        let removeFired = false;
        let uploadInstance = createUpload({
            remove: function(e) {
                removeFired = true;
            },
            multiple: false
        });

        simulateUpload();
        simulateFileSelect();

        assert.isOk(removeFired);
    });

    it("previous file is not removed if the remove event is prevented", function() {
        let removeFired = false;
        let uploadInstance = createUpload({
            remove: function(e) {
                e.preventDefault();
            },
            multiple: false
        });

        simulateUpload();
        simulateFileSelect();

        assert.equal($(".k-file", uploadInstance.wrapper).length, 2);
    });

    it("user data set in remove event is sent to server when removing previous file", function() {
        let uploadInstance = createUpload({
            remove:
                function(e) {
                    e.data = { id: 1 };
                }
        });

        simulateUpload();

        $.mockjax(function(s) {
            assert.equal(s.data.id, 1);
            return {
                url: "/removeAction",
                responseTime: 0,
                responseText: ""
            };
        });

        simulateRemove();
    });

    // -----------------------------------------------------------------------------------
    // -----------------------------------------------------------------------------------
    //Remove tests for initial files
    it("remove is fired when clicking remove on initially rendered file", function() {
        let removeFired = false;
        let uploadInstance = createUpload({
            files: [
                { name: "test.doc", size: 50, extension: ".doc" }
            ],
            remove: function(e) {
                removeFired = true;
            }
        });

        simulateRemove();

        assert.isOk(removeFired);
    });

    it("remove event arguments contain list of files when removing initially rendered file", function() {
        let files = false;
        let uploadInstance = createUpload({
            files: [
                { name: "test.doc", size: 50, extension: ".doc" }
            ],
            remove: function(e) {
                files = e.files;
                delete files[0].uid;
            }
        });

        simulateRemove();

        assert.deepEqual(files, [{ name: "test.doc", extension: ".doc", size: 50 }]);
    });

    it("remove HTTP verb can be changed when removing initially rendered file", function() {
        let uploadInstance = createUpload({
            files: [
                { name: "test.doc", size: 50, extension: ".doc" }
            ]
        });
        uploadInstance.options.async.removeVerb = "DELETE";

        $.mockjax(function(s) {
            assert.equal(s.type, "DELETE");
            return {
                url: "/removeAction",
                responseTime: 0,
                responseText: ""
            };
        });

        simulateRemoveClick();
    });

    it("remove field is fileNames for initially rendered files", function() {
        let uploadInstance = createUpload({
            files: [
                { name: "test.doc", size: 50, extension: ".doc" }
            ]
        });

        $.mockjax(function(s) {
            assert.deepEqual(s.data["fileNames"], ["test.doc"]);
            return {
                url: "/removeAction",
                responseTime: 0,
                responseText: ""
            };
        });

        simulateRemoveClick();
    });

    it("remove field can be changed for initially rendered files", function() {
        let uploadInstance = createUpload({
            files: [
                { name: "test.doc", size: 50, extension: ".doc" }
            ]
        });
        uploadInstance.options.async.removeField = "fileNames[]";

        $.mockjax(function(s) {
            assert.deepEqual(s.data["fileNames[]"], ["test.doc"]);
            return {
                url: "/removeAction",
                responseTime: 0,
                responseText: ""
            };
        });

        simulateRemoveClick();
    });

    it("cancelling remove aborts remove operation for initially rendered files", function() {
        let uploadInstance = createUpload({
            files: [
                { name: "test.doc", size: 50, extension: ".doc" }
            ],
            remove: function(e) {
                e.preventDefault();
            }
        });

        let removeCalled = false;
        uploadInstance._submitRemove = function(data, onSuccess) {
            removeCalled = true;
        };

        simulateRemove();

        assert.isOk(!removeCalled);
    });
}