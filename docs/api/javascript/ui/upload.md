---
title: Upload
page_title: Configuration, methods and events of Kendo UI Upload
description: How to configure the ability to upload files in an asynchronous manner in Upload UI widget.
---

# kendo.ui.Upload

Represents the Kendo UI Upload. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### async `Object`

Configures the ability to upload a file(s) in an asynchronous manner. Please refer to the
[async mode help topic](/web/upload/modes#asynchronous-mode)
for more details.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "save",
                removeUrl: "remove"
            }
        });
    </script>

### async.autoUpload `Boolean`*(default: true)*

The selected files will be uploaded immediately by default. You can change this behavior by setting `autoUpload` to false.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "save",
                removeUrl: "remove",
                autoUpload: false
            }
        });
    </script>

### async.batch `Boolean`*(default: false)*

The selected files will be uploaded in separate requests, if this is supported by the browser.
You can change this behavior by setting batch to true, in which case all selected files will be uploaded in one request.

The batch mode applies to multiple files, which are selected at the same time.
Files selected one after the other will be uploaded in separate requests.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "save",
                removeUrl: "remove",
                batch: true
            }
        });
    </script>

### async.removeField `String`*(default: "fileNames")*

The name of the form field submitted to the Remove URL.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "save",
                removeUrl: "remove",
                removeField: "customRemoveField"
            }
        });
    </script>

### async.removeUrl `String`

The URL of the handler responsible for removing uploaded files (if any). The handler must accept POST
requests containing one or more "fileNames" fields specifying the files to be deleted.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "save",
                removeUrl: "remove"
            }
        });
    </script>

### async.removeVerb `String`*(default: "POST")*

The HTTP verb to be used by the remove action.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "save",
                removeUrl: "remove",
                removeVerb: "DELETE"
            }
        });
    </script>

### async.saveField `String`

The name of the form field submitted to the save URL. The default value is the input name.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "save",
                removeUrl: "remove",
                saveField: "customSaveField"
            }
        });
    </script>

### async.saveUrl `String`

The URL of the handler that will receive the submitted files. The handler must accept POST requests
containing one or more fields with the same name as the original input name.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "save",
                removeUrl: "remove"
            }
        });
    </script>

### async.withCredentials `Boolean` *(default: true)*

Controls whether to send credentials (cookies, headers) for cross-site requests.
This option will be ignored if the browser doesn't support File API.

### enabled `Boolean`*(default: true)*

Enables (**true**) or disables (**false**) an **Upload**. A disabled
**Upload** may be re-enabled via enable().

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            enabled: false
        });
    </script>

### files `Array`

List of files to be initially rendered in the Upload widget files list.

#### Each file object in the array should contain the following properties

*   name
*   size
*   extension

> **Important:** This option could be used only when the Upload widget is in [async mode](/web/upload/modes#asynchronous-mode). The files will be rendered as successfully uploaded.

#### Example - passing an array of initial files

    <input type="file" name="files" id="upload" />
    <script>
        var files = [
            { name: "file1.doc", size: 525, extension: ".doc" },
            { name: "file2.jpg", size: 600, extension: ".jpg" },
            { name: "file3.xls", size: 720, extension: ".xls" },
        ];

        $("#upload").kendoUpload({
            async: {
                saveUrl: "Home/Save",
                removeUrl: "Home/Remove",
                autoUpload: true
            },
            files: files
        });
    </script>


### files.extension `String`

The extension of the initial file.


### files.name `String`

The name of the initial file.


### files.size `Number`

The size of the initial file.


### localization `Object`

Sets the strings rendered by the Upload.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            localization: {
                select: "customSelect"
            }
        });
    </script>

### localization.cancel `String`

Sets the text of the cancel button text.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "save",
                removeUrl: "remove"
            },
            localization: {
                cancel: "customCancel"
            }
        });
    </script>

### localization.dropFilesHere `String`*(default: "drop files here to upload")*

Sets the drop zone hint.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "save",
                removeUrl: "remove"
            },
            localization: {
                dropFilesHere: "customDropFilesHere"
            }
        });
    </script>

### localization.headerStatusUploaded `String`

Sets the header status message for uploaded files.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "save",
                removeUrl: "remove"
            },
            localization: {
                headerStatusUploaded: "customHeaderStatusUploaded"
            }
        });
    </script>

### localization.headerStatusUploading `String`

