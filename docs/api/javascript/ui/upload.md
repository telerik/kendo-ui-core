---
title: Upload
page_title: Configuration, methods and events of Kendo UI Upload
description: Configure the asynchronous upload of files with the Kendo UI Upload.
res_type: api
component: upload
---

# kendo.ui.Upload

Represents the Kendo UI Upload. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### async `Object`

Configures the asynchronous upload of files. For more details, refer to the article on the [async mode](/web/upload/modes#asynchronous-mode) of the Upload.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove"
            }
        });
    </script>

### async.autoUpload `Boolean`*(default: true)*

By default, the selected files are uploaded immediately. To change this behavior, set `autoUpload` to `false`.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove",
                autoUpload: false
            }
        });
    </script>

### async.batch `Boolean`*(default: false)*

By default and if supported by the browser, the selected files are uploaded in separate requests. To change this behavior, set `batch` to `true`. As a result, all selected files are uploaded in one request.

The batch mode applies to multiple files which are selected simultaneously. Files that are selected one after the other are uploaded in separate requests.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove",
                batch: true
            }
        });
    </script>

### async.chunkSize `Number`

When `async.chunkSize` is set, the selected files are uploaded chunk by chunk with the declared size. Each request sends a separate file blob and additional string metadata to the server. This metadata is in a stringified JSON format and contains the `fileName`, `relativePath`, `chunkIndex`, `contentType`, `totalFileSize`, `totalChunks`, and `uploadUid` properties. These properties enable the validation and combination of the file on the server side. The response also returns a JSON object with the `uploaded` and `fileUid` properties, which notifies the client what the next chunk is.

> The `async.chunkSize` property is available only when [`async.batch`](/api/javascript/ui/upload#configuration-async.batch) is set to `false`.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove",
                chunkSize: 2000
            }
        });
    </script>

### async.concurrent `Boolean` *(default: false)*

By default, the selected files are uploaded one after the other. When `async.concurrent` is set to `true`, all selected files start to upload simultaneously.

> The `async.concurrent` property is available only when [`async.chunkSize`](/api/javascript/ui/upload#configuration-async.chunkSize) is set.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove",
                chunkSize: 2000,
                concurrent: true
            }
        });
    </script>

### async.autoRetryAfter `Number`

If `async.autoRetryAfter` is set, the failed upload request is repeated after the declared amount of time in miliseconds.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove",
                chunkSize: 2000,
                autoRetryAfter: 300
            }
        });
    </script>

### async.maxAutoRetries `Number`*(default: 1)*

Sets the maximum number of attempts that are performed if an upload fails.

> The `async.maxAutoRetries` property is available only when [`async.autoRetryAfter`](/api/javascript/ui/upload#configuration-async.autoRetryAfter) is set.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove",
                chunkSize: 2000,
                autoRetryAfter: 300,
                maxAutoRetries: 4
            }
        });
    </script>

### async.removeField `String`*(default: "fileNames")*

The name of the form field that is submitted to `removeUrl`.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove",
                removeField: "customRemoveField"
            }
        });
    </script>

### async.removeUrl `String`

The URL of the handler which is responsible for the removal of the uploaded files (if any). The handler must accept `POST` requests with one or more `"fileNames"` fields which specify the files that will be deleted.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove"
            }
        });
    </script>

### async.removeVerb `String`*(default: "POST")*

The `HTTP` verb that will be used by the `remove` action.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove",
                removeVerb: "DELETE"
            }
        });
    </script>

### async.saveField `String`

The name of the form field which is submitted to `saveUrl`. The default value is the input name.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove",
                saveField: "customSaveField"
            }
        });
    </script>

### async.saveUrl `String`

The URL of the handler that will receive the submitted files. The handler must accept `POST` requests which contain one or more fields with the same name as the original input name.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove"
            }
        });
    </script>

### async.useArrayBuffer `Boolean` *(default: false)*

By default, the files are uploaded as file data. When set to `true`, the files are read as a file buffer by using [`FileReader`](https://developer.mozilla.org/en-US/docs/Web/API/FileReader). This buffer is sent in the request body.

 > The `FileReader` consumes the memory of the browser. As a result, if the user uploads a large file, then all the available memory of the client might be consumed and the upload might fail.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove",
                useArrayBuffer: true
            }
        });
    </script>

