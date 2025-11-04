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


<div class="meta-api-description">
How do I set up asynchronous file uploading with Kendo UI for jQuery? Set up asynchronous file uploading to enable non-blocking, background file transfers with customizable options such as defining upload URLs, selecting HTTP methods like POST or PUT, controlling automatic start of uploads, enabling chunked data transfer for large files, and managing server-side actions for saving or removing uploaded files. Customize how files are sent to the server, handle upload progress without blocking the UI, configure retries or cancellations, and control the interaction between client and server during file transfer processes. Adjust settings to optimize upload performance, reliability, and user experience through asynchronous, event-driven handling of file uploads.
</div>

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


<div class="meta-api-description">
How can I configure Kendo UI Upload to automatically start uploading files after selection? Control the timing of file uploads by configuring automatic versus manual upload initiation, enabling immediate upload upon file selection or deferring uploads for batch processing, programmatic triggers, custom upload workflows, delayed submission, manual start controls, preventing instant server transfers, toggling auto send behavior, and managing upload execution based on user interaction or automated scripts.
</div>

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


<div class="meta-api-description">
How to enable batch upload mode in Kendo UI Upload widget? Configure upload operations to send multiple files together in a single request by enabling batch upload mode, allowing simultaneous transmission of all selected files rather than individual file uploads; control whether files are uploaded individually or grouped during selection, set batch processing for bulk file transfers, optimize upload workflows for handling multiple files at once, manage file upload concurrency and request grouping, and adjust behavior for browsers supporting single-request multi-file uploads versus separate request per file scenarios.
</div>

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


<div class="meta-api-description">
How do I set the chunk size for Kendo UI's Upload widget to optimize asynchronous file uploads? Configure chunked file uploads to split large files into smaller parts sent individually with their data and JSON metadata including filename, path, chunk index, content type, total size, total chunks, and unique upload IDs for server validation and reassembly. Control the size of each chunk to optimize asynchronous upload performance and support resuming interrupted transfers by processing server responses indicating which chunks succeeded and which to retry. Adjust chunk sizing to manage network bandwidth, improve reliability in unstable connections, and enable partial uploads without batching all chunks together. Enable efficient file transfer for large uploads by setting chunk limits and handling server-side acknowledgments to coordinate sequential or parallel chunk sending while tracking upload progress. This feature supports granular control over how large files are uploaded in pieces, ensuring compatibility with backend validation and reconstructing files from fragmented parts.
</div>

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


<div class="meta-api-description">
How to enable concurrent file uploads in Kendo UI for jQuery Upload widget? Control the ability to upload multiple files at the same time by enabling parallel or concurrent uploads, allowing all selected files to start uploading simultaneously instead of one-by-one sequentially. Configure the upload process for simultaneous requests, manage concurrent file transfers, set parallelism for chunked uploads, and optimize batch upload speeds by using chunk-based concurrency controls. This setting is relevant when handling asynchronous chunked file uploads, enabling efficient, concurrent data transfer and reducing total upload time in multi-file scenarios.
</div>

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


<div class="meta-api-description">
How do I configure automatic retry delays for failed uploads in Kendo UI Upload? Control and configure automatic retry delays for failed asynchronous uploads by setting the wait time in milliseconds before reattempting a failed file upload operation. Adjust how long the system pauses before retrying upload requests after errors, enabling fine-tuned management of upload retry intervals, backoff timing, and handling intermittent network failures or server issues during file transfers. This setting influences how upload components automatically repeat failed requests by specifying the retry delay duration, allowing developers to set timeout intervals between retry attempts and optimize upload resilience.
</div>

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


<div class="meta-api-description">
How many times can Kendo UI Upload try to upload a file automatically if it fails? Set the maximum number of automatic retry attempts for failed file uploads to control retry loops, manage network bandwidth, and avoid excessive retries after upload errors or network interruptions. Configure how many times an asynchronous upload operation retries on failure, limit repeated attempts to prevent infinite retry cycles, and adjust retry counts to balance reliability with resource usage during unstable connections or timeouts. This setting affects automated retry behavior, specifying how often the system tries again after upload failures when automatic retry is enabled.
</div>

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


<div class="meta-api-description">
How do I customize the form field name sent to the server when removing files asynchronously with Kendo UI upload control? Set or customize the parameter name used in asynchronous file removal requests to control which form field is sent with delete actions when removing uploads, enabling configuration of the form data key submitted to the server during async file deletions, specifying the exact field name included in remove requests, adjusting the request payload for server-side processing or API compatibility when files are removed asynchronously, and managing how the form field is identified and transmitted during async removal operations.
</div>

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


<div class="meta-api-description">
How do I configure the server endpoint URL for asynchronous file removal with Kendo UI Upload? Configure the server endpoint URL used to asynchronously delete or remove uploaded files through the upload interface, supporting POST requests that send one or multiple file names targeted for deletion or cleanup. This URL acts as the callback handler responsible for processing file removal requests, enabling control over server-side file management, asynchronous cleanup, and dynamic removal of user-uploaded content. Set, specify, or update the async file deletion path to integrate with backend services that accept file identifiers and handle POST operations for removing files after upload.
</div>

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


