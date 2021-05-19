---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Upload HtmlHelper for {{ site.framework }}."
previous_url: /helpers/html-helpers/upload, /helpers/editors/upload/overview
slug: htmlhelpers_upload_aspnetcore
position: 1
---

# Upload HtmlHelper Overview

The Telerik UI Upload HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Upload widget.

The Upload uses progressive enhancement to deliver the best possible uploading experience to users, without requiring extra developer effort.

* [Demo page for the Upload](https://demos.telerik.com/{{ site.platform }}/upload/index)

## Initializing the Upload

The following example demonstrates how to define the Upload widget by using the Upload HtmlHelper.

```Razor
@(Html.Kendo().Upload()
    .Name("files")
    .Async(a => a
        .Save("Save", "Upload")
        .Remove("Remove", "Upload")
        .AutoUpload(true)
    )
)
```
```Controller
public IWebHostEnvironment WebHostEnvironment { get; set; }

public UploadController(IWebHostEnvironment webHostEnvironment)
{
    WebHostEnvironment = webHostEnvironment;
}

public async Task<ActionResult> Save(IEnumerable<IFormFile> files)
{
    // The Name of the Upload component is "files".
    if (files != null)
    {
        foreach (var file in files)
        {
            var fileContent = ContentDispositionHeaderValue.Parse(file.ContentDisposition);

            // Some browsers send file names with full path.
            // The sample is interested only in the file name.
            var fileName = Path.GetFileName(fileContent.FileName.ToString().Trim('"'));
            var physicalPath = Path.Combine(WebHostEnvironment.WebRootPath, "App_Data", fileName);

            using (var fileStream = new FileStream(physicalPath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }
        }
    }

    // Return an empty string to signify success.
    return Content("");
}

public ActionResult Remove(string[] fileNames)
{
    // The parameter of the Remove action must be called "fileNames".

    if (fileNames != null)
    {
        foreach (var fullName in fileNames)
        {
            var fileName = Path.GetFileName(fullName);
            var physicalPath = Path.Combine(WebHostEnvironment.WebRootPath, "App_Data", fileName);

            // TODO: Verify user permissions.

            if (System.IO.File.Exists(physicalPath))
            {
                System.     IO.File.Delete(physicalPath);
            }
        }
    }

    // Return an empty string to signify success.
    return Content("");
}
```

## Basic Configuration

The following example demonstrates the basic configuration of the Upload HtmlHelper and how to get the Upload widget instance.

An Upload widget configured in such way offers support for multiple file selection, asynchronous removal of uploaded files, progress tracking, in-progress cancellation of upload, file drag-and-drop. Progress tracking, file drag-and-drop, and in-progress cancellation of upload are automatically enabled if supported by the browser.

> The Upload works in `<input type="file" />` elements, so it is only able to upload files selected by the user, which exist in the file system. For uploading files generated with JavaScript on the fly, use another approach, e.g. an Ajax request.

```
@(Html.Kendo().Upload()
    .Name("files")
    .Multiple(true)
    .Async(a => a
        .Save("ChunkSave", "Upload")
        .Remove("Remove", "Upload")
        .AutoUpload(true)
        .ChunkSize(1100)
    )
)

<script type="text/javascript">
    $(function() {
        // The Name() of the Upload is used to get its client-side instance.
        var files = $("#files").data("kendoUpload");
    });
</script>
```

## Functionality and Features

* [Modes of operation]({% slug htmlhelpers_upload_modes_of_operation_aspnetcore %})
* [Dragging and dropping of files]({% slug htmlhelpers_upload_drag_drop_aspnetcore %})
* [Chunk upload of files]({% slug htmlhelpers_upload_chunks_aspnetcore %})
* [Validation of files]({% slug htmlhelpers_upload_validation_aspnetcore %})
* [Identification of files]({% slug htmlhelpers_upload_identify_files_aspnetcore %})
* [Sending and receiving metadata]({% slug htmlhelpers_upload_send_meta_aspnetcore %})
* [Accessibility]({% slug accessibility_aspnetcore_upload %})

## Events

The following example demonstrates Upload HTML helper exposes several events, which could be handled on the client-side. For a complete example on basic Upload events, refer to the [demo on using the events of the Upload](https://demos.telerik.com/{{ site.platform }}/upload/events).

```
@(Html.Kendo().Upload()
    .Name("files")
    .Async(a => a
        .Save("Save", "Upload")
        .Remove("Remove", "Upload")
        .AutoUpload(true)
    )
    .Events(events => events
        .Cancel("onCancel")
        .Complete("onComplete")
        .Error("onError")
        .Progress("onProgress")
        .Remove("onRemove")
        .Select("onSelect")
        .Success("onSuccess")
        .Upload("onUpload")
    )
)

<script type="text/javascript">
    function onSelect(e) {
        console.log("Select :: " + getFileInfo(e));
    }

    function onUpload(e) {
        console.log("Upload :: " + getFileInfo(e));
    }

    function onSuccess(e) {
        console.log("Success (" + e.operation + ") :: " + getFileInfo(e));
    }

    function onError(e) {
        console.log("Error (" + e.operation + ") :: " + getFileInfo(e));
    }

    function onComplete(e) {
        console.log("Complete");
    }

    function onCancel(e) {
        console.log("Cancel :: " + getFileInfo(e));
    }

    function onRemove(e) {
        console.log("Remove :: " + getFileInfo(e));
    }

    function onProgress(e) {
        console.log("Upload progress :: " + e.percentComplete + "% :: " + getFileInfo(e));
    }

    function getFileInfo(e) {
        return $.map(e.files, function(file) {
            var info = file.name;

            // File size is not available in all browsers.
            if (file.size > 0) {
                info  += " (" + Math.ceil(file.size / 1024) + " KB)";
            }
            return info;
        }).join(", ");
    }
</script>
```

## See Also

* [Basic Usage by the Upload HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/upload)
* [Using the API of the Upload HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/upload/api)
* [Server-Side API](/api/upload)