### async.withCredentials `Boolean` *(default: true)*

Controls whether to send credentials (cookies, headers) for cross-site requests.

> If the browser does not support the File API, `async.withCredentials` is ignored.

### directory `Boolean` *(default: false)*

Enables the selection of folders instead of files. When the user selects a directory, its entire content hierarchy of files is included in the set of selected items. The `directory` setting is available only in browsers which support [`webkitdirectory`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory).

> When set, the property allows you to select only folders for upload. Files cannot be selected. In browsers which do not support the `directory` feature, the behavior falls back to the default file selection.

#### Example

    <div>
     	<input name="files" id="files" type="file" />
     	<div class="dropZoneElement">Drag and drop file here</div>
    </div>
    <script>
        $(document).ready(function() {
            $("#files").kendoUpload({
                async: {
                    saveUrl: "http://my-app.localhost/save",
                    removeUrl: "http://my-app.localhost/remove"
                },
                directory: true
            });
        });
    </script

### directoryDrop `Boolean` *(default: false)*

Enables the dropping of folders over the Upload and its drop zone. When a directory is dropped, its entire content hierarchy of files is included in the set of selected items. The `directoryDrop` setting is available only in browsers which support [`DataTransferItem`](https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItem) and [`webkitGetAsEntry`](https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItem/webkitGetAsEntry).

> When set, the property allows you to drop only folders for upload. Files cannot be uploaded. In browsers which do not support the `directoryDrop` feature, the behavior falls back to the default file drop.

#### Example

    <div>
    	<input name="files" id="files" type="file" />
    	<div class="dropZoneElement">Drag and drop file here</div>
    </div>
    <script>
        $(document).ready(function() {
            $("#files").kendoUpload({
                async: {
                    saveUrl: "http://my-app.localhost/save",
                    removeUrl: "http://my-app.localhost/remove"
                },
                directoryDrop: true
            });
        });
    </script

### dropZone `String`

Initializes a drop-zone element based on a given selector, which provides the drag-and-drop file upload.

#### Example

	<div>
    	<input name="files" id="files" type="file" />
    	<div class="dropZoneElement">Drag and drop file here</div>
	</div>
	<script>
	    $(document).ready(function() {
	        $("#files").kendoUpload({
	            async: {
	                saveUrl: "http://my-app.localhost/save",
					removeUrl: "http://my-app.localhost/remove"
	            },
	            dropZone: ".dropZoneElement"
	        });
	    });
	</script>

### enabled `Boolean`*(default: true)*

Enables (if set to `true`) or disables (if set to `false`) an Upload. To re-enable a disabled Upload, use `enable()`.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            enabled: false
        });
    </script>

### files `Array`

The list of files that will be initially rendered in the files list of the Upload.

Each file object in the array has to contain the following properties:

* name
* size
* extension

> The `files` option is available only when the Upload is in [async mode](/web/upload/modes#asynchronous-mode). As a result, the files are displayed as uploaded successfully.

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

Sets the text of the **Cancel** button.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove"
            },
            localization: {
                cancel: "customCancel"
            }
        });
    </script>

### localization.clearSelectedFiles `String`

Sets the text of the **Clear** button.

#### Example

	<input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove"
            },
            localization: {
                clearSelectedFiles: "RemoveFiles"
            }
        });
    </script>

### localization.dropFilesHere `String`*(default: "drop files here to upload")*

Sets the hint of the drop-zone.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove"
            },
            localization: {
                dropFilesHere: "customDropFilesHere"
            }
        });
    </script>

### localization.headerStatusPaused `String`

Sets the paused status message of the header.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove"
            },
            localization: {
                headerStatusPaused: "customHeaderStatusPaused"
            }
        });
    </script>

### localization.headerStatusUploaded `String`

Sets the status message of the header for the uploaded files.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove"
            },
            localization: {
                headerStatusUploaded: "customHeaderStatusUploaded"
            }
        });
    </script>

### localization.headerStatusUploading `String`

Sets the status message of the header for the files that are in the process of upload.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove"
            },
            localization: {
                headerStatusUploading: "customHeaderStatusUploading"
            }
        });
    </script>

### localization.uploadSuccess `String`