<div class="meta-api-description">
What is the default HTTP method used for removing uploaded files in Kendo UI Upload? Control or set the HTTP method used when deleting or removing uploaded files, specifying whether the remove request is sent as POST, DELETE, or another HTTP verb to customize server interactions during file removal actions, enabling developers to configure, change, or override the default HTTP method for remove operations in file upload components and manage how the backend processes these HTTP requests for deleting uploads.
</div>

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


<div class="meta-api-description">
How to customize the multipart form field name used in Kendo UI Upload widget? control or customize the multipart form field name used during file uploads, specify or change the default input field name sent to the server, set or override the HTTP form parameter for uploaded files, configure the upload request to use a custom key for file data, adjust the server-side field identifier for handling uploaded content, rename the multipart/form-data field to match backend expectations, map file data to a specific form field name when posting to save URLs, manage how files are labeled in upload requests, specify the parameter name for server-side retrieval, tailor or redefine the form field key associated with uploaded files.
</div>

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


<div class="meta-api-description">
How do I configure the server URL for asynchronous file uploads in Kendo UI Upload widget? Configure or specify the server URL or endpoint to which files are uploaded asynchronously, enabling file transfer through HTTP POST requests to a designated handler that processes form data with fields matching the original file input names, allowing control over remote upload targets, setting or changing the destination path for file submissions, integrating with backend upload services, directing files to the correct server route, and managing asynchronous file upload destinations for web applications.
</div>

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


<div class="meta-api-description">
How to enable ArrayBuffer for reading file contents in Kendo UI upload control? Control how file uploads handle raw byte data by configuring whether files are read and sent as binary buffers instead of standard file data, enabling the use of ArrayBuffer for reading file contents via browser APIs like FileReader, useful for cases requiring low-level access to file bytes in the request payload, including scenarios where precise control over file data format is needed, handling asynchronous uploads with options to enable or disable raw file byte transfer, recognizing that using buffers may increase browser memory consumption and affect large file upload reliability.
</div>

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


<div class="meta-api-description">
How to send cookies with CORS requests in Kendo UI upload control? Control the inclusion of cookies, authentication tokens, or headers during cross-origin file uploads by enabling or disabling credential transmission on asynchronous upload requests. Configure whether to send credentials like session cookies, authorization headers, or other authentication data with CORS requests during file upload to support cookie-based or token-based authentication schemes. Manage cross-site upload security settings to ensure that XMLHttpRequest or fetch API calls include or exclude credentials, affecting scenarios involving user authentication, secure file transfers, or federated identity flows. Adjust the setting to enable credential forwarding for servers requiring authorization headers or cookie information in asynchronous file uploads, or disable it when credentials should not be sent across domains. This control applies primarily when using modern File APIs and asynchronous network requests in upload components.
</div>

#### Example

    <input name="files" id="files" type="file" />
    <script>
        $("#files").kendoUpload({
            async: {
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove",
                withCredentials: false
            }
        });
    </script>

### directory `Boolean` *(default: false)*

Enables the selection of folders instead of files. When the user selects a directory, its entire content hierarchy of files is included in the set of selected items. The `directory` setting is available only in browsers which support [`webkitdirectory`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory).

> When set, the property allows you to select only folders for upload. Files cannot be selected. In browsers which do not support the `directory` feature, the behavior falls back to the default file selection.


<div class="meta-api-description">
How to enable selecting entire folders in Kendo UI Upload widget? Configure folder upload capability to select whole directories along with all nested files and subfolders in a single action, enabling users to choose only folders instead of individual files for batch uploading. Control directory selection behavior in file upload interfaces to include entire folder contents recursively, supporting hierarchical file structures while disabling single file selection when this mode is active. Enable enabling multi-file directory picking where supported by browsers with native directory input features, with automatic fallback to standard file-only selection in environments lacking folder upload support, optimizing bulk file import workflows and recursive content batch processing.
</div>

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


<div class="meta-api-description">
How to enable folder drag-and-drop upload functionality in Kendo UI Upload widget? Allow dropping entire folders including all nested subfolders and files into the upload area by enabling directory or folder drag-and-drop functionality that captures full folder hierarchies during file selection, supports recursive retrieval of folder contents within supported browsers using DataTransferItem or webkitGetAsEntry APIs, restricts drops to directories only when activated, and gracefully falls back to standard file drop behavior if folder drag-and-drop is unsupported, facilitating drag-and-drop upload workflows that handle complex directory structures, folder batch uploads, and recursive folder import scenarios.
</div>

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


<div class="meta-api-description">
How do I configure drag-and-drop file uploading in Kendo UI Upload widget? Configure drag-and-drop file uploading by defining a specific area on the page where users can drag files to initiate uploads, enabling user interaction with file input through setting target drop zones via CSS selectors, DOM elements, or jQuery references, controlling and customizing file drop handling regions to facilitate seamless upload experiences, specifying or assigning drop targets for files dragged directly onto designated page sections to trigger upload processes, and integrating intuitive drag-and-drop interfaces to streamline file selection and submission workflows within web applications.
</div>

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


