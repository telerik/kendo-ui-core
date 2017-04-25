---
title: Chunk Upload
page_title: Chunk Upload | Kendo UI Upload
description: "Upload files in chunks in asynchronous mode in the Kendo UI Upload widget."
slug: chunkupload_uploadhelper_aspnetmvc
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

In order to enable chunk uploading you need to setup the `ChunkSize` helper method ([async.chunkSize option](../../../kendo-ui/api/javascript/ui/upload#configuration-async.chunkSize)) of the Upload widget.

###### Example

```razor
@(Html.Kendo().Upload()
    .Name("files")
    .Async(a => a
        .Save("ChunkSave", "Upload")
        .Remove("Remove", "Upload")
        .AutoUpload(true)
        .ChunkSize(1100)  // Will separate the file into chunks of size 1100 bytes.
    )
)
```

```cs
[DataContract]
public class ChunkMetaData
{
    [DataMember(Name = "uploadUid")]
    public string UploadUid { get; set; }
    [DataMember(Name = "fileName")]
    public string FileName { get; set; }
    [DataMember(Name = "contentType")]
    public string ContentType { get; set; }
    [DataMember(Name = "chunkIndex")]
    public long ChunkIndex { get; set; }
    [DataMember(Name = "totalChunks")]
    public long TotalChunks { get; set; }
    [DataMember(Name = "totalFileSize")]
    public long TotalFileSize { get; set; }
}

public class FileResult
{
    public bool uploaded { get; set; }
    public string fileUid { get; set; }
}

public void AppendToFile(string fullPath, Stream content)
{
    try
    {
        using (FileStream stream = new FileStream(fullPath, FileMode.Append, FileAccess.Write, FileShare.ReadWrite))
        {
            using (content)
            {
                content.CopyTo(stream);
            }
        }
    }
    catch (IOException ex)
    {
        throw ex;
    }
}

public ActionResult ChunkSave(IEnumerable<HttpPostedFileBase> files, string metaData)
{
    if (metaData == null)
    {
        return Save(files);
    }

    MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(metaData));
    var serializer = new DataContractJsonSerializer(typeof(ChunkMetaData));
    ChunkMetaData chunkData = serializer.ReadObject(ms) as ChunkMetaData;
    string path = String.Empty;
    // The Name of the Upload component is "files"
    if (files != null)
    {
        foreach (var file in files)
        {
            path = Path.Combine(Server.MapPath("~/App_Data"), chunkData.FileName);

            //AppendToFile(path, file.InputStream);
        }
    }

    FileResult fileBlob = new FileResult();
    fileBlob.uploaded = chunkData.TotalChunks - 1<= chunkData.ChunkIndex;
    fileBlob.fileUid = chunkData.UploadUid;

    return Json(fileBlob);
}
```

> Important
>
> Chunk upload is available only with the [asynchronous mode]({%slug modesoperation_uploadhelper_aspnetmvc%}#asynchronous-mode) of **Kendo Upload**.

You can also change or fine-tune the chunk uploading funciontlity by using these configration options:

* `Concurrent` ([async.concurrent](../../../kendo-ui/api/javascript/ui/upload#configuration-async.concurrent))—controls whether the selected files will be uploaded simultaneously or one after another;
* `AutoRetryAfter` ([async.autoRetryAfter](../../../kendo-ui/api/javascript/ui/upload#configuration-async.autoRetryAfter))—the time interval (in miliseconds) after which the Kendo Upload will try to retry a failed upload;
* `MaxAutoRetries` ([async.maxAutoRetries](../../../kendo-ui/api/javascript/ui/upload#configuration-async.maxAutoRetries))—the amount of attempts the Kendo Upload will make to retry a failed upload. After that will report an upload fail.

###### Example

```Razor
@(Html.Kendo().Upload()
    .Name("files")
    .Async(a => a
        .Save("ChunkSave", "Upload")
        .Remove("Remove", "Upload")
        .AutoUpload(true)
        .ChunkSize(1100) // Will separate the file into chunks of size 1100 bytes.
        .Concurrent(true) // Will upload all files simultaneously.
        .AutoRetryAfter(300) // Will attempt a failed chunk upload after 300ms.
        .MaxAutoRetries(4) // Will attempt the same failed chunk upload 4 times.
    )
)
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

The server-side implementation entirely depends on application requirments and logic. The action method provided here and in the demo ([Upload / Chunk Upload](http://demos.telerik.com/aspnet-mvc/upload/chunkupload)) is an example you can follow for handling chunks and merging them into files.

> Note
>
> **Kendo Upload** as a client-side solution does not handle any sort of validation. File validation and any security requirments should be handled on the server by using application logic.

## See Also

* [Overview of the Upload HtmlHelper]({% slug overview_uploadhelper_aspnetmvc %})
* [Upload HtmlHelper Modes of Operation]({% slug modesoperation_uploadhelper_aspnetmvc %})
* [How to Upload Files from Grid Popup Editors in ASP.NET MVC Applications]({% slug howto_uploadfilesgridpopupeditor_uploadaspnetmvc %})
* [How to Upload Files to Databases in ASP.NET MVC Applications]({% slug howto_uploadfilesdatabases_uploadaspnetmvc %})
* [Overview of the Kendo UI Upload Widget](http://docs.telerik.com/kendo-ui/controls/editors/upload/overview)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
* [Upload HtmlHelper Troubleshooting]({% slug troubleshoot_uploadhelper_aspnetmvc %})