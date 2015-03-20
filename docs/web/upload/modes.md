---
title: Modes
page_title: Modes in Kendo UI jQuery-based file Upload widget
description: How to use different modes in Kendo UI Upload widget, initialization of the Upload from an existing file and further async, implemented by using the HTML5 File API.
position: 4
---
# Upload Modes

The Upload supports two modes of operation - synchronous and asynchronous.

## Synchronous mode
From a developer's perspective an Upload in sync mode behaves much like a regular file input. The selected files will be uploaded when the form is submitted.

The users benefit from the ability to select a variable number of files. This feature does not require the browser to support multiple file selection.

![](/web/upload/upload-sync.png)

The Upload is initialized from an existing file input placed in a form.

    <form method="post" action="handler.php">
        <div>
            <input name="photos[]" id="photos" type="file" />
        </div>
    </form>

Note the array syntax in the input name. It is used to hint the upload handler to treat photos as an array.

    $(document).ready(function() {
        $("#photos").kendoUpload();
    });

Please consult the documentation of your specific server technology regarding the handling of uploaded files.

## Asynchronous mode

In this mode the Upload requires dedicated server handlers to store and remove uploaded files. Files are uploaded immediately or, optionally, after user confirmation. The upload request is executed out-of-band without interrupting the page flow.

![](/web/upload/upload-async.png)

The async mode is implemented using the HTML5 File API. The upload will gracefully degrade and continue to function in legacy browsers using a hidden IFRAME.

Start by creating a simple HTML input of type "file" (no `form` is required):

    <input name="photos[]" id="photos" type="file" />

Initialize Upload and configure async upload end-points:

    $("#photos").kendoUpload({
        async: {
            saveUrl: "saveHandler.php",
            removeUrl: "removeHandler.php",
            removeField: "fileNames[]"
        }
    });
We use the familiar array syntax for the field name in order to hint the upload handler to treat "photos" as an array.

### Save handler
The save handler should accept POST requests. The requests will contain one or more files with the same name as the input, in this case "photos[]".

The handler should return either:

*   An empty response to signify success.
*   A JSON string with "text/plain" content encoding. The de-serialized object is available in the **success** event handler.
*   Any other response to signify failure.

### Remove handler
The remove handler should accept POST requests (configurable via the [removeVerb](/api/web/upload#configuration-async.removeVerb) option).
The requests will contain one or more text fields with name "fileNames". In this case, we change it to "fileNames[]" using the removeField option.

The handler should return either:

*   An empty response to signify success.
*   A JSON string with "text/plain" content encoding. The de-serialized object is available in the [success](/api/web/upload#events-success) event handler.
*   Any other response to signify failure.

### Asynchronous mode fallback
The Upload has a fallback mechanism when it is placed inside a form and is configured for asynchronous operation. Any files that were not fully uploaded will be sent as part of the form when the user submits it. This ensures that no files will be lost, even if you do not take any special measures to block the submit button during upload.

You have to handle the uploaded files both in the save handler and in the form submit action, as in synchronous mode.