<div class="meta-api-description">
How do I enable file upload functionality in Kendo UI? Control the activation state of file upload functionality by enabling or disabling user interaction with file selection and the start upload process, toggle upload capability at initialization or dynamically re-enable uploads through method calls, configure, set, or control upload access permissions, activate or deactivate file input features, manage whether users can select files and initiate uploading operations, switch upload availability on or off to suit application logic or user permissions, and handle enabling or disabling of the upload interface seamlessly.
</div>

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


<div class="meta-api-description">
How can I prefill my Kendo UI upload component with a list of files? Preload or prefill a file upload list with multiple files displayed as already uploaded by supplying an array of file objects including attributes like filename, file size, and file extension, ideal for asynchronous upload interfaces where you want to show previously uploaded or pre-existing files visibly in the upload component’s file list, enabling users to see, manage, or interact with these files without re-uploading; useful for initializing upload fields with default files, resuming uploads, displaying server-side stored files, or configuring file inputs to reflect prior uploads with metadata such as file names and formats.
</div>

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


<div class="meta-api-description">
How to set default file extensions for upload in Kendo UI? Specify, read, or configure the file type extension of an initial upload file such as jpg, png, or other formats, enabling control over allowed or default file suffixes in upload components, handling file extension strings with or without leading dots, setting or retrieving extensions during initialization, and managing file format validation, filtering, or default selections based on extension to customize upload input behavior and acceptance criteria.
</div>

#### Example

    <input name="files" id="files" type="file" />
    <script>
        var files = [
            { name: "Document.pdf", extension: ".pdf", size: 98366 },
            { name: "Image.jpg", extension: ".jpg", size: 10300 }
        ];

        $("#files").kendoUpload({
            async: {
                saveUrl: "Home/Save",
                removeUrl: "Home/Remove",
                autoUpload: true
            },
            files: files
        });
    </script>

### files.name `String`

The name of the initial file.


<div class="meta-api-description">
How to set default file names for preloaded files in Kendo UI upload component? Configure or specify the display name for preloaded or default files in file uploaders, set or customize the filename shown in the upload list during initialization, control the initial file name metadata when populating upload components with existing or preset files, define default or starting file names for upload interfaces, enable naming for pre-attached files, and manage how file names appear when auto-loading files into upload fields.
</div>

#### Example

    <input name="files" id="files" type="file" />
    <script>
        var files = [
            { name: "Report.docx", extension: ".docx", size: 45128 },
            { name: "Presentation.pptx", extension: ".pptx", size: 78521 }
        ];

        $("#files").kendoUpload({
            async: {
                saveUrl: "Home/Save",
                removeUrl: "Home/Remove",
                autoUpload: true
            },
            files: files
        });
    </script>

### files.size `Number`

The size of the initial file.


<div class="meta-api-description">
How to get the size of an uploaded file in Kendo UI Upload? Access or check the numeric size of an uploaded file, retrieve file size information to enforce upload limits, validate maximum or minimum file sizes, display file metadata such as bytes or kilobytes, control allowed file size for uploads, determine the size of the first file in an upload batch, set constraints based on file size, perform size-based validation for file uploads, or extract file size details from the initial uploaded file object.
</div>

#### Example

    <input name="files" id="files" type="file" />
    <script>
        var files = [
            { name: "Manual.pdf", extension: ".pdf", size: 1024000 },
            { name: "Photo.png", extension: ".png", size: 256000 }
        ];

        $("#files").kendoUpload({
            async: {
                saveUrl: "Home/Save",
                removeUrl: "Home/Remove",
                autoUpload: true
            },
            files: files
        });
    </script>

### localization `Object`

Sets the strings rendered by the Upload.


<div class="meta-api-description">
How do I customize the language for the Kendo UI Upload button? Customize and configure upload interface language, adjusting UI text, labels, messages, button captions, and translations for multiple languages or locales, enabling control over the wording displayed during file upload processes, supporting localization, internationalization, language settings, multilingual text, custom prompts, and tailored user interface terminology for upload components.
</div>

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


<div class="meta-api-description">
How do I change the cancel button label in Kendo UI upload widget? Customize, translate, or set the text label for the cancel or abort action in file upload interfaces, enabling control over the wording of the cancel button in different languages or regions, supporting localization and internationalization needs for upload dialogs or components where users may want to stop, exit, or cancel uploading files or processes.
</div>

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


<div class="meta-api-description">
How do I change the "Clear" button text in a Kendo UI Upload widget? Set or customize the label, text, or caption for the button that clears or resets selected files in an upload interface, enabling control over the wording shown on the clear or remove files action, adjusting UI text for file upload reset buttons, configuring the message displayed when users want to clear or deselect uploaded files, specifying the prompt or button text to discard or clear selected file inputs, and tailoring the interface text that represents clearing chosen files during file upload processes.
</div>

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


<div class="meta-api-description">
How to change the drop files here message in Kendo UI Upload widget? Customize the drag-and-drop upload area message, set or change the hint text prompting users to drop files, configure the localized text displayed in the file upload drop zone, control the user-facing instruction shown when dragging files over the upload area, adjust or translate the prompt for file drag-and-drop, enable personalized or regional messages guiding users to drop files, update the placeholder or tooltip text for the upload drag zone, modify the interactive upload area hint to improve user clarity and localization, set descriptive or instructive text for file drag upload regions, define the message that encourages or instructs users to drag files into the upload target.
</div>

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


