---
title: Use Compact UI Mode
page_title: Use Compact UI Mode | Kendo UI Upload
description: "Learn how to hide the selected files for upload from the user interface and render the button for the upload confirmation only in the Kendo UI Upload widget."
slug: howto_usecompactuimode_upload
---

# Use Compact UI Mode

The example below demonstrates how to hide the selected files for upload from the user interface and only render the **Select files** button without additional UI elements in the Kendo UI Upload.

###### Example

```html
  <style>
     #wrapper {
       display: inline-block;
     }

     .k-upload {
       border-width: 0;
     }

     .k-upload .k-dropzone {
       padding: 0;
     }

     .k-upload-status-total {
       display: none;
     }
   </style>

   <div id="wrapper">
           <input name="files" id="files" type="file" />
         </div>

     <script>
       $(document).ready(function() {
         $("#files").kendoUpload({
           async: {
             saveUrl: "save",
             removeUrl: "remove"
           },
           showFileList: false
         });

         //Removing the "Drop files here message"
         $("#files").closest(".k-upload").find(".k-dropzone em").remove();
       });
     </script>
```

## See Also

* [Upload JavaScript API Reference](/api/javascript/ui/upload)
* [Modes of Operation]({% slug modes_upload_widget %})
* [Metadata]({% slug metadata_upload_widget %})

For more runnable examples on the Kendo UI Upload widget, browse its [**How To** documentation folder]({% slug howto_remove_files_with_errors %}).