Sets the text of the validation message when a file is succesfully uploaded.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove"
            },
            localization: {
                uploadSuccess: "customUploadSuccess"
            }
        });
    </script>

### localization.uploadFail `String`

Sets the text of the validation message when a file fails to upload.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove"
            },
            localization: {
                uploadFail: "customUploadFail"
            }
        });
    </script>

### localization.invalidFileExtension `String`

Sets the text of the validation message for an invalid file extension.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove"
            },
            localization: {
                invalidFileExtension: "customInvalidFileExtension"
            }
        });
    </script>

### localization.invalidFiles `String`

Sets the text of the validation messages for invalid files when the `batch` property is set to `true` and two or more files fail the validation.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove"
                batch:true
            },
            localization: {
                invalidFiles: "customInvalidFiles"
            }
        });
    </script>

### localization.invalidMaxFileSize `String`

Sets the text of the validation message for an invalid maximum file size.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove"
            },
            localization: {
                invalidMaxFileSize: "customInvalidMaxFileSize"
            }
        });
    </script>

### localization.invalidMinFileSize `String`

Sets the text of the validation message for an invalid minimum file size.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove"
            },
            localization: {
                invalidMinFileSize: "customInvalidMinFileSize"
            }
        });
    </script>

### localization.remove `String`

Sets the text of the **Remove** button.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove"
            },
            localization: {
                remove: "customRemove"
            }
        });
    </script>

### localization.retry `String`

Sets the text of the **Retry** button.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove"
            },
            localization: {
                retry: "customRetry"
            }
        });
    </script>

### localization.select `String`

Sets the text of the **Select...** button.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove"
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
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove"
            },
            localization: {
                statusFailed: "customStatusFailed"
            }
        });
    </script>

### localization.statusUploaded `String`

Sets the status message for successful uploads.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove"
            },
            localization: {
                statusUploaded: "customStatusUploaded"
            }
        });
    </script>

### localization.statusUploading `String`

Sets the status message for files that are in the process of upload.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove"
            },
            localization: {
                statusUploading: "customStatusUploading"
            }
        });
    </script>

### localization.uploadSelectedFiles `String`

Sets the text of the **Upload files** button.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove"
            },
            localization: {
                uploadSelectedFiles: "customUploadSelectedFiles"
            }
        });
    </script>

### multiple `Boolean`*(default: true)*

Enables (if set to `true`) or disables (if set to `false`) the selection of multiple files. If set to `false`, the user can select only one file at a time.

> In an asynchronous configuration, the `multiple` option does not limit the total number of uploaded files.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove"
            },
            multiple: false
        });
    </script>

### showFileList `Boolean`*(default: true)*

Enables (if set to `true`) or disables (if set to `false`) the display of a file listing for the file upload. The disabling of a file listing might be useful if you want to customize the UI. To build your own UI, use the client-side events.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove"
            },
            showFileList: false
        });
    </script>

### template `String|Function`

Sets a [template](/api/javascript/kendo/methods/template) for rendering the files in the file list.

The `template` data `Array` consists of:

* name - The name of the file. If in batch upload mode, represents a string combination of all file names separated with comma.
* size - The file size in bytes. If in batch upload mode, represents the total file size. If not available, the value is `null`.
* files - An array which contains information about all selected files (name, size, and extension).