<div class="meta-api-description">
How to change the paused upload status message in Kendo UI Upload widget? Customize, configure, or set the text displayed when file uploads are paused, adjusting the upload pause status message, modifying or localizing the paused upload header notification, controlling the wording or label shown during paused upload processes, and enabling developers to change the pause status indication in upload interfaces to fit different languages, user prompts, or application contexts.
</div>

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


<div class="meta-api-description">
How to localize the "Uploaded" status in Kendo UI Upload widget? Control and customize the text shown in the header status for files that have finished uploading, enabling localization and translation of upload completion messages, status indicators, or confirmation notifications for uploaded files, to support multiple languages and regional formats within file upload interfaces.
</div>

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


<div class="meta-api-description">
How to customize the status message in Kendo UI Upload when files are being uploaded? Configure and customize the status message text or header displayed during file uploads in the upload interface, enabling localized or translated upload progress notifications, real-time upload state indicators, and dynamic feedback headers shown while files are sending or transferring, including setting custom phrases for upload in progress, data transfer status, ongoing file transmission messages, and localized progress labels that inform users about active uploads within file upload components or widgets.
</div>

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


<div class="meta-api-description">
How to customize the success message after uploading a file with Kendo UI Upload? Configure or customize the confirmation message displayed after a file uploads successfully, including setting localized or translated success notifications, adjusting upload completion alerts, and controlling user feedback text upon successful file submission or transfer within upload interfaces.
</div>

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


<div class="meta-api-description">
How to customize the error message shown when a file upload fails in Kendo UI Upload widget? Configure or customize the error message, validation prompt, or failure notification displayed when a file upload does not succeed, control the text shown upon upload failure, set or modify the failed upload alert, handle upload error messaging, define the notification or feedback text for unsuccessful file transfers, change the message users see if uploading files fails, and adjust the failure response label in file input or upload interfaces.
</div>

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


<div class="meta-api-description">
How to customize the error message for invalid file extensions in Kendo UI Upload component? Customize or configure error messages, validation alerts, or feedback prompts shown when file uploads fail due to unsupported, disallowed, or incorrect file extensions; enable localization, translation, or adjustment of these invalid file type notifications to match user language preferences or specific wording requirements for upload components handling file validation errors related to extensions not permitted in upload controls.
</div>

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


<div class="meta-api-description">
How to customize the error message when multiple files fail upload in Kendo UI Upload control? Customize or configure the error message displayed when uploading files in batch mode and multiple files fail validation, including setting text for validation failures involving two or more invalid files, controlling feedback for batch upload errors, defining messages for failed multiple file uploads, adjusting notifications when several files do not meet upload criteria, and tailoring user prompts or alerts related to batch upload validation issues across various file upload scenarios.
</div>

#### Example

    <input type="file" name="files" id="photos" />
    <script>
        $("#photos").kendoUpload({
            async: {
                saveUrl: "http://my-app.localhost/save",
                removeUrl: "http://my-app.localhost/remove",
                batch:true
            },
            localization: {
                invalidFiles: "customInvalidFiles"
            }
        });
    </script>

### localization.invalidMaxFileSize `String`

Sets the text of the validation message for an invalid maximum file size.


<div class="meta-api-description">
How to customize error message when file size exceeds max limit in Kendo UI Upload widget? Set custom error messages or validation text for file uploads when the selected file size exceeds the allowed maximum limit, configure validation feedback for oversized files during upload, control notifications or alerts triggered by large file uploads, customize the warning or error content displayed when users try to upload files beyond the maximum size restriction, define responses and validation prompts related to file size limits in upload components, handle file size validation errors and user-facing text for files that are too big, manage messages for upload limits to improve user guidance when files exceed the specified maximum size, tailor upload validation responses to indicate when files surpass the maximum allowed size threshold, enable custom user feedback for invalid file sizes during uploading processes.
</div>

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


<div class="meta-api-description">
How to customize error message for files smaller than minimum size in Kendo UI upload control? Control or customize the error message displayed when uploaded files are smaller than the allowed minimum size, configure validation feedback for file size thresholds, set or enable notifications for files that do not meet minimum size requirements, adjust or override prompts related to minimum file size violations during upload, handle upload error texts for too-small files, specify alerts for insufficient file size in file upload components, manage validation messages targeting invalid small files, tailor warnings or validation responses when file sizes fall below defined limits, and support localization or customization of minimum file size error messages in upload interfaces.
</div>

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


<div class="meta-api-description">
How do I change the remove button label in Kendo UI Upload widget? Control and configure the label text shown on the file upload remove button, customize the wording or phrase that appears when users want to delete or cancel an uploaded item, change the button caption for removing files, set or localize the text string for the remove action in file upload interfaces, adapt the remove button label to different languages or custom terminology, define the wording displayed on the UI element that triggers file removal or deletion during uploads, modify or override the default remove button text for better user clarity or localization, provide a tailored label for the action that discards or cancels selected uploads in forms or components.
</div>

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


