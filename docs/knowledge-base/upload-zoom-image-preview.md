---
title: Open Image Previews in External Dialog in the Upload
page_title: Open the Preview of the Images in External Dialog on Click - jQuery Upload
description: "Learn how to open the image preview in external dialog on click in Kendo UI for jQuery Upload component."
slug: hupload-zoom-image-preview
tags: upload, image, preview, zoom, dialog, window
type: how-to
res_type: kb
components: ["upload", "window"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Upload for jQuery</td>
 </tr>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Window for jQuery</td>
 </tr>
</table>

## Description

I added [image previews before uploading]({% slug howto_add_image_preview %}) in Kendo UI for jQuery Upload. Now, I want to zoom or open the images in the image preview in external dialog when an image is clicked. How can I achieve that? 

## Solution

1. Add a Kendo Window on the page that is initially [hidden](/api/javascript/ui/window/configuration/visible).  
1. When the preview icon is clicked, you can [open](/api/javascript/ui/window/methods/open) the Window and change its [content](/api/javascript/ui/window/methods/content#content) with the clicked image.
1. You can also set styles, thus the image to always be 100% of the width and height of the Window when it is resized.

The following example demonstrates the full implementation of the described approach:


```dojo
 <div id="dialog"></div>     
      <input type="file" id="files">

      <script>
        $(document).ready(function() {
          $("#files").kendoUpload({
            async: {
              saveUrl: "save",
              removeUrl: "remove",
              autoUpload: false
            },
            multiple: true,
            select: function(e) {
              var fileInfo = e.files[0];
              var wrapper = this.wrapper;
              e.files.forEach(function(file){
                addPreview(file, wrapper);
              })
            }
          });


          $("#dialog").kendoWindow({
            title: "Kendo Window Component",         
            visible:false
          });

        });

        function addPreview(file, wrapper) {
          var raw = file.rawFile;
          var reader  = new FileReader();

          if (raw) {
            reader.onloadend = function () {
              var preview = $("<img class='image-preview'>").attr("src", this.result);

              wrapper.find(".k-file[data-uid='" + file.uid + "'] .k-file-icon-wrapper")
                .replaceWith(preview);
            };

            reader.readAsDataURL(raw);

            setTimeout(function(){              
              $('.image-preview').on('click', function(){               
                $("#dialog").data('kendoWindow').content('<img src="'+ this.src+'" />').open()
              })
            }, 100)

          }
        }
      </script>
      <style>
        .image-preview {
          position: relative;
          vertical-align: top;
          height: 45px;
        }

        .k-window-content img{
          height: 100%;
          width: 100%;
        }
      </style>
```

## See Also

* [JavaScript API Reference of the jQuery Upload](/api/javascript/ui/upload)
* [JavaScript API Reference of the jQuery Window](/api/javascript/ui/window)
* [Add Image Previews before Uploading Files in the Upload]({% slug howto_add_image_preview %})