Sets the header status message for files that are being uploaded.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "save",
                removeUrl: "remove"
            },
            localization: {
                headerStatusUploading: "customHeaderStatusUploading"
            }
        });
    </script>

### localization.remove `String`

Sets the text of the remove button text.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "save",
                removeUrl: "remove"
            },
            localization: {
                remove: "customRemove"
            }
        });
    </script>

### localization.retry `String`

Sets the text of the retry button text.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "save",
                removeUrl: "remove"
            },
            localization: {
                retry: "customRetry"
            }
        });
    </script>

### localization.select `String`

Sets the "Select..." button text.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "save",
                removeUrl: "remove"
            },
            localization: {
                select: "customSelect"
            }
        });
    </script>

### localization.statusFailed `String`

Sets the status message for failed uploads.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "save",
                removeUrl: "remove"
            },
            localization: {
                statusFailed: "customStatusFailed"
            }
        });
    </script>

### localization.statusUploaded `String`

Sets the status message for uploaded files.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "save",
                removeUrl: "remove"
            },
            localization: {
                statusUploaded: "customStatusUploaded"
            }
        });
    </script>

### localization.statusUploading `String`

Sets the status message for files that are being uploaded.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "save",
                removeUrl: "remove"
            },
            localization: {
                statusUploading: "customStatusUploading"
            }
        });
    </script>

### localization.uploadSelectedFiles `String`

Sets the text of the "Upload files" button.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "save",
                removeUrl: "remove"
            },
            localization: {
                uploadSelectedFiles: "customUploadSelectedFiles"
            }
        });
    </script>

### multiple `Boolean`*(default: true)*

Enables (**true**) or disables (**false**) the ability to select multiple files.
If **false**, users will be able to select only one file at a time. Note: This option does not
limit the total number of uploaded files in an asynchronous configuration.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "save",
                removeUrl: "remove"
            },
            multiple: false
        });
    </script>

### showFileList `Boolean`*(default: true)*

Enables (**true**) or disables (**false**) the ability to display a file listing
for uploading a file(s). Disabling a file listing may be useful you wish to customize the UI; use the
client-side events to build your own UI.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "save",
                removeUrl: "remove"
            },
            showFileList: false
        });
    </script>

### template `String|Function`
The [template](/api/javascript/kendo#methods-template) used to render the files in the list

#### Template data `Array`

*   name - the name of the file (string of all file names separated with comma, if batch upload is used)
*   size - the file size in bytes / the total file size if batch upload is used (null if not available)
*   files - array with information about all selected files - name, size and extension

> **Important:** You should add the following markup to the template in order to render an action button for each file: `<button type='button' class='k-upload-action'></button>`.
>To use the default progress-bar, you should add the following markup at the beginning of the template `<span class='k-progress'></span>` and render the rest of the template relative to it. Please check [Upload Templates](http://demos.telerik.com/kendo-ui/web/upload/templates.html) for a live demo.

#### Example - specify template as a function

    <input type="file" name="files" id="upload" />
    <script id="fileTemplate" type="text/x-kendo-template">
        <div>
            <p>Name: #=name#</p>
            <p>Size: #=size# bytes</p>
            <p>Extension: #=files[0].extension#</p>
            <button type='button' class='k-upload-action' style='position: absolute; top: 0; right: 0;'></button>
        </div>
    </script>
    <script>
        $("#upload").kendoUpload({
            template: kendo.template($('#fileTemplate').html())
        });
    </script>

#### Example - specify template as a string

    <input type="file" name="files" id="upload" />
    <script>
        $("#upload").kendoUpload({
        template: "<div><p>Name: #=name#</p>" +
                  "<p>Size: #=size# bytes</p><p>Extension: #=files[0].extension#</p>" +
                  "<button type='button' class='k-upload-action' style='position: absolute; top: 0; right: 0;'></button>" +
                  "</div>"
        });
    </script>

## Methods

### destroy
Prepares the **Upload** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the Upload element from DOM.

#### Example

    <input type="file" name="files" id="upload" />
    <script>
        $("#upload").kendoUpload({
            select: function () {
                //sample event
            }
        });

        var upload = $("#upload").data("kendoUpload");

        // detach events and prepare for safe removal
        upload.destroy();
    </script>

### disable

Disables the upload.

#### Example

    <input type="file" name="files" id="upload" />
    <script>
        $("#upload").kendoUpload();

        var upload = $("#upload").data("kendoUpload");

        // disables the upload
        upload.disable();
    </script>

### enable

Enables the upload.

#### Example

    <input type="file" name="files" id="upload" />
    <script>
        // upload is disabled when initialized
        $("#upload").kendoUpload({
            enabled: false
        });

        var upload = $("#upload").data("kendoUpload");

        // enables the upload
        upload.enable();
    </script>

#### Parameters

##### enable `Boolean` *(optional)*

The argument, which defines whether to enable/disable the upload.

### toggle

Toggles the upload enabled state.

#### Example

    <input type="file" name="files" id="upload" />
    <script>
        // upload is disabled when initialized
        $("#upload").kendoUpload({
            enabled: false
        });

        var upload = $("#upload").data("kendoUpload");

        // toggles the upload enabled state
        upload.toggle();
    </script>

#### Parameters

##### enable `Boolean`

(Optional) The new enabled state.

## Events

### cancel

Fires when the upload has been cancelled while in progress.



Note: The cancel event fires only when the upload is in
[async mode](/web/upload/modes#asynchronous-mode).

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "save",
                removeUrl: "remove"
            },
            cancel: onCancel
        });

        function onCancel(e) {
            // Array with information about the uploaded files
            var files = e.files;

            // Process the Cancel event
        }
    </script>

