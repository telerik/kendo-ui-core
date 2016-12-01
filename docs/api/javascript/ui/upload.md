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
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove"
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
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove",
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
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove",
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
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove",
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
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove"
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
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove",
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
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove",
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
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove"
            }
        });
    </script>

### async.withCredentials `Boolean` *(default: true)*

Controls whether to send credentials (cookies, headers) for cross-site requests.
This option will be ignored if the browser doesn't support File API.

### dropZone `String`

Initializes a dropzone element(s) based on a given selector that provides drag and drop file upload.

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
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove"
            },
            localization: {
                cancel: "customCancel"
            }
        });
    </script>

### localization.clearSelectedFiles `String`

Sets the text of the clear button.

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

Sets the drop zone hint.

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

### localization.headerStatusUploaded `String`

Sets the header status message for uploaded files.

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

Sets the header status message for files that are being uploaded.

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

### localization.invalidFileExtension `String`

Sets the text for invalid file extension validation message.

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

### localization.invalidMaxFileSize `String`

Sets the text for an invalid `maxFileSize` validation message.

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

Sets the text for an invalid `minFileSize` validation message.

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

Sets the text of the remove button text.

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

Sets the text of the retry button text.

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

Sets the "Select..." button text.

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

Sets the status message for uploaded files.

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

Sets the status message for files that are being uploaded.

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

Sets the text of the "Upload files" button.

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

Enables (**true**) or disables (**false**) the ability to select multiple files.
If **false**, users will be able to select only one file at a time. Note: This option does not
limit the total number of uploaded files in an asynchronous configuration.

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

Enables (**true**) or disables (**false**) the ability to display a file listing
for uploading a file(s). Disabling a file listing may be useful you wish to customize the UI; use the
client-side events to build your own UI.

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

Lists which file extensions are allowed to be uploaded. Recognizes entries of both `.type` and `type` values.

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

Defines the maximum file size that can be uploaded in bytes.

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

Defines the minimum file size that can be uploaded in bytes.

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

Removes all files (only visually from the UI) without issuing requests to the `remove` handler.

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

Removes all files for which the callback function returns `true` (only visually from the UI) without issuing requests to the `remove` handler.

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

Removes a file by ID (only visually from the UI) without issuing requests to the `remove` handler.

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

### focus

Focuses the upload's input element.

#### Example

    <input type="file" name="files" id="upload" />
    <script>
        $("#upload").kendoUpload();

        var upload = $("#upload").data("kendoUpload");

        // focus the upload's input element
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

`Array` a collection of all currently selected files.

### removeAllFiles

Removes all files by sending a standard `remove` request to the handler.

> **Important**
>
> Invoking the `removeAllFiles` method will not trigger the `remove` event.

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

> **Important**
>
> Invoking the `removeFile` method will not trigger the `remove` event.

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

Removes a file by ID by sending a standard `remove` request to the handler.

> **Important**
>
> Invoking the `removeFileByUid` method will not trigger the `remove` event.

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

### upload

Manually triggers the upload process.

> * This method is only applicable when the `async.autoUpload` option is set to `false`.
> * It is possible to trigger the manual upload of files by calling the `upload` method even if the Upload is disabled. In such scenarios, the Upload ignores its `enabled: false` configuration and the files are uploaded while the Upload remains inactive for the user to interact with it.  

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

Fires when the upload has been cancelled while in progress.

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

### clear

Triggered when files are cleared by clicking on the "Clear" button. Note: Cancelling this event will prevent the clearing the selected files.

#### Wire-up an event handler that triggered when a user clears selected files

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
			// Optionally cancel the clear operation by calling preventDefault method
            e.preventDefault();
        };
    </script>

#### Event Data

##### e `Object`

A custom event object. The event can be cancelled just like when using a standard jQuery event object via `e.preventDefault();`

### complete

Fires when all active uploads have completed either successfully or with errors.



Note: The complete event fires only when the upload is in
[async mode](/web/upload/modes#asynchronous-mode).

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
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove"
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
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove"
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
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove"
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
sent to the remove handler in the form of key/value pairs.

### select

Triggered when a file(s) is selected. Note: Cancelling this event will prevent the selection from
occurring.

#### Wire-up an event handler that triggered when a user selects a file(s)

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

> **Important**
> * The success event fires only when the upload is in [async mode](/web/upload/modes#asynchronous-mode).
> * It is possible to cancel the event. As a result, the file will be displayed as unsuccessfully uploaded.

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
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove"
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

#### Example - Change saveUrl before upload
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

#### Example - Replace payload
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