<div class="meta-api-description">
How do I change the retry button text in Kendo UI Upload? Customize the retry button text for upload operations by setting or translating the label shown when upload attempts fail, enabling localization, internationalization, text override, or configuring the retry prompt for users to reattempt file uploads, failed upload notifications, and retry action display in different languages or custom wording.
</div>

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


<div class="meta-api-description">
How do I change the button text in Kendo UI upload widget? Adjust, change, or localize the label text displayed on the button that initiates file selection within the upload interface, enabling developers to set custom button captions, translate or rename the prompt text, modify the displayed call-to-action, or control the wording for different languages and user regions to create a tailored file picker experience with configurable button text.
</div>

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


<div class="meta-api-description">
How to customize the error message when an upload fails in Kendo UI Upload component? Configure or customize the error message displayed when an upload operation fails, enabling control over the localized text or notification shown to users upon unsuccessful file uploads, including setting custom failure alerts, error prompts, or user feedback for failed upload events within upload components.
</div>

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


<div class="meta-api-description">
How do I customize the success message in Kendo UI Upload? Set or customize the success message, confirmation text, or status notification shown after a file upload completes successfully in an upload interface, enabling developers to control the displayed feedback, modify post-upload messages, configure localized success alerts, and tailor user-facing upload confirmation outputs for better user experience and clarity following file submission.
</div>

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


<div class="meta-api-description">
How do I customize the uploading status message in Kendo UI for jQuery upload widget? Configure the message or text displayed during file upload progress to show custom or localized status updates, control the upload indicator wording, set dynamic feedback for ongoing file transfers, enable personalized upload progress notifications, customize the uploading prompt in different languages, adjust the real-time upload status message displayed to users while files are being sent, manage how upload activity is communicated through interface text, and define the terminology or phrasing that signals files are currently being uploaded.
</div>

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


<div class="meta-api-description">
How do I customize the text for the file upload button in Kendo UI Upload widget? Configure or customize the text, label, or wording for the file upload button, upload action, or upload files prompt in a user interface, enabling developers to set or override localization, translations, or language settings for the upload button’s display name, caption, or message when users select files to upload, supporting internationalization, multi-language UI customization, and adaptable prompts for file selection and submission.
</div>

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


<div class="meta-api-description">
How to enable uploading multiple files at once with Kendo UI for jQuery? Control whether users can select and upload multiple files simultaneously or restrict to a single file when interacting with file upload inputs, enabling batch selection or single file selection modes, configuring uploads to allow choosing many files at once or just one, managing whether multiple file selection is activated or disabled during the file picking process, supporting mixed scenarios like selecting multiple items for upload or limiting to individual files, handling both synchronous and asynchronous file input workflows with options to enable bulk file input selection or single-item upload restriction.
</div>

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


<div class="meta-api-description">
How do I hide the file list in Kendo UI Upload component? Configure visibility of the upload component’s file list to either display or hide the built-in list of uploaded files, enabling control over showing file names, upload progress, and status indicators; opt to show the file list for automatic file management UI or disable it to craft custom upload interfaces with personalized file displays, progress bars, and action buttons while leveraging underlying upload functionality and client-side event hooks for tailored file item rendering and interaction handling.
</div>

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


<div class="meta-api-description">
How to customize file list rendering in Kendo UI Upload widget using templates? Customize file list rendering with control over layout, file names, sizes, action buttons, progress indicators, and batch upload details by defining templates to set how each file or set of files appears within upload components. Enable configuring per-file or collective display including combined names and total sizes, providing detailed file metadata like names, sizes, and extensions, while supporting interactive elements such as customizable action buttons and progress bars. Use templates to arrange and style uploaded file information, control item formatting, display upload progress, and implement batch handling for multiple files with flexible, developer-defined markup and dynamic data arrays representing single or grouped file properties.
</div>

#### Example - specifying the template as a string literal

    <input type="file" name="files" id="upload" />
    <script>
        $("#upload").kendoUpload({
        template: ({ name, size, files }) => `<div><p>Name: ${name}</p>` +
                  `<p>Size: ${size} bytes</p><p>Extension: ${files[0].extension}</p>` +
                  "<strong class='k-upload-status'>" +
                  "<button type='button' class='k-upload-action'></button>" +
                  "<button type='button' class='k-upload-action'></button>" +
                  "</strong>" +
                  "</div>"
        });
    </script>

### validation `Object`

Configures the validation options for uploaded files.


<div class="meta-api-description">
How do I restrict file types that can be uploaded to a Kendo UI Upload control? Control file upload restrictions by configuring accepted file formats, permitted MIME types, maximum file sizes, file quantity limits, and client-side validation rules that prevent users from submitting invalid or unsupported files, ensuring uploads meet specific criteria, trigger error or validation messages, and maintain consistent, secure, and predictable file handling behavior.
</div>

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


<div class="meta-api-description">
How to restrict file uploads by specific extension names in Kendo UI for jQuery Upload widget? Control and limit file uploads by specifying accepted file types through extension names or patterns, enabling validation that restricts users from selecting or submitting files with disallowed formats such as images, documents, or custom file types. Configure permitted file extensions with or without leading dots, enforce client-side checks to block unsupported file formats, set filters to only allow files like .jpg, .png, .pdf, or other specified types, and manage upload behavior by validating file suffixes to ensure only approved extensions are accepted during file selection or drag-and-drop interactions.
</div>

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


