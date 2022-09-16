---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Upload component for {{ site.framework }}."
previous_url: /helpers/html-helpers/upload, /helpers/editors/upload/overview
slug: htmlhelpers_upload_aspnetcore
position: 1
---

# Upload Overview
{% if site.core %}
The Telerik UI Upload TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI Upload widget.
{% else %}
The Telerik UI Upload HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Upload widget.
{% endif %}

The Upload uses progressive enhancement to deliver the best possible uploading experience to users, without requiring extra developer effort.

* [Demo page for the Upload HtmlHelper](https://demos.telerik.com/{{ site.platform }}/upload/index)
{% if site.core %}
* [Demo page for the Upload TagHelper](https://demos.telerik.com/aspnet-core/upload/tag-helper)
{% endif %}

## Initializing the Upload

The following example demonstrates how to define the Upload widget.

{% if site.core %}
```HtmlHelper
@(Html.Kendo().Upload()
    .Name("files")
    .Async(a => a
        .Save("Save", "Upload")
        .Remove("Remove", "Upload")
        .AutoUpload(true)
    )
)
```
```TagHelper
    <kendo-upload name="files">
        <async auto-upload="true" 
               save-url="@Url.Action("Save", "Upload")" 
               remove-url="@Url.Action("Remove","Upload")" />
    </kendo-upload>
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
{% else %}
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
public ActionResult Save(IEnumerable<HttpPostedFileBase> files)
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

public ActionResult Remove(string[] fileNames)
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
```
{% endif %}

## Basic Configuration

The following example demonstrates the basic configuration of the Upload component and how to get the Upload widget instance.

An Upload widget configured in such way offers support for multiple file selection, asynchronous removal of uploaded files, progress tracking, in-progress cancellation of upload, file drag-and-drop. Progress tracking, file drag-and-drop, and in-progress cancellation of upload are automatically enabled if supported by the browser.

> The Upload works in `<input type="file" />` elements, so it is only able to upload files selected by the user, which exist in the file system. For uploading files generated with JavaScript on the fly, use another approach, e.g. an Ajax request.

```HtmlHelper
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
{% if site.core %}
```TagHelper
<kendo-upload name="files" multiple="true">
    <async save-url="@Url.Action("ChunkSave","Upload")" 
	       remove-url="@Url.Action("Remove","Upload")" 
	       auto-upload="true" 
	       chunk-size="1100"/>
</kendo-upload>
```
{% endif %}

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

```HtmlHelper
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
{% if site.core %}
```TagHelper
<kendo-upload name="files" 
			  on-cancel="onCancel" 
			  on-complete="onComplete"
			  on-error="onError" 
			  on-progress="onProgress" 
			  on-remove="onRemove" 
			  on-select="onSelect"
			  on-success="onSuccess" 
			  on-upload="onUpload">
	<async auto-upload="true" 
           save-url="@Url.Action("Save","Upload")" 
           remove-url="@Url.Action("Remove","Upload")"/>
</kendo-upload>


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
{% endif %}

## See Also

* [Basic Usage by the Upload HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/upload)
{% if site.core %}
* [Basic Usage of the Upload TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/upload/tag-helper)
{% endif %}
* [Using the API of the Upload HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/upload/api)
* [Server-Side API](/api/upload)
