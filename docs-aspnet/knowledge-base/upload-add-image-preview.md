---
title: Add Image Previews before Uploading Files in the Upload
page_title: Add Image Previews before Uploading Files in the Upload
description: "Learn how to add an image preview to a file with the Telerik UI for {{ site.framework }} Upload component."
slug: upload-add-image-preview
tags: telerik, upload, add, image, preview, before, uploading, files
component: upload
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
  <td>Created with the 2022.2.802 version</td>
 </tr>
</table>

## Description

How can I add an image preview that appears before the user uploads a file when working with the {{ site.product }} Upload?

## Solution

1. Create a function that executes the logic for adding an image preview upon selecting a file.
1. To handle the file selection, subscribe to the [`Select`](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/UploadEventBuilder#selectsystemstring) event.
1. Within the handler, call the previously created function for each file entry and pass the Upload's wrapper.

```Index.cshtml
    @(Html.Kendo().Upload()
        .Name("files")
        .Events(e => e.Select("onSelect"))
        .Async(a => a
            .Save("Async_Save", "Upload")
            .Remove("Async_Remove", "Upload")
            .AutoUpload(false)
        )
    )
```
```Script.js
<script>
    function onSelect(e){
      var wrapper = this.wrapper;
      e.files.forEach(file => { // Loop through each file entry.
           setTimeout(function () {
               addPreview(file, wrapper); // Call the function for adding an image preview and pass both the file object and wrapper.
           });                        
      })
    }

    function addPreview(file, wrapper) {
        var raw = file.rawFile; // Get the raw file information.
        var reader = new FileReader(); // Create a new FileReader instance.

        if (raw) {
          reader.onloadend = function () { // Ensure that the file is loaded.
            var preview = $("<img class='image-preview'>").attr("src", this.result); // Create an image element.

            wrapper.find(".k-file[data-uid='" + file.uid + "'] .k-file-group-wrapper")
              .replaceWith(preview); // Replace the HTML markup of the current file with the newly created image.
          };

          reader.readAsDataURL(raw); // Read the content of the file.
        }
      }
</script> 
```

For the complete implementation of the suggested approach, refer to the following [Telerik REPL](https://netcorerepl.telerik.com/wmOCcTGO07hJtAEI55) example.