<div class="meta-api-description">
How can I set the maximum file size limit for uploads in Kendo UI Upload widget? Control and enforce maximum allowed file size for uploads by setting size limits per individual file to restrict oversized file submissions, configure upload size thresholds in bytes to block files exceeding defined limits, enable file size validation to automatically reject files larger than specified byte values, set upper file size boundaries to prevent large uploads, and manage upload constraints to ensure files do not surpass desired byte-size restrictions for validation and rejection.
</div>

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


<div class="meta-api-description">
How to set minimum allowed file size for uploads in Kendo UI Upload widget? Set or configure the minimum allowed file size for uploads to ensure that files below a specific byte threshold are rejected during client-side validation, enabling control over the smallest acceptable file size for file inputs and preventing users from submitting files that are too small; this setting helps enforce size constraints, customize file validation limits, and reject insufficiently sized files in upload interfaces.
</div>

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


<div class="meta-api-description">
How do I programmatically clear all uploaded files in Kendo UI upload widget? Clear or reset the list of uploaded files instantly without sending any server requests or deleting files remotely, enabling developers to visually remove all selected or queued files from the upload interface, cancel the file list display, reset or clear user file selections on the client side only, manage the UI state by erasing all files shown without triggering back-end processes or callbacks, and control or update the file input preview area without affecting server storage or invoking removal handlers.
</div>

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


<div class="meta-api-description">
How can I programmatically remove specific files from the Kendo UI Upload widget? Remove or clear specific files from the upload interface by providing a function or condition that selects which files to delete from the user interface, enabling you to programmatically filter, discard, or reset uploaded files without triggering server-side deletions or affecting backend storage, useful for controlling visible uploads, managing file lists dynamically, and preventing server calls during file removal from the client view.
</div>

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


<div class="meta-api-description">
How do I remove a specific file from the Kendo UI upload list without triggering server requests? Remove or delete a specific file from the upload list by its unique identifier without triggering server requests, clearing the file entry visually in the interface without affecting backend data, disabling automatic removal callbacks or network calls while updating the displayed files, controlling client-side file deletion by uid to refresh or manage the upload queue instantly without server interaction or invoking delete handlers, enabling local UI updates that remove files from the upload view without communicating with the server or firing event handlers related to file removal.
</div>

#### Example

    <input name="files" id="files" type="file" />
    <button id="clearSelected" class="k-button">Clear all checked</button>

    <script>
      $(document).ready(function() {
        $("#files").kendoUpload({
          template: ({ files, name }) => "<span class='k-progress'></span>" +
          `<input id='${files[0].uid}' type='checkbox' class='k-checkbox k-checkbox-md' />` +
          `<label for='${files[0].uid}' class='k-checkbox-label'>Filename: ${name}</label>`
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


<div class="meta-api-description">
How do I properly remove Kendo UI Upload widget from the DOM? Clean up and dispose of upload widgets by detaching event listeners, removing associated data attributes, and releasing memory to prevent leaks and performance issues; safely teardown nested or child UI components within uploads to release resources and reset state without deleting the upload element from the page, enabling controlled component destruction, resource management, and preparation for dynamic UI updates or removals while ensuring no lingering handlers or widget artifacts remain in the DOM.
</div>

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


<div class="meta-api-description">
How can I prevent users from uploading files in Kendo UI Upload widget temporarily during a long-running process? Control the ability to block or restrict file selection, drag-and-drop, and upload interactions dynamically by disabling user inputs during asynchronous processes, background tasks, or validation steps to prevent file sending and selection until re-enabled, effectively managing upload availability and user interaction states in real-time with methods to toggle active or inactive upload controls.
</div>

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


<div class="meta-api-description">
How do I re-enable file uploads in Kendo UI for jQuery after disabling them? Activate or restore the ability to select files, drag and drop uploads, and interact with upload buttons by enabling the upload control after it has been turned off or disabled. Reinstating upload functionality resumes user interactions, event handling, and programmatic access for file selection and uploading, effectively reversing any prior disabling or deactivation of the uploader's interface and features. This setting or method can be applied to toggle or control when users can initiate file uploads, ensuring UI responsiveness and upload readiness after being disabled or paused.
</div>

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


<div class="meta-api-description">
How to programmatically focus Kendo UI Upload input element for keyboard navigation? Control programmatic keyboard focus on the file input element to enable keyboard navigation, set or move focus for accessibility purposes, activate the file picker dialog, and support scripted user interface interactions that require bringing focus to the upload input field; configure focus behavior dynamically after component setup to ensure the input element receives user input readiness, keyboard events, or accessibility tooling triggers, allowing developers to manage active element setting, trigger native browser focus handling, and integrate seamless file selection workflows in various UI and automation scenarios.
</div>

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


<div class="meta-api-description">
How can I access the list of files selected in a Kendo UI for jQuery Upload widget? Retrieve the list of files currently chosen in the upload interface, enabling inspection of file details such as names, sizes, types, and associated metadata prior to starting the upload process. Access the current selection as an array of file objects to manage, validate, filter, or preview files before sending them to the server, supporting use cases like checking file information, handling multiple uploads, confirming user selections, or integrating with file processing workflows. This method helps developers access and control the files ready for upload through queries, get file attributes, or update UI based on selected content.
</div>

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log(files);
        })
      });
    </script>

