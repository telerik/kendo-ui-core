---
title: Remove Files in the Upload with Confirmation Dialog
page_title: Remove Files in the Upload with Confirmation Dialog
description: "Learn how to display a custom confirmation dialog when removing files from the Kendo UI Upload widget."
slug: howto_remove_files_with_confirmation
previous_url: /controls/editors/upload/how-to/remove-files-with-confirmation-dialog
tags: telerik, kendo, jquery, upload, remove, files, using, confirmation, dialog
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

How can I remove files in the Kendo UI Upload by displaying a custom confirmation dialog?

## Solution

The following example demonstrates how to display a custom confirmation dialog by utilizing the [`kendo.confirm()`](/api/javascript/kendo/methods/confirm) method.



```dojo
    <input name="files" id="files" type="file" />

    <script>
      $(document).ready(function() {
         var fileUidToRemove = "";

          $("#files").kendoUpload({
            async: {
              autoUpload: false,
              saveUrl: "save",
              removeUrl: "remove",
              withCredentials: false
            },
            remove: function(e) {
              fileUidToRemove = e.files[0].uid;
              e.preventDefault();

              kendo.confirm("Remove the file?").then(function(){
                $("#files").data("kendoUpload").removeFileByUid(fileUidToRemove);
              });
            }
          });
      });
    </script>
```


## See Also

* [JavaScript API Reference of the Upload](/api/javascript/ui/upload)
* [Modes of Operation]({% slug modes_upload_widget %})
* [Metadata]({% slug metadata_upload_widget %})


