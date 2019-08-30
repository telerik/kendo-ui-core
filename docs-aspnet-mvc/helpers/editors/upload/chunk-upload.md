---
title: Chunk Upload
page_title: Chunk Upload | Telerik UI Upload HtmlHelper for ASP.NET MVC
description: "Learn how to upload large files in chunks when using the Telerik UI Upload HtmlHelper for ASP.NET MVC."
slug: chunkupload_uploadhelper_aspnetmvc
position: 3
---

# Chunk Upload

The chunk upload of files enables the user to send large files which are uploaded asynchronously with multiple requests to the server and to pause and resume the file upload for the time the application is open in the browser.

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

            // AppendToFile(path, file.InputStream);
        }
    }

    FileResult fileBlob = new FileResult();
    fileBlob.uploaded = chunkData.TotalChunks - 1<= chunkData.ChunkIndex;
    fileBlob.fileUid = chunkData.UploadUid;

    return Json(fileBlob);
}
```

## Modifying the Chunk Upload

To modify the chunk upload, use any of the following configuration options:

* `Concurrent` ([async.concurrent](http://docs.telerik.com/kendo-ui/api/javascript/ui/upload#configuration-async.concurrent))&mdash;Controls whether the selected files are uploaded simultaneously or one after the other.
* `AutoRetryAfter` ([async.autoRetryAfter](http://docs.telerik.com/kendo-ui/api/javascript/ui/upload#configuration-async.autoRetryAfter))&mdash;The time interval in milliseconds after which the Upload attempts to retry a failed upload.
* `MaxAutoRetries` ([async.maxAutoRetries](http://docs.telerik.com/kendo-ui/api/javascript/ui/upload#configuration-async.maxAutoRetries))&mdash;The number of attempts the Upload makes to retry a failed upload before reporting it.

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

## Transferring of Chunks

The chunk upload functionality separates the selected files chunks or blobs of data. These chunks are automatically sent to the server to the destination that is set up in the `saveUrl` option over an AJAX request. Because the chunks are sent in a specific order, the server is expected to send back a response with the meta data of the chunk that is uploaded. This response indicates to the Upload that it can proceed either with the next chunk (`"uploaded": false`) or with the next file (`"uploaded": true`).

The response has to include the metadata from the following example.

    {
        "uploaded": true | false,
        /*  false instructs the Upload to send the next chunk of data.
            true indicates that the last chunk is processed, the upload was successful
            and the upload of the next file can continue. */

        "fileUid": Number
        /* The UID of the uploaded chunk so that the Upload can get the next chunk and send it. */
    }

The following example demonstrates a valid server response.

    {"uploaded":true,"fileUid":"b95ee9fa-85e8-482c-946d-a12ed6dbefed"}

## Implementing on the Server

The server-side implementation entirely depends on the application requirements and logic. The suggested approach can serve you as an example on how to handle chunks and merge them into files.

> As a client-side solution, the Upload does not handle validation. File validation and security requirements have to be handled on the server by using application logic.

## See Also

* [Chunk Upload by the Upload HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/upload/chunkupload)
* [UploadBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/UploadBuilder)
* [Upload Server-Side API](/api/upload)
