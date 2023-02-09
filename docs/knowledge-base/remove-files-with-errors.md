---
title: Remove Files for Upload with Errors
page_title: Remove Files for Upload with Errors
description: "Learn how to remove files with errors using the Kendo UI Upload widget."
slug: howto_remove_files_with_errors
previous_url: /controls/editors/upload/how-to/remove-files-with-errors
tags: telerik, kendo, jquery, upload, remove, files, for, upload, with, errors
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

How can I remove files from the Kendo UI Upload when file validation fails?

## Solution

The following example demonstrates how to remove files from the Kendo UI Upload when [the upload/remove data operation fails](/api/javascript/ui/upload) due to errors or failing validation.


```dojo
<style>
  html {
	font-size: 12px;
	font-family: Arial, Helvetica, sans-serif;
  }
</style>
<input name="files" id="files" type="file" />
<script>
  function onError(e) {
    var files = e.files;
    for (var i = 0; i < files.length; i++) {
      alert("Validation failed for " + files[i].name);

      var uid = files[i].uid;
      var entry = $(".k-file[data-uid='" + uid + "']");
      if (entry.length > 0) {
        entry.remove();
      }
    }
  }

  $(document).ready(function() {
    $("#files").kendoUpload({
      async: {
        saveUrl: "save",
        removeUrl: "remove",
        autoUpload: true
      },
      error: onError
    });
  });
</script>
```

## See Also

* [JavaScript API Reference of the Upload](/api/javascript/ui/upload)
  * [Upload Error event](api/javascript/ui/upload/events/error)
* [Modes of Operation]({% slug modes_upload_widget %})
* [Metadata]({% slug metadata_upload_widget %})


