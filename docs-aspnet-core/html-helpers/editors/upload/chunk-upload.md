---
title: Chunk Upload
page_title: Chunk Upload | Telerik UI Upload HtmlHelper for ASP.NET Core
description: "Learn how to upload large files in chunks when using the Telerik UI Upload HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_upload_chunks_aspnetcore
position: 3
---

# Chunk Upload

The chunk upload of files enables the user to send large files which are uploaded asynchronously with multiple requests to the server.

It also supports the pausing and resuming of the file upload during the time the application stays open in the browser.

> The chunk upload functionality is available only in the [asynchronous mode]({%slug htmlhelpers_upload_modes_of_operation_aspnetcore%}#asynchronous-mode) of the Upload.

## Basic Usage

To enable the chunk upload:

1. Set up the `Async(a => a.ChunkSize())` option of the Upload.

    ```
    @(Html.Kendo().Upload()
        .Name("files")
        .Async(a => a
            .Save("ChunkSave", "Upload")
            .Remove("Remove", "Upload")
            .AutoUpload(true)
            .ChunkSize(1100)
        )
    )
    ```

1. Implement the server-side logic (that is, the `ChunkSave` action is assigned) which processes the file chunks and merges them into file:

    ```
    public class ChunkMetaData
    {
        public string UploadUid { get; set; }
        public string FileName { get; set; }
        public string RelativePath { get; set; }
        public string ContentType { get; set; }
        public long ChunkIndex { get; set; }
        public long TotalChunks { get; set; }
        public long TotalFileSize { get; set; }
    }

    public class FileResult
    {
        // Because the chunks are sent in a specific order,
        // the server is expected to send back a response
        // with the meta data of the chunk that is uploaded.
        public bool uploaded { get; set; }
        public string fileUid { get; set; }
    }

    public void AppendToFile(string fullPath, IFormFile content)
    {
        try
        {
            using (FileStream stream = new FileStream(fullPath, FileMode.Append, FileAccess.Write, FileShare.ReadWrite))
            {
                content.CopyTo(stream);
            }
        }
        catch (IOException ex)
        {
            throw ex;
        }
    }

    public ActionResult ChunkSave(IEnumerable<IFormFile> files, string metaData)
    {
        if (metaData == null)
        {
            return Save(files);
        }

        MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(metaData));

        JsonSerializer serializer = new JsonSerializer();
        ChunkMetaData chunkData;
        using (StreamReader streamReader = new StreamReader(ms))
        {
            chunkData = (ChunkMetaData)serializer.Deserialize(streamReader, typeof(ChunkMetaData));
        }

        string path = String.Empty;
        // The Name of the Upload component is "files".
        if (files != null)
        {
            foreach (var file in files)
            {
                path = Path.Combine(HostingEnvironment.WebRootPath, "App_Data", chunkData.FileName);

                // AppendToFile(path, file);
            }
        }

        FileResult fileBlob = new FileResult();

        // This response indicates to the Upload
        // that it can proceed either
        // with the next chunk ("uploaded" = false) or with the next file ("uploaded" = true).
        fileBlob.uploaded = chunkData.TotalChunks - 1<= chunkData.ChunkIndex;
        fileBlob.fileUid = chunkData.UploadUid;

        return Json(fileBlob);
    }

    public ActionResult Save(IEnumerable<IFormFile> files)
    {
        // The Name of the Upload component is "files".
        if (files != null)
        {
            foreach (var file in files)
            {
                var fileContent = ContentDispositionHeaderValue.Parse(file.ContentDisposition);

                // Some browsers send file names with full path.
                // The demo is interested only in the file name.
                var fileName = Path.GetFileName(fileContent.FileName.ToString().Trim('"'));
                var physicalPath = Path.Combine(HostingEnvironment.WebRootPath, "App_Data", fileName);

                file.SaveAs(physicalPath);
            }
        }

        // Return an empty string to signify success.
        return Content("");
    }
    ```

## Modifying the Chunk Upload

To fine-tune the chunk upload, use any of the following configuration options:

* `Async(a => a.Concurrent())`&mdash;Controls whether the selected files are uploaded simultaneously or one after the other.
* `Async(a => a.AutoRetryAfter())`&mdash;Represents the time interval in milliseconds after which the Upload attempts to retry a failed upload.
* `Async(a => a.MaxAutoRetries())`&mdash;Represents the number of attempts the Upload makes to retry a failed upload before reporting it.

> As a client-side solution, the Upload does not handle validation. File validation and security requirements have to be handled on the server by using application logic.

```
    @(Html.Kendo().Upload()
        .Name("files")
        .Async(a => a
            .Save("ChunkSave", "Upload")
            .Remove("Remove", "Upload")
            .AutoUpload(true)
            .ChunkSize(1100) // Will separate the file into chunks of size 11000 bytes.
            .Concurrent(true) // Will upload all files simultaneously.
            .AutoRetryAfter(300) // Will attempt a failed chunk upload after 300ms.
            .MaxAutoRetries(4) // Will attempt the same failed chunk upload 4 times.
        )
    )
```

## See Also

* [Chunk Upload by the Upload HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/upload/chunkupload)
* [Server-Side API](/api/upload)
