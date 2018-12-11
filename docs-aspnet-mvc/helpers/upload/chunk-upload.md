---
title: Chunk Upload
page_title: Chunk Upload | Kendo UI Upload HtmlHelper for ASP.NET MVC
description: "Upload files in chunks in asynchronous mode in the Kendo UI Upload widget."
slug: chunkupload_uploadhelper_aspnetmvc
position: 3
---

# Chunk Upload

The chunk upload of files enables the user to send large files, which are uploaded asynchronously with multiple requests, to the server and to pause and resume the file upload for the time the application is open in the browser.

> **Important**
> * The chunk upload functionality is available as of the Kendo UI 2017 R2 release.
> * The chunk upload functionality is available only in the [asynchronous mode](http://docs.telerik.com/kendo-ui/controls/editors/upload/modes.html#asynchronous-mode) of the Upload.

## Getting Started

To enable the chunk upload, set up the `ChunkSize` helper method ([`async.chunkSize`](http://docs.telerik.com/kendo-ui/api/javascript/ui/upload#configuration-async.chunkSize) option) of the Upload.

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

## Fine-Tuning

To modify or fine-tune the chunk upload, use any of the following configuration options:

* `Concurrent` ([async.concurrent](http://docs.telerik.com/kendo-ui/api/javascript/ui/upload#configuration-async.concurrent))&mdash;Controls whether the selected files are uploaded simultaneously or one after the other.
* `AutoRetryAfter` ([async.autoRetryAfter](http://docs.telerik.com/kendo-ui/api/javascript/ui/upload#configuration-async.autoRetryAfter))&mdash;The time interval in milliseconds after which the Upload attempts to retry a failed upload.
* `MaxAutoRetries` ([async.maxAutoRetries](http://docs.telerik.com/kendo-ui/api/javascript/ui/upload#configuration-async.maxAutoRetries))&mdash;The number of attempts the Upload makes to retry a failed upload before reporting it.

###### Example

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

## Server-side Implementation

The server-side implementation entirely depends on the application requirements and logic. The approach that is demonstrated in this article and in the [chunk upload demo](http://demos.telerik.com/aspnet-mvc/upload/chunkupload) can serve you as an example on how to handle chunks and merge them into files.

> **Important**
>
> As a client-side solution, the Upload does not handle validation. File validation and security requirements should be handled on the server by using application logic.

## See Also

* [Overview of the Upload HtmlHelper]({% slug overview_uploadhelper_aspnetmvc %})
* [Upload HtmlHelper Modes of Operation]({% slug modesoperation_uploadhelper_aspnetmvc %})
* [How to Upload Files from Grid Popup Editors in ASP.NET MVC Applications]({% slug howto_uploadfilesgridpopupeditor_uploadaspnetmvc %})
* [How to Upload Files to Databases in ASP.NET MVC Applications]({% slug howto_uploadfilesdatabases_uploadaspnetmvc %})
* [Overview of the Kendo UI Upload Widget](http://docs.telerik.com/kendo-ui/controls/editors/upload/overview)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
* [Upload HtmlHelper Troubleshooting]({% slug troubleshoot_uploadhelper_aspnetmvc %})
