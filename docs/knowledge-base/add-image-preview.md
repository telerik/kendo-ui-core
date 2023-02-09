---
title: Add Image Previews before Uploading Files in the Upload
page_title: Add Image Previews before Uploading Files in the Upload
description: "Learn how to add an image preview to a file with the Kendo UI Upload widget."
slug: howto_add_image_preview
previous_url: /controls/editors/upload/how-to/add-image-preview
tags: telerik, kendo, jquery, upload, add, image, preview, before, uploading, files
component: upload
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Upload for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I add an image preview before you upload a file when working with the Kendo UI Upload?

## Solution

The following example demonstrates how to add an image preview and read the file in the `select` event of the Upload.


```dojo
<div id="example">
    <h3>Add image preview before uploading file</h3>
		<input type="file" id="files">

    <script>
      $(document).ready(function() {
        $("#files").kendoUpload({
          async: {
            saveUrl: "save",
            removeUrl: "remove",
            autoUpload: false
          },
          multiple: false,
          select: function(e) {
            var fileInfo = e.files[0];
            var wrapper = this.wrapper;

            setTimeout(function(){
              addPreview(fileInfo, wrapper);
            });
          }
        });
      });

      function addPreview(file, wrapper) {
        var raw = file.rawFile;
        var reader  = new FileReader();

        if (raw) {
          reader.onloadend = function () {
            var preview = $("<img class='image-preview'>").attr("src", this.result);

            wrapper.find(".k-file[data-uid='" + file.uid + "'] .k-file-group-wrapper")
              .replaceWith(preview);
          };

          reader.readAsDataURL(raw);
        }
      }
    </script>
    <style>
      .image-preview {
        position: relative;
        vertical-align: top;
        height: 45px;
      }
    </style>
  </div>
```

## See Also

* [JavaScript API Reference of the Upload](/api/javascript/ui/upload)
* [Modes of Operation]({% slug modes_upload_widget %})
* [Metadata]({% slug metadata_upload_widget %})