> * To render an action button for each file, add the following markup to the template: `<button type='button' class='k-upload-action'></button><button type='button' class='k-upload-action'></button>`.
> * To use the default progress-bar, add the following markup at the beginning of the template: `<span class='k-progress'></span>`. Then, render the rest of the template that relates to it. For a live demo, refer to the example on the [Upload templates](https://demos.telerik.com/kendo-ui/web/upload/templates.html).

#### Example - specifying the template as a function

    <input type="file" name="files" id="upload" />
    <script id="fileTemplate" type="text/x-kendo-template">
        <div>
            <p>Name: #=name#</p>
            <p>Size: #=size# bytes</p>
            <p>Extension: #=files[0].extension#</p>
            <strong class='k-upload-status'>
                <button type='button' class='k-upload-action'></button>
                <button type='button' class='k-upload-action'></button>
            </strong>
        </div>
    </script>
    <script>
        $("#upload").kendoUpload({
            template: kendo.template($('#fileTemplate').html())
        });
    </script>

#### Example - specifying the template as a string

    <input type="file" name="files" id="upload" />
    <script>
        $("#upload").kendoUpload({
        template: "<div><p>Name: #=name#</p>" +
                  "<p>Size: #=size# bytes</p><p>Extension: #=files[0].extension#</p>" +
                  "<strong class='k-upload-status'>" +
                  "<button type='button' class='k-upload-action'></button>" +
                  "<button type='button' class='k-upload-action'></button>" +
                  "</strong>" +
                  "</div>"
        });
    </script>

### validation `Object`

Configures the validation options for uploaded files.

#### Example

	 <input name="files" id="files" type="file" />
	 <script>
    	$(document).ready(function() {
        	$("#files").kendoUpload({
            	async: {
                	saveUrl: "http://my-app.localhost/save",
					removeUrl: "http://my-app.localhost/remove"
            	},
            	validation: {
                	allowedExtensions: [".jpg"],
                	maxFileSize: 900000,
                	minFileSize: 300000
            	}
        });
    });
	</script>

### validation.allowedExtensions `Array`

A list of the file extensions which are allowed for upload. Recognizes entries of both `.type` and `type` values.

#### Example

	<input name="files" id="files" type="file" />
	<script>
	    $(document).ready(function() {
	        $("#files").kendoUpload({
	            async: {
	                saveUrl: "http://my-app.localhost/save",
					removeUrl: "http://my-app.localhost/remove"
	            },
	            validation: {
	                allowedExtensions: [".jpg"],
	            }
	        });
	    });
	</script>

### validation.maxFileSize `Number`

Defines the maximum file size in bytes allowed for upload.

#### Example

	<input name="files" id="files" type="file" />
	<script>
	    $(document).ready(function() {
	        $("#files").kendoUpload({
	            async: {
	                saveUrl: "http://my-app.localhost/save",
					removeUrl: "http://my-app.localhost/remove"
	            },
	            validation: {
	                maxFileSize: 900000
	            }
	        });
	    });
	</script>

### validation.minFileSize `Number`

Defines the minimum file size in bytes allowed for upload.

#### Example

	<input name="files" id="files" type="file" />
	<script>
	    $(document).ready(function() {
	        $("#files").kendoUpload({
	            async: {
	                saveUrl: "http://my-app.localhost/save",
					removeUrl: "http://my-app.localhost/remove"
	            },
	            validation: {
	                minFileSize: 300000
	            }
	        });
	    });
	</script>

## Methods

### clearAllFiles

Visually removes all files from the UI without issuing requests to the `remove` handler.

#### Example

    <input name="files" id="files" type="file" />
    <button id="clearAll" class="k-button">Clear all</button>
    <script>
      $(document).ready(function() {
        $("#files").kendoUpload();

        $("#clearAll").on('click', function(e){
          e.preventDefault();

          var upload = $("#files").data("kendoUpload");
          upload.clearAllFiles();
        })
      });
    </script>

### clearFile

Visually removes all files from the UI for which the callback function returns `true` without issuing requests to the `remove` handler.

#### Example

    <input name="files" id="files" type="file" />
    <button id="clearFile" class="k-button">Clear non-image files</button>
    <script>

      $(document).ready(function() {
        $("#files").kendoUpload({
          async: {
            autoUpload: false,
            saveUrl: "http://my-app.localhost/save",
            removeUrl: "http://my-app.localhost/remove"
          }
        });

        $("#clearFile").on('click', function(e){
          e.preventDefault();

          var upload = $("#files").data("kendoUpload");
          upload.clearFile(function(file){
            switch (file[0].extension) {
              case '.jpg':
              case '.img':
              case '.png':
              case '.gif':return false;
              default: return true;
            }
          });
        })
      });
    </script>

#### Parameters

##### callback `Function`

### clearFileByUid

Visually removes a file by its ID from the UI without issuing requests to the `remove` handler.

#### Example

    <input name="files" id="files" type="file" />
    <button id="clearSelected" class="k-button">Clear all checked</button>

    <script id="fileTemplate" type="text/x-kendo-template">
       <span class='k-progress'></span>
       <input id='#=files[0].uid#' type='checkbox' class='k-checkbox' />
       <label for='#=files[0].uid#' class='k-checkbox-label'>Filename: #=name#</label>
    </script>

    <script>
      $(document).ready(function() {
        $("#files").kendoUpload({
          template: $("#fileTemplate").html()
        });

        $("#clearSelected").on('click', function(e){
          e.preventDefault();
          var upload = $("#files").data("kendoUpload");

          upload.wrapper.find(".k-checkbox:checked").each(function() {
          	 upload.clearFileByUid($(this).attr("id"));
          });
        });
      });
    </script>

#### Parameters

##### uid `String`

### destroy

Prepares the Upload for a safe removal from the DOM. Detaches all event handlers and removes the `jQuery.data` attributes to avoid memory leaks. Calls the `destroy` method of any child Kendo UI widget.

> The `destroy` method does not remove the Upload element from the DOM.

#### Example

    <input type="file" name="files" id="upload" />
    <script>
        $("#upload").kendoUpload({
            select: function () {
                //sample event
            }
        });

        var upload = $("#upload").data("kendoUpload");

        // Detaches events and prepares for a safe removal
        upload.destroy();
    </script>

### disable

Disables the Upload.

#### Example

    <input type="file" name="files" id="upload" />
    <script>
        $("#upload").kendoUpload();

        var upload = $("#upload").data("kendoUpload");

        // Disables the Upload
        upload.disable();
    </script>

### enable

Enables the Upload.

#### Example

    <input type="file" name="files" id="upload" />
    <script>
        // The Upload is disabled when initialized
        $("#upload").kendoUpload({
            enabled: false
        });

        var upload = $("#upload").data("kendoUpload");

        // Enables the Upload
        upload.enable();
    </script>

#### Parameters

##### enable `Boolean` *(optional)*

The argument which defines whether to enable or disable the Upload.

### focus

Focuses the input element of the Upload.

#### Example

    <input type="file" name="files" id="upload" />
    <script>
        $("#upload").kendoUpload();

        var upload = $("#upload").data("kendoUpload");

        // Focuses the input element of the Upload
        upload.focus();
    </script>

### getFiles

Retrieves the files that are currently selected.

#### Example

    <input name="files" id="files" type="file" />
    <button id="getFiles" class="k-button">Show selected files count</button>
    <script>

      $(document).ready(function() {
        $("#files").kendoUpload();

        $("#getFiles").on('click', function(e){
          e.preventDefault();

          var upload = $("#files").data("kendoUpload"),
              files = upload.getFiles();

          alert("You have selected " + files.length  + " files");
          console.log(files);
        })
      });
    </script>

#### Returns

Represents an `Array` collection of all currently selected files.

### pause

Pauses the upload of a file that is uploaded in chunks.

#### Example

    <input name="files" id="files" type="file" />
    <button id="pause" class="k-button">Pause</button>
    <script>
      $(document).ready(function() {
        $("#files").kendoUpload({
           async: {
            chunkSize:1100,
            autoUpload: false,
            saveUrl: "http://my-app.localhost/save",
            removeUrl: "http://my-app.localhost/remove"
          }
        });

        $("#pause").on('click', function(e){
          e.preventDefault();

          var upload = $("#files").data("kendoUpload");
          var fileEntry = upload.wrapper.find(".k-file").first();

          upload.pause(fileEntry);
        })
      });
    </script>

#### Parameters

##### li `jQuery`

A jQuery object which represents the file that will be paused.

### resume

Resumes the upload of a paused file that is being uploaded in chunks.

#### Example

    <input name="files" id="files" type="file" />
    <button id="resume" class="k-button">resume</button>
    <script>
      $(document).ready(function() {
        $("#files").kendoUpload({
           async: {
            chunkSize:1100,
            autoUpload: false,
            saveUrl: "http://my-app.localhost/save",
            removeUrl: "http://my-app.localhost/remove"
          }
        });

        $("#pause").on('click', function(e){
          e.preventDefault();

          var upload = $("#files").data("kendoUpload");
          var fileEntry = upload.wrapper.find(".k-file").first();

          upload.resume(fileEntry);
        })
      });
    </script>

#### Parameters

##### li `jQuery`

A jQuery object which represents the file that will be resumed.

### removeAllFiles

Removes all files by sending a standard `remove` request to the handler.

> The invoking of the `removeAllFiles` method does not trigger the `remove` event.

#### Example

    <input name="files" id="files" type="file" />
    <button id="removeAll" class="k-button">Remove all</button>
    <script>
      $(document).ready(function() {
        $("#files").kendoUpload({
           async: {
            autoUpload: false,
            saveUrl: "http://my-app.localhost/save",
            removeUrl: "http://my-app.localhost/remove"
          }
        });

        $("#removeAll").on('click', function(e){
          e.preventDefault();

          var upload = $("#files").data("kendoUpload");
          upload.removeAllFiles();
        })
      });
    </script>

### removeFile

Removes all files for which the callback function returns `true` by sending a standard `remove` request to the handler.

> The invoking of the `removeFile` method does not trigger the `remove` event.

#### Example

    <input name="files" id="files" type="file" />
    <button id="removeFile" class="k-button">Remove non-image files</button>
    <script>

      $(document).ready(function() {
        $("#files").kendoUpload({
          async: {
            autoUpload: false,
            saveUrl: "http://my-app.localhost/save",
            removeUrl: "http://my-app.localhost/remove"
          }
        });

        $("#removeFile").on('click', function(e){
          e.preventDefault();

          var upload = $("#files").data("kendoUpload");
          upload.removeFile(function(file){
            switch (file[0].extension) {
              case '.jpg':
              case '.img':
              case '.png':
              case '.gif':return false;
              default: return true;
            }
          });
        })
      });
    </script>

#### Parameters

##### callback `Function`

### removeFileByUid

Removes a file by its ID by sending a standard `remove` request to the handler.

> The invoking of the `removeFileByUid` method does not trigger the `remove` event.

#### Example

    <input name="files" id="files" type="file" />
    <button id="removeSelected" class="k-button">Remove all checked</button>

    <script id="fileTemplate" type="text/x-kendo-template">
       <span class='k-progress'></span>
       <input id='#=files[0].uid#' type='checkbox' class='k-checkbox' />
       <label for='#=files[0].uid#' class='k-checkbox-label'>Filename: #=name#</label>
    </script>

    <script>
      $(document).ready(function() {
        $("#files").kendoUpload({
          template: $("#fileTemplate").html(),
          async: {
            autoUpload: false,
            saveUrl: "http://my-app.localhost/save",
            removeUrl: "http://my-app.localhost/remove"
          }
        });

        $("#removeSelected").on('click', function(e){
          e.preventDefault();
          var upload = $("#files").data("kendoUpload");

          upload.wrapper.find(".k-checkbox:checked").each(function() {
          	 upload.removeFileByUid($(this).attr("id"));
          });
        });
      });
    </script>

#### Parameters

##### uid `String`

### toggle

Toggles the enabled state of the Upload.

#### Example

    <input type="file" name="files" id="upload" />
    <script>
        // The Upload is disabled when initialized
        $("#upload").kendoUpload({
            enabled: false
        });

        var upload = $("#upload").data("kendoUpload");

        // Toggles the enabled state of the Upload
        upload.toggle();
    </script>

#### Parameters

##### enable `Boolean`

(Optional) The new enabled state of the Upload.

### upload

Manually triggers the upload process.

> * The `upload` method is available only when the `async.autoUpload` option is set to `false`.
> * You can trigger the manual upload of files even if the Upload is disabled by calling the `upload` method. In such scenarios, the Upload ignores its `enabled: false` configuration and the files are uploaded while the Upload remains inactive for the user to interact with.

#### Example

    <style>
      .k-clear-selected,
      .k-upload-selected {
        display: none !important;
      }
    </style>

    <input name="files" id="files" type="file" />
    <button id="uploadAll" class="k-button">Start upload</button>
    <script>

      $(document).ready(function() {
        $("#files").kendoUpload({
          async: {
            autoUpload: false,
            saveUrl: "http://my-app.localhost/save",
            removeUrl: "http://my-app.localhost/remove"
          }
        });

        $("#uploadAll").on('click', function(e){
          e.preventDefault();

          var upload = $("#files").data("kendoUpload");
          upload.upload();
        })
      });
    </script>

## Events

### cancel

Fires when the upload was cancelled while in progress.

> The `cancel` event fires only when the Upload is in [async mode](/web/upload/modes#asynchronous-mode).

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove"
            },
            cancel: onCancel
        });

        function onCancel(e) {
            // An array with information about the uploaded files
            var files = e.files;

            // Processes the cancel event
        }
    </script>