#### Returns

Represents an `Array` collection of all currently selected files.

### pause

Pauses the upload of a file that is uploaded in chunks.


<div class="meta-api-description">
How to pause a file upload in progress with Kendo UI for jQuery? Stop, suspend, or temporarily halt a chunked file upload to control or pause ongoing file transfers without losing uploaded data or restarting from scratch; this method is useful for managing bandwidth, handling connectivity issues, responding to user-initiated pauses, or buffering uploads during network congestion, allowing the upload process to be safely paused and later resumed from the current chunk rather than restarting the entire file transfer.
</div>

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


<div class="meta-api-description">
How to resume a paused file upload in Kendo UI Upload widget? Control resuming chunked file uploads by restarting a paused upload session to continue sending remaining data chunks after interruptions, allowing recovery from user-initiated pauses or network issues, enabling upload continuation from the last transferred chunk, handling partial uploads, managing paused file transfers efficiently, resuming large file uploads in chunks, and configuring upload retries without restarting from the beginning.
</div>

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


<div class="meta-api-description">
How do I programmatically clear all files in a Kendo UI Upload component? Clear or delete every file in the upload queue, remove all uploaded or pending files programmatically, reset uploads by sending removal requests to the server side, batch delete all items from file upload lists, control and manage complete file removals in upload components without triggering events, automate clearing all selected or uploaded files, command server handlers to delete all uploaded content at once, erase entire upload session data through code, perform full cleanup of upload lists and files, and handle mass file removal operations quickly and efficiently.
</div>

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

> In a chunk upload scenario the method will not work for files that are not fully uploaded and saved. To remove a file that has been canceled call the `remove` handler manually.


<div class="meta-api-description">
How can I programmatically remove files from a Kendo UI upload control while bypassing automatic removal events? Control and manage file removal by programmatically deleting files from the upload interface using custom callback logic that identifies which files to remove based on specific conditions; this method triggers server-side remove requests for files matching the criteria while bypassing automatic removal events, supporting standard and chunked upload workflows with manual intervention needed for incomplete or canceled uploads.
</div>

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


<div class="meta-api-description">
How to programmatically delete an uploaded file by its unique identifier in Kendo UI upload component? Delete or remove a specific uploaded file by its unique identifier (UID) within an upload interface or component, allowing programmatic file deletion without triggering standard remove events or listeners; this method enables controlling file removal remotely through configured server requests, targeting files by their UID for precise deletion, and managing uploaded content by directly specifying the file ID to delete files from upload lists without manual user interaction or event-based callbacks.
</div>

