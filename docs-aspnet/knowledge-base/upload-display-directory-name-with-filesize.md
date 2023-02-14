---
title: Display Directory Name and File Size in Upload
description: An example on how to display the directory name and total file size for the {{ site.product }} Upload.
type: how-to
page_title: Display Directory Name and File Size in Upload
slug: upload-display-directory-name-with-filesize
tags: upload, directory, folder, name, file, size
ticketid: 1548109
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Upload</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2022.1.412 version</td>
 </tr>
</table>

## Description

How can I display the directory name and the total size of its content when working with the {{ site.product }} Upload?

## Solution

1. Hide the file list menu through the [`.ShowFileList()`](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/UploadBuilder#showfilelistsystemboolean) configuration method.
1. Subscribe to the [`Select`](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/UploadEventBuilder#selectsystemstring) event.
1. Get both the directory name and total file size in the `Select` event handler, and append them to the widget wrapper.

```Index.cshtml
    @(Html.Kendo().Upload()
        .Name("files")
        .Async(a => a
            .Save("Directory_Upload_Chunk_Save", "Home")
            .Remove("Directory_Upload_Remove", "Home")
            .ChunkSize(11000)
        )
        .ShowFileList(false)
        .Directory(true)
        .DirectoryDrop(true)
        .Events(e=>e.Select("onSelect"))
        .Validation(validation =>
        {
            validation.MaxFileSize(20000000);
        })
    )
```
```Script.js
    <script>
        function onSelect(e) {
            var directoryName = "";
            if (e.files.length) {
                directoryName = e.files[0].rawFile.webkitRelativePath.split("/")[0]; //get the directory name
            }

            var totalFileSize = 0;
            $.each(e.files, function (index, value) {
                totalFileSize += value.size; //sum up the total file size
            })
            var upload = $("#files").data("kendoUpload"); //get the reference of the upload component
            upload.wrapper.append("<div class='k-file'><p class='k-file-name'>Uploaded directory: " + directoryName
            + "</p><p class='k-file-size'>Total file size: "+totalFileSize+" KB</p></div>"); //append the custom content
        }
    </script>
```

For the complete implementation of the suggested approach, refer to the following [Telerik REPL](https://netcorerepl.telerik.com/mwEPueFY11892ccr56) example.