#### Event Data

##### e.files `Array`

A list of the files that were uploaded or removed.

Each file has:

* name
* extension - The file extension including the leading dot. For example, `.jpg`, `.png`, and so on.
* size - The file size in bytes. If not available, the value is `null`.
* uid - The unique identifier of the file or batch of files.

### clear

Fires when the files are cleared by clicking on the **Clear** button.

> The cancelling of the `cancel` event prevents the clearing of the selected files.

#### Example - wiring up an event handler that triggers when a user clears the selected files

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove",
				autoUpload: false
            },
            clear: onClear
        });

        function onClear(e) {
			// Optionally cancels the clear operation by calling the preventDefault method
            e.preventDefault();
        };
    </script>

#### Event Data

##### e `Object`

A custom event object. The event can be canceled similar to a standard jQuery event object by using `e.preventDefault();`.

### complete

Fires when all active uploads complete&mdash;either successfully or with errors.

> The `complete` event fires only when the Upload is in [async mode](/web/upload/modes#asynchronous-mode).

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove"
            },
            complete: onComplete
        });

        function onComplete(e) {
            // The Upload is now idle
        }
    </script>

### error

Fires when an `upload` or `remove` operation fails.

> The `error` event fires only when the Upload is in [async mode](/web/upload/modes#asynchronous-mode).

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove"
            },
            error: onError
        });

        function onError(e) {
            // An array with information about the uploaded files
            var files = e.files;

            if (e.operation == "upload") {
                alert("Failed to upload " + files.length + " files");
            }
        }
    </script>

