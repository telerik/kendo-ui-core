---
title: Modes of Operation
page_title: Modes of Operation | Kendo UI Upload
description: "Learn how to use the different modes of operation supported by the Kendo UI Upload widget, initialize it from an existing file and how to use its asynchronous mode."
slug: modes_upload_widget
position: 4
---

# Modes of Operation

Kendo UI Upload supports two modes of operation: synchronous and asynchronous.

## Synchronous Mode

From a developer's perspective, a Kendo UI Upload in a synchronous mode behaves much like a regular file input. The selected files are uploaded upon form submission. Users benefit from the opportunity to select a variable number of files. This feature does not require that the browser supports a multiple file selection.

![](/controls/editors/upload/upload-sync.png)

The Upload is initialized from an existing file input placed in a form.

###### Example

    <form method="post" action="handler.php">
        <div>
            <input name="photos[]" id="photos" type="file" />
        </div>
    </form>

    $(document).ready(function() {
        $("#photos").kendoUpload();
    });




    <form method="post" action="handler.php">
        <div>
            <input name="photos[]" id="photos" type="file" />
        </div>
    </form>

Note the array syntax in the input name: it is used to hint the Upload handler to treat the photos as an array.

For detailed information on how to send metadata to the save handler and receive metadata in the Upload widget, see [this article]({% slug metadata_upload_widget %}).

For more information on how to handle the uploaded files, refer to the documentation of your specific server technology.

## Asynchronous Mode

In this mode Kendo UI Upload requires dedicated server handlers to store and remove uploaded files. Files are uploaded immediately or, optionally, after user confirmation. The upload request is executed out-of-band without interrupting the page flow.

![](/controls/editors/upload/upload-async.png)

The asynchrnous mode is implemented using the [HTML5 File API](https://en.wikipedia.org/wiki/HTML5_File_API). The upload will gracefully degrade and continue to function in legacy browsers using a hidden `iframe`.

To implement the asynchronous mode of operation, follow the steps below:

**Step 1.** Create an HTML `input` of type `"file"` (no `form` is required).

###### Example

    <input name="photos[]" id="photos" type="file" />

**Step 2.** Initialize the Upload and configure asynchronous upload end-points.

###### Example

    $("#photos").kendoUpload({
        async: {
            saveUrl: "saveHandler.php",
            removeUrl: "removeHandler.php",
            removeField: "fileNames[]"
        }
    });

The array syntax for the field name is used to hint the upload handler to treat `"photos"` as an array.

### Save Handler

The save handler should accept POST requests. The requests are going to contain one or more files with the same name as the `input`, in this case `"photos[]"`.

The handler is expected to return either:

*   An empty response to signify success.
*   A JSON string with `"text/plain"` content encoding. The de-serialized object is available in the `success` event handler.
*   Any other response to signify failure.

### Remove Handler

The remove handler should accept POST requests, which are configurable via the [`removeVerb`](/api/javascript/ui/upload#configuration-async.removeVerb) option. The requests are going to contain one or more text fields with the `"fileNames"` name. In this case, change it to `"fileNames[]"` using the `removeField` option.

The handler is expected to return either:

*   An empty response to signify success.
*   A JSON string with `"text/plain"` content encoding. The de-serialized object is available in the [`success`](/api/javascript/ui/upload#events-success) event handler.
*   Any other response to signify failure.

### Asynchronous Mode Fallback

The Upload has a fallback mechanism when it is placed inside a `form` and is configured for asynchronous operation. Files that were not fully uploaded are going to be sent as part of the form upon its submission by the user. This ensures that no files are lost, even if you do not take any special measures to block the **Submit** button during upload.

The uploaded files must be handled both in the save handler and in the form submit action, as in synchronous mode.

### Programmatic Trigger of Asynchronous Upload

The Upload widget does not provide a public API method for asynchronous uploading of the already selected files, when `autoUpload` is set to `false`. To achieve the same result, it is possible to trigger the `click` event of the widget's **Upload** button.

###### Example

    var upload = $("UploadID").data("kendoUpload");
    upload.wrapper.find("button.k-upload-selected").click();

The [`wrapper` property]({% slug widgetwrapperandelement_references_gettingstarted %}) returns the Upload widget's outermost element.

## See Also

Other articles on the Kendo UI Upload:

* [Overview of the Upload Widget]({% slug overview_kendoui_upload_widget %})
* [Drag and Drop]({% slug dragandrop_upload_widget %})
* [Send and Receive Metadata]({% slug metadata_upload_widget %})
* [Browser Support]({% slug browsersupport_upload_widget %})
* [Troubleshooting]({% slug troubleshooting_upload_widget %})

For how-to examples on the Kendo UI Upload widget, browse its [**How To** documentation folder]({% slug howto_remove_files_with_errors %}).
