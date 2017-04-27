---
title: Chunk Upload
page_title: Chunk Upload | Kendo UI Upload
description: "Upload files in chunks in asynchronous mode by using the Kendo UI Upload widget."
slug: chunkupload_upload_widget
position: 3
---

# Chunk Upload

The chunk upload of files enables the user to send large files, which are uploaded asynchronously with multiple requests, to the server and to pause and resume the file upload for the time the application is open in the browser.

> **Important**
> * The chunk upload functionality is available as of the Kendo UI 2017 R2 release.
> * The chunk upload functionality is available only in the [asynchronous mode]({%slug modes_upload_widget%}#asynchronous-mode) of the Upload.

## Getting Started

To enable the chunk upload:

1. Set up the [`async.chunkSize`](/api/javascript/ui/upload#configuration-async.chunkSize) option of the Upload.

    ###### Example

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

## Fine-Tuning

To modify or fine-tune the chunk upload, use any of the following configuration options:

* [`async.concurrent`](/api/javascript/ui/upload#configuration-async.concurrent)&mdash;Controls whether the selected files are uploaded simultaneously or one after the other.
* [`async.autoRetryAfter`](/api/javascript/ui/upload#configuration-async.autoRetryAfter)&mdash;The time interval in milliseconds after which the Upload attempts to retry a failed upload.
* [`async.maxAutoRetries`](/api/javascript/ui/upload#configuration-async.maxAutoRetries)&mdash;The number of attempts the Upload makes to retry a failed upload before reporting it.

###### Example

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

## Transfer of Chunks

The chunk upload functionality separates the selected files chunks or blobs of data. These chunks are automatically sent to the server to the destination that is set up in the `saveUrl` option over an AJAX request. Because the chunks are sent in a specific order, the server is expected to send back a response with the meta data of the chunk that is uploaded. This response indicates to the Upload that it can proceed either with the next chunk (`"uploaded": false`) or with the next file (`"uploaded": true`).

The response has to include the meta data from the following example.

###### Example

    {
        "uploaded": true | false,
        /*  False instructs the Upload to send the next chunk of data.
            True indicates that the last chunk is processed, the upload was successful
            and the upload of the next file can continue. */

        "fileUid": Number
        /* The UID of the uploaded chunk, so that the Upload can get the next chunk and send it. */
    }

The following example demonstrates a valid server response.

###### Example

    {"uploaded":true,"fileUid":"b95ee9fa-85e8-482c-946d-a12ed6dbefed"}

## Server-Side Implementation

The server-side implementation entirely depends on the application requirements and logic. The following list of Kendo UI demos provides examples of server-side logic that handles chunks:

* [Client-side solution with ASP.NET MVC service](http://demos.telerik.com/kendo-ui/upload/chunkupload)
* [ASP.NET MVC](http://demos.telerik.com/aspnet-mvc/upload/chunkupload)
* [ASP.NET Core](http://demos.telerik.com/aspnet-core/upload/chunkupload)
* [PHP](http://demos.telerik.com/php-ui/upload/chunkupload)
* [Java/JSP](http://demos.telerik.com/jsp-ui/upload/chunkupload)

> **Important**
>
> As a client-side solution, the Upload does not handle validation. File validation and security requirements should be handled on the server by using application logic.

## See Also

Other articles on the Kendo UI Upload:

* [Overview of the Upload Widget]({% slug overview_kendoui_upload_widget %})
* [Drag and Drop]({% slug dragandrop_upload_widget %})
* [Send and Receive Metadata]({% slug metadata_upload_widget %})
* [Modes of Operation]({% slug modes_upload_widget %})
* [Validation]({% slug validation_upload_widget %})
* [Browser Support]({% slug browsersupport_upload_widget %})
* [Troubleshooting]({% slug troubleshooting_upload_widget %})