#### Event Data

##### e.files `Array`

Lists the files that were uploaded or removed.

Each file has:

* name
* extension - The file extension including the leading dot. For example, `.jpg`, `.png`, an so on.
* size - The file size in bytes. If not available, the value is `null`.
* uid - The unique identifier of the file or batch of files.

##### e.operation `String`

The `upload` or `remove` operation.

##### e.XMLHttpRequest `Object`

Represents either the original XHR that is used for the operation or a stub that contains:

* responseText
* status
* statusText

Before you access any other fields, verify that this is an actual XHR.

### pause

Fires when the files are cleared by clicking the **Pause** button. The button is visible if `chunksize` is set.

#### Example - wiring up an event handler that triggers when a user clears selects files

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove",
				autoUpload: false
            },
            pause: onPause
        });

        function onPause(e) {
			// Optionally pauses the clear operation by calling the preventDefault method
            e.preventDefault();
        };
    </script>

#### Event Data

##### e `Object`

A custom event object. The event can be canceled similar to a standard jQuery event object by using `e.preventDefault();`.

### progress

Fires when the data about the progress of the upload is available.

> * The `progress` event fires only when the Upload is in [async mode](/web/upload/modes#asynchronous-mode).
> * The `progress` event is not fired in Internet Explorer. For more information, refer to the article on [supported browsers](/web/upload/supported-browsers).

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove"
            },
            progress: onProgress
        });

        function onProgress(e) {
            // An array with information about the uploaded files
            var files = e.files;

            console.log(e.percentComplete);
        }
    </script>

