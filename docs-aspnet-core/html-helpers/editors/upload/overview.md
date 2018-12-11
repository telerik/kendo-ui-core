---
title: Overview
page_title: Upload | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Kendo UI Upload HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/html-helpers/upload
slug: htmlhelpers_upload_aspnetcore
position: 1
---

# Upload HtmlHelper Overview

The Upload HtmlHelper extension is a server-side wrapper for the [Kendo UI Upload](https://demos.telerik.com/kendo-ui/upload/index) widget.

It enables you to configure the Kendo UI Upload widget from server-side code. The [Upload](http://docs.telerik.com/kendo-ui/controls/editors/upload/overview) uses progressive enhancement to deliver the best possible uploading experience to users, without requiring extra developer effort.

For more information on the HtmlHelper, refer to the article on the [Upload HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/upload/overview).

## Basic Usage

The following example demonstrates how to define the Upload widget by using the Upload HtmlHelper.

```Razor
@(Html.Kendo().Upload()
    .Name("files")
    .Async(a => a
        .Save("SaveAsync", "Upload")
        .Remove("Remove", "Upload")
        .AutoUpload(true)
    )
)
```
```Controller
public IHostingEnvironment HostingEnvironment { get; set; }

public UploadController(IHostingEnvironment hostingEnvironment)
{
    HostingEnvironment = hostingEnvironment;
}

public async Task<ActionResult> SaveAsync(IEnumerable<IFormFile> files)
{
    // The Name of the Upload component is "files"
    if (files != null)
    {
        foreach (var file in files)
        {
            var fileContent = ContentDispositionHeaderValue.Parse(file.ContentDisposition);

            // Some browsers send file names with full path.
            // We are only interested in the file name.
            var fileName = Path.GetFileName(fileContent.FileName.ToString().Trim('"'));
            var physicalPath = Path.Combine(HostingEnvironment.WebRootPath, "App_Data", fileName);

            // The files are not actually saved in this demo
            using (var fileStream = new FileStream(physicalPath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }
        }
    }

    // Return an empty string to signify success
    return Content("");
}

public ActionResult Remove(string[] fileNames)
{
    // The parameter of the Remove action must be called "fileNames"

    if (fileNames != null)
    {
        foreach (var fullName in fileNames)
        {
            var fileName = Path.GetFileName(fullName);
            var physicalPath = Path.Combine(HostingEnvironment.WebRootPath, "App_Data", fileName);

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
```

## Basic Configuration

The following example demonstrates the basic configuration of the Upload HtmlHelper and how to get the Upload widget instance.

An Upload widget configured in such way offers support for multiple file selection, asynchronous removal of uploaded files, progress tracking, in-progress cancellation of upload, file drag-and-drop. Progress tracking, file drag-and-drop, and in-progress cancellation of upload are automatically enabled if supported by the browser.

> **Important**
>
> The Upload widget works in `<input type="file" />` elements, so it is only able to upload files selected by the user, which exist in the file system. For uploading files generated with JavaScript on the fly, use another approach, e.g. an Ajax request.

###### Example

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
        //Notice that the Name() of the Upload is used to get its client-side instance.
        var files = $("#files").data("kendoUpload");
    });
</script>
```

## Functionality and Features

* [Modes of operation]({% slug htmlhelpers_upload_modes_of_operation_aspnetcore %});
* [Dragging and dropping of files]({% slug htmlhelpers_upload_drag_drop_aspnetcore %});
* [Chunk upload of files]({% slug htmlhelpers_upload_chunks_aspnetcore %});
* [Validation of files]({% slug htmlhelpers_upload_validation_aspnetcore %});
* [Identification of files]({% slug htmlhelpers_upload_identify_files_aspnetcore %});
* [Sending and receiving metadata]({% slug htmlhelpers_upload_send_meta_aspnetcore %});

## Events

The following example demonstrates Upload HTML helper exposes several events, which could be handled on the client-side.

###### Example

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

            // File size is not available in all browsers
            if (file.size > 0) {
                info  += " (" + Math.ceil(file.size / 1024) + " KB)";
            }
            return info;
        }).join(", ");
    }
</script>
```

## See Also

* [Modes of Operation]({% slug htmlhelpers_upload_modes_of_operation_aspnetcore %})
* [Dragging and Dropping of Files]({% slug htmlhelpers_upload_drag_drop_aspnetcore %})
* [Chunk File Upload]({% slug htmlhelpers_upload_chunks_aspnetcore %})
* [File Validation]({% slug htmlhelpers_upload_validation_aspnetcore %})
* [Sending and Receiving of Metadata]({% slug htmlhelpers_upload_send_meta_aspnetcore %})
* [Identifying Files]({% slug htmlhelpers_upload_identify_files_aspnetcore %})
* [JavaScript API Reference of the Upload](http://docs.telerik.com/kendo-ui/api/javascript/ui/upload)
* [Upload HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/upload/overview)
* [Upload Official Demos](http://demos.telerik.com/aspnet-core/upload/index)
* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
