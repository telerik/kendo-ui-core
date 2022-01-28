---
title: File Processing
page_title: jQuery Upload Documentation | File Processing
description: "Get started with the jQuery Upload by Kendo UI and learn how to persist the initially selected files, upload batches of files, and do a chunk upload for files selected through multiple requests."
slug: chunkupload_upload_widget
position: 3
---

# File Processing

The Upload provides options for [persisting the initially selected files](#persisting-initially-selected-files), [uploading batches of files](#uploading-batches-of-files), and [uploading files that are selected through multiple requests](#chunk-upload-of-files-from-multiple-requests).

## Persisting Initially Selected Files

You can persist the successfully uploaded files in the list and display them again when the page is reloaded. For the runnable example, refer to the [demo on persisting the initially selected files in the Upload](https://demos.telerik.com/kendo-ui/upload/initialfiles).

## Uploading Batches of Files

Regardless of the mode of operation the Upload is into, it generates a unique identifier (`uid`) for each file. If the Upload is used with its [`batch` option](/api/javascript/ui/upload/configuration/async.batch) enabled, the single `uid` that is generated stands for the batch of files that were simultaneously selected. If the Upload is used with the [`batch` option](/api/javascript/ui/upload/configuration/async.batch) disabled, a `uid` is generated for each separate file.

The generated `uid` is added to the [`cancel`](/api/javascript/ui/upload/events/cancel), [`error`](/api/javascript/ui/upload/events/error), [`progress`](/api/javascript/ui/upload/events/progress), [`remove`](/api/javascript/ui/upload/events/remove), [`select`](/api/javascript/ui/upload/events/select), or [`upload`](/api/javascript/ui/upload/events/upload) events as a property of the `e.files` collection.

## Chunk Upload of Files from Multiple Requests

As of the Kendo UI 2017 R2 release, the Upload enables the user to send large files which are asynchronously uploaded through multiple requests to the server and to pause and resume the file upload as long as the application is open in the browser.

> The chunk upload functionality is available only when the Upload is in its [asynchronous mode of operation]({%slug modes_upload_widget%}#asynchronous-mode).

### Enabling the Chunk Upload

1. Set up the [`async.chunkSize`](/api/javascript/ui/upload/configuration/async.chunksize) option of the Upload.

        ```
        <input name="files" id="files" type="file" />

        <script>
            $(document).ready(function() {
                $("#files").kendoUpload({
                    async: {
                        chunkSize: 11000, // Will separate the file into chunks of size 11000 bytes.
                        saveUrl: "chunkSave",
                        removeUrl: "remove",
                        autoUpload: true
                    }
                });
            });
        </script>
        ```

1. Implement the server-side logic (that is, the `serverUrl` action is assigned) which processes the file chunks and merges them into file. For more information on how to achieve this, refer to the section on the [server-side implementation](#server-side-implementation).

### Modifying the Chunk Upload

To modify (fine-tune) the chunk upload, use any of the following configuration options:

* [`async.concurrent`](/api/javascript/ui/upload/configuration/async.concurrent)&mdash;Controls whether the selected files are uploaded simultaneously or one after the other.
* [`async.autoRetryAfter`](/api/javascript/ui/upload/configuration/async.autoretryafter)&mdash;The time interval in milliseconds after which the Upload attempts to retry a failed upload.
* [`async.maxAutoRetries`](/api/javascript/ui/upload/configuration/async.maxautoretries)&mdash;The number of attempts the Upload makes to retry a failed upload before reporting it.

```
<input name="files" id="files" type="file" />

<script>
    $(document).ready(function() {
        $("#files").kendoUpload({
            async: {
                chunkSize: 11000, // Will separate the file into chunks of size 11000 bytes.
                concurrent: true, // Will upload all files simultaneously.
                autoRetryAfter: 300, // Will attempt a failed chunk upload after 300ms.
                maxAutoRetries: 4, // Will attempt the same failed chunk upload 4 times.
                saveUrl: "chunkSave",
                removeUrl: "remove",
                autoUpload: true
            }
        });
    });
</script>
```

### Transferring the Chunk of Files

The chunk upload separates the selected file chunks or blobs of data. These chunks are automatically sent over an AJAX request to the server to the destination that is set up in the `saveUrl` option. Because the chunks are sent in a specific order, the server is expected to send back a response with the metadata of the chunk that is uploaded. This response indicates to the Upload that it can proceed either with the next chunk (`"uploaded": false`) or with the next file (`"uploaded": true`).

The following example demonstrates the metadata which the response has to include.

    {
        "uploaded": true | false,
        // false instructs the Upload to send the next chunk of data.
        // true indicates that the last chunk is processed, the upload was successful
        // and the upload of the next file can continue.

        "fileUid": Number
        // The UID of the uploaded chunk, so that the Upload can get the next chunk and send it.
    }

The following example demonstrates a valid server response.

    {"uploaded":true,"fileUid":"b95ee9fa-85e8-482c-946d-a12ed6dbefed"}

### Server-Side Implementation of the Chunk Upload

The server-side implementation entirely depends on the requirements and logic of your application.

> As a client-side solution, the Upload does not handle validation. You need to handle the validation of files and the security requirements on the server by using application logic.

The following list of Kendo UI demos provides examples of server-side logic that handles chunks:

* [Client-side solution with ASP.NET MVC service](https://demos.telerik.com/kendo-ui/upload/chunkupload)
* [ASP.NET MVC](https://demos.telerik.com/aspnet-mvc/upload/chunkupload)
* [ASP.NET Core](https://demos.telerik.com/aspnet-core/upload/chunkupload)
* [PHP](https://demos.telerik.com/php-ui/upload/chunkupload)
* [Java/JSP](https://demos.telerik.com/jsp-ui/upload/chunkupload)

## See Also

* [Uploading Chunks of Files with the Upload (Demo)](https://demos.telerik.com/kendo-ui/upload/chunkupload)
* [JavaScript API Reference of the Upload](/api/javascript/ui/upload)