#### Event Data

##### e.files `Array`

Lists the files that are in the process of upload.

Each file has:
* name
* extension - The file extension including the leading dot. For example, `.jpg`, `.png`, and so on.
* size - The file size in bytes. If not available, the value is `null`.
* uid - The unique identifier of the file or batch of files.

##### percentComplete `Number`

Defines the progress of the upload. The available values are from 0 to 100.

### resume

Fires when the files are resumed through clicking the **Resume** button. The button is visible if `chunksize` is set and the file upload is paused.

#### Example - wiring up an event handler that triggers when a user resumes a selected file

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove",
				autoUpload: false
            },
            resume: onResume
        });

        function onResume(e) {
			// Optionally resumes the clear operation by calling the preventDefault method
            e.preventDefault();
        };
    </script>

### remove

Fires when an uploaded file is about to be removed. If the event is canceled, the `remove` operation is prevented.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove"
            },
            remove: onRemove
        });

        function onRemove(e) {
            // An array with information about the removed files
            var files = e.files;

            // Processes the remove event
            // Optionally cancels the remove operation by calling
            // e.preventDefault()
        }
    </script>

#### Event Data

##### e.files `Array`

Lists the files that were uploaded or removed.

Each file has:

* name
* extension - The file extension including the leading dot. For example, `.jpg`, `.png`, and so on.
* size - The file size in bytes. If not available, the value is `null`.
* uid - The unique identifier of the file or batch of files.

