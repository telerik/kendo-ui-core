---
title: Modes of Operation
page_title: Modes of Operation
description: "Learn about the synchronous and the asynchronous modes of operation of the Telerik UI Upload component for {{ site.framework }}."
components: ["upload"]
previous_url: /helpers/editors/upload/modes
slug: htmlhelpers_upload_modes_of_operation_aspnetcore
position: 2
---

# Modes of Operation

The Upload provides the [synchronous](#synchronous-mode) and [asynchronous](#asynchronous-mode) modes of operation.

## Synchronous Mode

An Upload in the synchronous mode behaves like a regular file input&mdash;the selected files are uploaded upon form submission and users can select a set of files. When the Upload is in its synchronous mode, the browser does not have to support multiple file selection.

```HtmlHelper
<form method="post" action='@Url.Action("Submit")'>
    <div class="demo-section k-content">
        @(Html.Kendo().Upload()
            .Name("files")
            .HtmlAttributes(new { aria_label = "files" })
        )
        <p style="padding-top: 1em; text-align: right">
            <button type="submit" class="k-button k-button-solid-primary k-button-solid k-button-rectangle k-button-md k-rounded-md">Submit</button>
        </p>
    </div>
</form>
```
{% if site.core %}
```TagHelper
<form method="post" action='@Url.Action("Submit")'>
    <div class="demo-section k-content">
        <kendo-upload name="files" aria-label="files">
        </kendo-upload>
        <p style="padding-top: 1em; text-align: right">
            <button type="submit" class="k-button k-button-solid-primary k-button-solid k-button-rectangle k-button-md k-rounded-md">Submit</button>
        </p>
    </div>
</form>
```
{% endif %}
{% if site.core %}
```Controller
public IWebHostEnvironment WebHostEnvironment { get; set; }

public UploadController(IWebHostEnvironment webHostEnvironment)
{
    WebHostEnvironment = webHostEnvironment;
}

public ActionResult Submit(IEnumerable<IFormFile> files)
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

            using (var fileStream = new FileStream(physicalPath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }
        }
    }

    return View("Result");
}
```
{% else %}
```Controller
public IWebHostEnvironment WebHostEnvironment { get; set; }

public UploadController(IWebHostEnvironment webHostEnvironment)
{
    WebHostEnvironment = webHostEnvironment;
}

public ActionResult Submit(IEnumerable<HttpPostedFileBase> files)
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

            using (var fileStream = new FileStream(physicalPath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }
        }
    }

    return View("Result");
}
```
{% endif %}

## Asynchronous Mode

An Upload in the asynchronous mode requires dedicated server handlers to store and remove uploaded files. Files are upload immediately or, optionally, after the confirmation from the user. The upload request is executed out-of-band without interrupting the page flow. The asynchronous mode is implemented through the [HTML5 File API](https://en.wikipedia.org/wiki/HTML5_File_API).

```HtmlHelper
@(Html.Kendo().Upload()
    .Name("files")
    .Async(a => a
        .Save("SaveAsync", "Upload")
        .Remove("Remove", "Upload")
        .AutoUpload(true)
    )
)
```
{% if site.core %}
```TagHelper
<kendo-upload name="files">
    <async auto-upload="true" 
           save-url="@Url.Action("SaveAsync", "Upload")" 
           remove-url="@Url.Action("Remove","Upload")" />
</kendo-upload>
```
{% endif %}

{% if site.core %}
```Controller
public IWebHostingEnvironment WebHostEnvironment { get; set; }

public UploadController(IWebHostEnvironment webHostEnvironment)
{
    WebHostEnvironment = webHostEnvironment;
}

public async Task<ActionResult> SaveAsync(IEnumerable<IFormFile> files)
{
    // The Name of the Upload component is "files".
    if (files != null)
    {
        foreach (var file in files)
        {
            var fileContent = ContentDispositionHeaderValue.Parse(file.ContentDisposition);

            // Some browsers send file names with full path.
            // We are only interested in the file name.
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
                System.IO.File.Delete(physicalPath);
            }
        }
    }

    // Return an empty string to signify success.
    return Content("");
}
```
{% else %}
```Controller
    public ActionResult SaveAsync(IEnumerable<HttpPostedFileBase> files)
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

                // Implement the server validation before saving. The current example is a rudimentary one.
                file.SaveAs(physicalPath);
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
                    System.IO.File.Delete(physicalPath);
                }
            }
        }

        // Return an empty string to signify success
        return Content("");
    }
```
{% endif %}


### Handlers

The `save` handler has to accept `POST` requests. The requests will contain one or more files with the same name as the `input`&mdash;for example, `"files[]"` in the previous `Controller` example. The handler is expected to return any of the following responses:
* An empty response to signify success.
* A JSON string with `"text/plain"` content encoding. The de-serialized object is available in the [`success`](https://docs.telerik.com/kendo-ui/api/javascript/ui/upload/events/success) event handler, again to signify success.
* Any other response to signify failure.

The `remove` handler has to accept `POST` requests. The requests will contain one or more text fields with the `"fileNames[]"` name. The handler is expected to return any of the following responses:
* An empty response to signify success.
* A JSON string with `"text/plain"` content encoding. The de-serialized object is available in the [`success`](https://docs.telerik.com/kendo-ui/api/javascript/ui/upload/events/success) event handler, again to signify success.
* Any other response to signify failure.

### Asynchronous Mode Fallback

When the Upload is placed inside a `form` and is configured for asynchronous operation, it supports a fallback mechanism. Files that were not fully uploaded are sent as part of the `form` upon its submission by the user which ensures that no files are lost even if you do not take any special measures to block the **Submit** button during upload.

The uploaded files must be handled both in the `save` handler and in the `form` submit action, as in synchronous mode.

## See Also

* [Asynchronous Mode of Operation by the Upload HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/upload/async)
* [Server-Side API](/api/upload)