#### Example

    <input name="files" id="files" type="file" />
    <button id="removeSelected" class="k-button">Remove all checked</button>

    <script>
      $(document).ready(function() {
        $("#files").kendoUpload({
          template: ({ files, name }) => "<span class='k-progress'></span>" +
          `<input id='${files[0].uid}' type='checkbox' class='k-checkbox k-checkbox-md' />` +
          `<label for='${files[0].uid}' class='k-checkbox-label'>Filename: ${name}</label>`,
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


<div class="meta-api-description">
How can I dynamically enable or disable file upload functionality in Kendo UI for jQuery? Activate or deactivate user interaction for file upload controls by switching the enabled state dynamically, controlling features like browse buttons, drag-and-drop zones, and upload triggers without reloading or reinitializing the component; manage toggling the upload interface’s active or inactive status programmatically at runtime to enable or disable upload functionality, user inputs, or file selection options with a single action that flips the current enabled or disabled mode.
</div>

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


<div class="meta-api-description">
How do I manually initiate file uploads using the Upload widget's upload method? Trigger or initiate file uploads programmatically by calling the manual upload function to send selected files or queued uploads to the server on demand, enabling control over when files are transmitted rather than automatic uploading. This method allows developers to start the upload process manually, regardless of whether the upload component is disabled or user interaction is restricted, bypassing automatic or auto-triggered uploads when configured for asynchronous manual handling. Manage, start, enable, or invoke file transmission manually in scenarios requiring explicit upload commands, control upload timing precisely, and override disabled states to ensure files are uploaded as needed through programmatic calls.
</div>

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

> To remove the data of a file that has been canceled, manually call the `remove` handler. For more information refer to the limitation of the [`removeFile` method](/api/javascript/ui/upload/methods/removefile)


<div class="meta-api-description">
How to handle cancel event in Kendo UI for jQuery upload control? Capture and respond to user or system interruptions during file uploads by detecting when an ongoing upload is cancelled, allowing you to abort the upload process, halt or reset progress indicators, disable or hide retry or resume options, clean up temporary or partial file data, update UI states to reflect cancellation, log cancellation events for analytics or error tracking, and manage asynchronous upload workflows where cancellation events trigger specific handlers to prevent further processing or allow manual removal of cancelled files. This functionality is essential for controlling upload interruptions, user-triggered stops, managing cleanup after cancelled transfers, and ensuring consistent UI and backend state synchronization during asynchronous file upload operations.
</div>

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


<div class="meta-api-description">
How do I detect when users remove selected files in a Kendo UI file uploader? Detect when users remove or reset selected files in a file uploader, respond to file clearing actions, trigger events when selections are canceled or cleared, manage or intercept file selection resets, control file input clearing behavior, handle user interactions that clear uploaded files, enable UI updates or cleanup after clearing file selections, prevent automatic removal of chosen files by blocking clear actions, and configure reactions to file deselection or reset commands within upload components.
</div>

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


<div class="meta-api-description">
What event is triggered when all files in an upload queue finish processing with Kendo UI Upload widget? Detect when all files in the current upload queue finish processing, whether successfully uploaded or failed, to enable handling of completion status, updating user interfaces, triggering callbacks after all active uploads end, managing asynchronous upload workflows, reviewing server responses, and showing overall success or error summaries once every file completes uploading in asynchronous mode.
</div>

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


<div class="meta-api-description">
What triggers the error event in Kendo UI for jQuery upload widget? Capture and respond to failed file upload or removal operations in asynchronous file transfer processes by detecting error conditions during file submission or deletion; enable handling of upload errors through event-driven notifications that provide detailed information about the failure including involved files, operation type, and server responses, facilitating custom error messaging, retry mechanisms, rollback actions, diagnostic logging, and analysis to troubleshoot or recover from transfer failures within asynchronous upload workflows.
</div>

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


<div class="meta-api-description">
How to detect pause in Kendo UI for jQuery Upload? Detect interruptions or user-initiated pauses during multipart or chunked file uploads, capturing when upload operations are temporarily halted, paused, or stopped by user action such as clicking a pause control; this enables updating progress indicators, controlling or canceling ongoing upload tasks, managing client-side upload state, triggering UI changes like showing resume or cancel options, and handling chunked upload workflows where files are transmitted in segments rather than in a single request.
</div>

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


<div class="meta-api-description">
How can I track file upload progress in real-time with Kendo UI for jQuery? Track and monitor file upload progress in real-time with events that provide detailed incremental updates on bytes transferred, enabling dynamic progress bars, percentage displays, or logging upload status during asynchronous uploads. Receive granular progress feedback while files are uploading, supporting UI updates, progress tracking, or analytics on upload speed and completion percentage. Handle streaming upload data to control or visualize ongoing file transfers, optimize user experience with live feedback on data sent, and implement progress indicators that react to changes in upload status for modern browsers excluding Internet Explorer.
</div>

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

	/* The result can be observed in the DevTools(F12) console of the browser. */
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


<div class="meta-api-description">
How to handle resumption events for paused multipart uploads in Kendo UI upload widget? Detect and respond when a paused multipart or chunked file upload is restarted by the user, enabling developers to manage resuming uploads, continue uploading remaining data segments, update progress bars or UI status, handle resumption triggers from user interaction like clicking a resume control, synchronize state changes, and coordinate subsequent network requests after upload continuation. This covers monitoring upload progress resumption, controlling paused file transfers, handling chunked or partial uploads, enabling resumption events for interrupted uploads, and integrating custom logic for user-initiated upload restarts in web applications.
</div>

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


<div class="meta-api-description">
How can I prevent file removal during upload in Kendo UI for jQuery? Manage and intercept file deletion processes during upload operations by capturing pre-removal events that enable controlling or blocking file removals, validating files before deletion, prompting user confirmations for file discard actions, triggering backend deletion workflows, aborting or canceling removal based on custom logic, handling file removal callbacks, or integrating checks within upload components to prevent unwanted file removals before completion.
</div>

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


<div class="meta-api-description">
How to listen for file selection in Kendo UI Upload widget? Detect, capture, or listen for file selection actions during uploads, handle user file picks, respond to file input changes, enable validation or modification of chosen files before upload, intercept or cancel file selection events to control which files are accepted or rejected, trigger custom logic when files are selected or changed, manage file input interaction, and control user file selection behavior in upload components.
</div>

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log("Name: " + value.name);
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log("Size: " + value.size + " bytes");
	/* The result can be observed in the DevTools(F12) console of the browser. */
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


<div class="meta-api-description">
How to detect when an asynchronous file upload finishes successfully in Kendo UI for jQuery? Detect when an asynchronous file upload or removal finishes successfully by capturing completion events that signal the end of upload or delete operations, enabling you to handle server responses, update UI components, manage post-upload workflows, track file success or failure states, intercept and cancel completion to mark files as unsuccessful, monitor progress in non-blocking operations, trigger follow-up actions upon finished transfers, listen for status changes during async file handling, and implement reactive user interface updates tied to file operation outcomes.
</div>

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


<div class="meta-api-description">
How do I cancel a file upload in Kendo UI for jQuery? Detect and control file upload initiation by handling the event triggered before actual upload processing starts in asynchronous mode, enabling interception, modification, or cancellation of file uploads, configuring upload parameters such as destination URLs dynamically, and implementing custom pre-upload logic to manage or abort uploads based on conditions or validation requirements.
</div>

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