##### e.headers `Object`

Represents the additional headers that will be added to the `remove` request.

##### data `Object`

Represents an optional object that is sent to the remove handler in the form of key/value pairs.

### select

Fires when a file is selected.

> The cancelling of the `select` event prevents the selection from occurring.

#### Example - wiring up an event handler that triggers when a user selects a file

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove"
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

A custom event object. The event can be canceled similar to a standard jQuery event object by using `e.preventDefault();`.

##### e.files `Array`

An array of the selected files.

Each item of the array is an object with the following properties:

* name - The name of a selected file, including its extension.
* extension - The file extension of a selected file, including the leading dot. For example, `.jpg`, `.png`, and so on.
* size - The size of a selected file in bytes. If not available, the value is `null`.
* rawFile - An in-memory representation of a selected file.
* uid - The unique identifier of the file or batch of files.

### success

Fires when an `upload` or `remove` operation is completed successfully.

> * The `success` event fires only when the Upload is in [async mode](/web/upload/modes#asynchronous-mode).
> * It is possible to cancel the event. As a result, the file is displayed as uploaded unsuccessfully.

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove"
            },
            success: onSuccess
        });

        function onSuccess(e) {
            // An array with information about the uploaded files
            var files = e.files;

            if (e.operation == "upload") {
                alert("Successfully uploaded " + files.length + " files");
            }
        }
    </script>

#### Event Data

##### e.files `Array`

A list of the files that are uploaded or removed.

Each file has:

* name
* extension - The file extension including the leading dot. For example, `.jpg`, `.png`, and so on.
* size - The file size in bytes. If not available, the value is `null`.
* uid - The unique identifier of the file or batch of files.

##### e.operation `String`

The `upload` or `remove` operation.

##### e.response `Object`

The response object that is returned by the server.

##### e.XMLHttpRequest `Object`

Represents either the original XHR that is used for the operation or a stub that contains:

* responseText
* status
* statusText

Before you access any other fields, verify that this is an actual XHR.

### upload

Fires when one or more files are about to be uploaded. The canceling of the event prevents the upload.

> * The `upload` event fires only when the upload is in [async mode](/web/upload/modes#asynchronous-mode).
> * At this point, you can change the `saveUrl`.

#### Event Data

##### e.files `Array`

A list of the files that will be uploaded.

The file fields are:

* name
* extension - The file extension including the leading dot. For example, `.jpg`, `.png`, and so on.
* size - The file size in bytes. If not available, the value is `null`.
* uid - The unique identifier of the file or batch of files.

##### data `Object`

Represents an optional object that will be sent to the save handler in the form of key/value pairs.

##### e.formData `Object`

If set, `e.formData` replaces the payload of the `upload` request. You can set it to a `FormData`, `ArrayBufferView`, `Blob`, or
other valid parameter for [`XMLHttpRequest.send`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#send\(\)).

> If the browser does not support the File API, `e.formData` is ignored.

##### e.XMLHttpRequest `Object`

Represents the `XMLHttpRequest` instance that is used to carry out the upload. The request will be in the `UNSENT` state.

> If the browser does not support the File API,, the values is `undefined`.

#### Example - disallowing certain files

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove"
            },
            upload: onUpload
        });

        function onUpload(e) {
            // An array with information about the uploaded files
            var files = e.files;

            // Checks the extension of each file and aborts the upload if it is not .jpg
            $.each(files, function () {
                if (this.extension.toLowerCase() != ".jpg") {
                    alert("Only .jpg files can be uploaded")
                    e.preventDefault();
                }
            });
        }
    </script>

#### Example - adding the request header

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove"
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

#### Example - changing saveUrl before upload

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove"
            },
            upload: onUpload
        });

        function onUpload(e) {
            e.sender.options.async.saveUrl = "save?id" + 1;
        }
    </script>

#### Example - replacing the payload

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove"
            },
            upload: onUpload
        });

        function onUpload(e) {
            e.formData = new FormData();
            e.formData.append("foo", "bar");
        }
    </script>
