function copyUploadPrototype() {
    createHTML();
    $("#testbed").html(
        $("#prototype").html().replace(/uploadPrototype/g, "uploadInstance").replace(/file/g, "text")
    );
}

function createHTML() {
   var html = '<div id="testbed_container"><div id="prototype" style="display:none">' +
        '<div class="t-widget t-upload">' +
            '<div class="t-button t-upload-button">' +
                '<span>Select...</span>' +
                '<input id="uploadPrototype" name="uploadPrototype" type="file" />' +
           '</div>' +
        '</div>' +
    '</div>' +
    '<form id="parentForm" action="javascript:return \'\';" method="post">' +
    '<div id="testbed">' +
        '</div>' +
    '</form></div>'

    $(html).appendTo(document.body);
}
function removeHTML() {
    $("#testbed_container").remove();
}
function simulateFileSelect() {
    var clickEvent = $.Event("click");
    $("#uploadInstance").trigger(clickEvent);
    if (!clickEvent.isDefaultPrevented()) {
        $("#uploadInstance").val("first.txt").trigger("change");
    }
}

function simulateMultipleFileSelect() {
    uploadInstance._onInputChange({ target: {
        files: [
            { name: "first.txt", size: 1 },
            { fileName: "second.txt", fileSize: 2 } // fileName and fileSize are used by Firefox (versions before 3.6)
        ]}
    });
}
function getFileListMock() {
    return [
        { name: "first.txt", size: 1 },
        { name: "second.txt", size: 2 }
    ];
}
function simulateRemoveClick(fileIndex) {
    $(".t-delete", uploadInstance.wrapper).eq(fileIndex || 0).trigger("click");
}