#### Event Data

##### e.files `Array`

List of the files that were uploaded or removed . Each file has:


*   name
*   extension - the file extension
        including the leading dot - ".jpg", ".png", etc.
*   size - the file size in bytes (null if not available)
*   uid - the unique identifier of the file or batch of files


### complete

Fires when all active uploads have completed either successfully or with errors.



Note: The complete event fires only when the upload is in
[async mode](/web/upload/modes#asynchronous-mode).

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "save",
                removeUrl: "remove"
            },
            complete: onComplete
        });

        function onComplete(e) {
            // The upload is now idle
        }
    </script>

### error

Fires when an upload / remove operation has failed.



Note: The error event fires only when the upload is in
[async mode](/web/upload/modes#asynchronous-mode).

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "save",
                removeUrl: "remove"
            },
            error: onError
        });

        function onError(e) {
            // Array with information about the uploaded files
            var files = e.files;

            if (e.operation == "upload") {
                alert("Failed to upload " + files.length + " files");
            }
        }
    </script>

#### Event Data

##### e.files `Array`

List of the files that were uploaded or removed . Each file has:


*   name
*   extension - the file extension
        including the leading dot - ".jpg", ".png", etc.
*   size - the file size in bytes (null if not available)
*   uid - the unique identifier of the file or batch of files

##### e.operation `String`

- "upload" or "remove".

##### e.XMLHttpRequest `Object`

This is either the original XHR used for the operation or a stub containing:


*   responseText
*   status
*   statusText
Verify that this is an actual XHR before accessing any other fields.

### progress

Fires when upload progress data is available.


Note: The progress event fires only when the upload is in
[async mode](/web/upload/modes#asynchronous-mode).

Note: The progress event is not fired in IE.
See [Supported Browsers](/web/upload/supported-browsers)

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "save",
                removeUrl: "remove"
            },
            progress: onProgress
        });

        function onProgress(e) {
            // Array with information about the uploaded files
            var files = e.files;

            console.log(e.percentComplete);
        }
    </script>

#### Event Data

##### e.files `Array`

List of the files that are being uploaded. Each file has:


*   name
*   extension - the file extension
        including the leading dot - ".jpg", ".png", etc.
*   size - the file size in bytes (null if not available)
*   uid - the unique identifier of the file or batch of files

##### percentComplete `Number`

Upload progress (0 - 100)

### remove

Fires when an uploaded file is about to be removed.
Cancelling the event will prevent the remove.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "save",
                removeUrl: "remove"
            },
            remove: onRemove
        });

        function onRemove(e) {
            // Array with information about the removed files
            var files = e.files;

            // Process the Remove event
            // Optionally cancel the remove operation by calling
            // e.preventDefault()
        }
    </script>

#### Event Data

##### e.files `Array`

List of the files that were uploaded or removed . Each file has:


*   name
*   extension - the file extension
        including the leading dot - ".jpg", ".png", etc.
*   size - the file size in bytes (null if not available)
*   uid - the unique identifier of the file or batch of files

##### data `Object`

Optional object that will be
sent to the save handler in the form of key/value pairs.

### select

