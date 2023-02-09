---
title: Use the Compact UI Mode of the Upload
page_title: Use Compact UI Mode of the Upload
description: "Learn how to hide the selected files for upload from the user interface and render the button for the upload confirmation only in the Kendo UI Upload widget."
slug: howto_usecompactuimode_upload
previous_url: /controls/editors/upload/how-to/use-compact-mode
tags: telerik, kendo, jquery, upload, use, compact, ui, mode
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

How can I hide the selected files for upload from the user interface and render the button for the upload confirmation only in the Kendo UI Upload?

## Solution

The following example demonstrates how to hide the selected files for upload from the user interface and render only the **Select files** button without additional UI elements in the Upload.



```dojo
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

* [JavaScript API Reference of the Upload](/api/javascript/ui/upload)
* [Modes of Operation]({% slug modes_upload_widget %})
* [Metadata]({% slug metadata_upload_widget %})


