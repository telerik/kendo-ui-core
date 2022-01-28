---
title: Chunk Upload
page_title: Chunk Upload
description: "Learn how to upload large files in chunks when using the Telerik UI Upload HtmlHelper for {{ site.framework }}."
previous_url: /helpers/editors/upload/chunk-upload
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

{% if site.core %}
1. Implement the server-side logic (that is, the `ChunkSave` action is assigned) which processes the file chunks and merges them into file:

    ```
    public IWebHostingEnvironment WebHostEnvironment { get; set; }

    public UploadController(IWebHostEnvironment webHostEnvironment)
    {
        WebHostEnvironment = webHostEnvironment;
    }

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
                path = Path.Combine(WebHostEnvironment.WebRootPath, "App_Data", chunkData.FileName);

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
                var physicalPath = Path.Combine(WebHostEnvironment.WebRootPath, "App_Data", fileName);

                file.SaveAs(physicalPath);
            }
        }

        // Return an empty string to signify success.
        return Content("");
    }
    ```

{% else %}
1. Implement the server-side logic (that is, the `ChunkSave` action is assigned) which processes the file chunks and merges them into file:

    ```
    [DataContract]
    public class ChunkMetaData
    {
        [DataMember(Name = "uploadUid")]
        public string UploadUid { get; set; }
        [DataMember(Name = "fileName")]
        public string FileName { get; set; }
        [DataMember(Name = "relativePath")]
        public string RelativePath { get; set; }
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

    [Demo]
    public ActionResult ChunkUpload()
    {
        return View();
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

    public ActionResult Chunk_Upload_Save(IEnumerable<HttpPostedFileBase> files, string metaData)
    {
        if (metaData == null)
        {
            return Chunk_Upload_Async_Save(files);
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

    public ActionResult Chunk_Upload_Remove(string[] fileNames)
    {
        // The parameter of the Remove action must be called "fileNames"

        if (fileNames != null)
        {
            foreach (var fullName in fileNames)
            {
                var fileName = Path.GetFileName(fullName);
                var physicalPath = Path.Combine(Server.MapPath("~/App_Data"), fileName);

                // TODO: Verify user permissions

                if (System.IO.File.Exists(physicalPath))
                {
                    // The files are not actually removed in this demo
                    // System.IO.File.Delete(physicalPath);
                }
            }
        }

        // Return an empty string to signify success
        return Content("");
    }

    public ActionResult Chunk_Upload_Async_Save(IEnumerable<HttpPostedFileBase> files)
    {
        // The Name of the Upload component is "files"
        if (files != null)
        {
            foreach (var file in files)
            {
                // Some browsers send file names with full path.
                // We are only interested in the file name.
                var fileName = Path.GetFileName(file.FileName);
                var physicalPath = Path.Combine(Server.MapPath("~/App_Data"), fileName);

                // The files are not actually saved in this demo
                // file.SaveAs(physicalPath);
            }
        }

        // Return an empty string to signify success
        return Content("");
    }
    ```

{% endif %}

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

* [Chunk Upload by the Upload HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/upload/chunkupload)
* [Server-Side API](/api/upload)