Triggered when a file(s) is selected. Note: Cancelling this event will prevent the selection from
occurring.

#### Wire-up an event handler that triggered when a user selects a file(s)

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "save",
                removeUrl: "remove"
            },
            select: onSelect
        });

        function onSelect(e) {
            $.each(e.files, function (index, value) {
                console.log("Name: " + value.name);
                console.log("Size: " + value.size + " bytes");
                console.log("Extension: " + value.extension);
            });
        };
    </script>

#### Event Data

##### e `Object`

A custom event object. The event can be cancelled just like when using a standard jQuery event object via `e.preventDefault();`

##### e.files `Array`

An array of the selected files. Each item of the array is an object with the following properties:

*   name - the name of a selected file, including its extension
*   extension - the file extension of a selected file, including the leading dot (i.e. ".jpg")
*   size - the size (in bytes) of a selected file (null, if unavailable)
*   rawFile - an in-memory representation of a selected file
*   uid - the unique identifier of the file or batch of files

### success

Fires when an upload / remove operation has been completed successfully.

Note: The success event fires only when the upload is in
[async mode](/web/upload/modes#asynchronous-mode).

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "save",
                removeUrl: "remove"
            },
            success: onSuccess
        });

        function onSuccess(e) {
            // Array with information about the uploaded files
            var files = e.files;

            if (e.operation == "upload") {
                alert("Successfully uploaded " + files.length + " files");
            }
        }
    </script>

#### Event Data

##### e.files `Array`

List of the files that were uploaded or removed. Each file has:

*   name
*   extension - the file extension including the leading dot - ".jpg", ".png", etc.
*   size - the file size in bytes (null if not available)
*   uid - the unique identifier of the file or batch of files

##### e.operation `String`

"upload" or "remove".

##### e.response `Object`

The response object returned by the server.

##### e.XMLHttpRequest `Object`

This is either the original XHR used for the operation or a stub containing:


*   responseText
*   status
*   statusText
Verify that this is an actual XHR before accessing any other fields.

### upload

Fires when one or more files are about to be uploaded.
Canceling the event will prevent the upload.

> The upload event fires only when the upload is in
[async mode](/web/upload/modes#asynchronous-mode).

> It is possible to change the saveUrl at this point.

#### Event Data

##### e.files `Array`

List of the files that will be uploaded. File fields:

*   name
*   extension - the file extension including the leading dot - ".jpg", ".png", etc.
*   size - the file size in bytes (null if not available)
*   uid - the unique identifier of the file or batch of files

##### data `Object`

Optional object that will be
sent to the save handler in the form of key/value pairs.

##### e.formData `Object`

If set, will replace the payload of the upload request.

Can be set to a FormData, ArrayBufferView, Blob or
other valid parameter for [XMLHttpRequest.send](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#send\(\))

Note: Will be ignored if the browser does not support the File API.

##### e.XMLHttpRequest `Object`

Note: Will be *undefined* if the browser does not support the File API.

The XMLHttpRequest instance that will be used to carry out the upload.
The request will be in UNSENT state.

#### Example - Disallow certain files
    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "save",
                removeUrl: "remove"
            },
            upload: onUpload
        });

        function onUpload(e) {
            // Array with information about the uploaded files
            var files = e.files;

            // Check the extension of each file and abort the upload if it is not .jpg
            $.each(files, function () {
                if (this.extension.toLowerCase() != ".jpg") {
                    alert("Only .jpg files can be uploaded")
                    e.preventDefault();
                }
            });
        }
    </script>

#### Example - Add request header
    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "save",
                removeUrl: "remove"
            },
            upload: onUpload
        });

        function onUpload(e) {
            var xhr = e.XMLHttpRequest;
            if (xhr) {
                xhr.addEventListener("readystatechange", function (e) {
                    if (xhr.readyState == 1 /* OPENED */) {
                        xhr.setRequestHeader("X-Foo", "Bar");
                    }
                });
            }
        }
    </script>

#### Example - Change saveUrl before upload
    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "save",
                removeUrl: "remove"
            },
            upload: onUpload
        });

        function onUpload(e) {
            e.sender.options.async.saveUrl = "save?id" + 1;
        }
    </script>

#### Example - Replace payload
    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "save",
                removeUrl: "remove"
            },
            upload: onUpload
        });

        function onUpload(e) {
            e.formData = new FormData();
            e.formData.append("foo", "bar");
        }
    </script>
