---
title: Add Image Previews before Uploading Files
page_title: Add Image Previews before Uploading Files | Kendo UI Upload
description: "Learn how to add an image preview to a file with the Kendo UI Upload widget."
slug: howto_add_image_preview
---

# Add Image Previews before Uploading Files

Depending on your project, you might need to add an image preview before you upload a file when working with the Kendo UI Upload widget.

The following example demonstrates how to add an image preview and read the file in the `select` event of the Upload.

###### Example

```html
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

            wrapper.find(".k-file[data-uid='" + file.uid + "'] .k-file-extension-wrapper")
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

* [Upload JavaScript API Reference](/api/javascript/ui/upload)
* [Modes of Operation]({% slug modes_upload_widget %})
* [Metadata]({% slug metadata_upload_widget %})

For more runnable examples on the Kendo UI Upload widget, browse its [**How To** documentation folder]({% slug howto_remove_files_with_errors %}).
