---
title: Display Existing Files in the Upload
page_title: Display Existing Files in the Upload
description: "Learn how to display existing files from a view model in the Telerik UI Upload component for ASP.NET Core."
components: ["upload"]
slug: upload-display-existing-files
tags: upload, files, view model, existing files, asynchronous, core
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Telerik UI for ASP.NET Core Upload</td>
 </tr>
</table>

## Description

How can I display files that are already associated with a record in the Telerik UI for ASP.NET Core Upload component?

## Solution

Use the `Files()` configuration to populate the Upload with the files from the view model. Set the file name, extension, and size for each file.

```HtmlHelper
@model RecordViewModel

@(Html.Kendo().Upload()
    .Name("files")
    .Async(asyncSettings => asyncSettings
        .Save("Chunk_Upload_Save", "Upload")
        .Remove("Chunk_Upload_Remove", "Upload")
        .AutoUpload(true)
        .ChunkSize(11000)
    )
    .Files(files =>
    {
        if (Model.Files != null)
        {
            foreach (var file in Model.Files)
            {
                files.Add()
                    .Name(file.Name)
                    .Extension(file.Extension)
                    .Size(file.Size ?? 0);
            }
        }
    })
)
```

{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc
@model RecordViewModel

<kendo-upload name="files">
    <async save-url="@Url.Action("Chunk_Upload_Save", "Upload")"
           remove-url="@Url.Action("Chunk_Upload_Remove", "Upload")"
           auto-upload="true"
           chunk-size="11000" />
    <files>
        @if (Model.Files != null)
        {
            foreach (var file in Model.Files)
            {
                <file name="@file.Name"
                      extension="@file.Extension"
                      size="@file.Size" />
            }
        }
    </files>
</kendo-upload>
```
{% endif %}

The Upload displays these files when the page loads. The `Files()` configuration only defines the initial file list. The `Save` and `Remove` actions still handle subsequent upload and removal requests.

For an example that also sends a view model property to the server when a user removes an existing file, see [Sending a Model Property to the Server When Removing a File from the Upload]({% slug upload-send-property-when-removing-file %}).

## See Also

* [Upload Documentation]({% slug htmlhelpers_upload_aspnetcore %})
* [Upload Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/upload)
* [Upload Server-Side API](/api/upload)
{% if site.core %}
* [Upload TagHelper API](/api/taghelpers/upload)
{% endif %}
