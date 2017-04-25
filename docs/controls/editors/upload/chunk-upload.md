---
title: Chunk Upload
page_title: Chunk Upload | Kendo UI Upload
description: "Upload files in chunks in asynchronous mode in the Kendo UI Upload widget."
slug: chunkupload_upload_widget
position: 3
---

# Chunk Upload

Uploading files in chunks enables the user to send large file to the server uploaded asyncronously with multiple requests. Plus, to pause and resume file uploading for the time the application is live in the browser.

The chunk upload funcionality is available as of **2017 R2**.

## Benefits

* Uploading large files;
* Controlling various configuration options to fine-tune the way chunk uploading operates;
* Pausing and resuming the file uploading.

## Basics

In order to enable chunk uploading you need to setup the [async.chunkSize option](/api/javascript/ui/upload#configuration-async.chunkSize) of the Upload widget.

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

> Important
>
> Chunk upload is available only with the [asynchronous mode]({%slug modes_upload_widget%}#asynchronous-mode) of **Kendo Upload**.

Next, implement the server-side logic (the serverUrl action assigned) that processes the file chunks and merges them into file. You can refer to the [Server-side Implementation section](#server-side-implementation) for more details on that.

You can also change or fine-tune the chunk uploading funciontlity by using these configration options:

* [async.concurrent](/api/javascript/ui/upload#configuration-async.concurrent)—controls whether the selected files will be uploaded simultaneously or one after another;
* [async.autoRetryAfter](/api/javascript/ui/upload#configuration-async.autoRetryAfter)—the time interval (in miliseconds) after which the Kendo Upload will try to retry a failed upload;
* [async.maxAutoRetries](/api/javascript/ui/upload#configuration-async.maxAutoRetries)—the amount of attempts the Kendo Upload will make to retry a failed upload. After that will report an upload fail.

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

## Transfering Chunks

With the chunk upload functionality the selected files are separeted into chunks/blobs of data. These chunks are automatically sent to the server (via AJAX request) to the destination set up in the `saveUrl` option. The chunks are sent in a specific order, hence, the server should send back a response with the meta data of the chunk uploaded so that **Kendo Upload** can proceed either with the next chunk (`"uploaded": false`) or the next file (`"uploaded": true`).

The response should have the following meta data included:

    {
        "uploaded": true | false,
        /*  False will instruct Kendo Upload to send the next chunk of data.
            True will indicate that the last chunk is processed and upload was successful
            and eventually continue with the next file. */

        "fileUid": Number
        /* The guid of the chunk uploaded, so that Kendo Upload get the next chunk to sent. */
    }

And this is an example of a valid server response:

    {"uploaded":true,"fileUid":"b95ee9fa-85e8-482c-946d-a12ed6dbefed"}


## Server-side Implementation

The server-side implementation entirely depends on application requirments and logic. You can examine some examples of server-side logic that handles chunks in our demos:

* [Client-side solution with ASP.NET MVC service](http://demos.telerik.com/kendo-ui/upload/chunkupload)
* [ASP.NET MVC](http://demos.telerik.com/aspnet-mvc/upload/chunkupload)
* [ASP.NET Core](http://demos.telerik.com/aspnet-core/upload/chunkupload)
* [PHP](http://demos.telerik.com/php-ui/upload/chunkupload)
* [Java/JSP](http://demos.telerik.com/jsp-ui/upload/chunkupload)

> Note
>
> **Kendo Upload** as a client-side solution does not handle any sort of validation. File validation and any security requirments should be handled on the server by using application logic.

## See Also

Other articles on the Kendo UI Upload:

* [Overview of the Upload Widget]({% slug overview_kendoui_upload_widget %})
* [Drag and Drop]({% slug dragandrop_upload_widget %})
* [Send and Receive Metadata]({% slug metadata_upload_widget %})
* [Modes of Operation]({% slug modes_upload_widget %})
* [Validation]({% slug validation_upload_widget %})
* [Browser Support]({% slug browsersupport_upload_widget %})
* [Troubleshooting]({% slug troubleshooting_upload_widget %})