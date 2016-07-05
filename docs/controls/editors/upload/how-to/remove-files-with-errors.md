---
title: Remove Files with Errors
page_title: Remove Files with Errors | Kendo UI Upload
description: "Learn how to remove files with errors using the Kendo UI Upload widget."
slug: howto_remove_files_with_errors
---

# Remove Files with Errors

This example demonstrates how to remove files, which contain errors and which have not passed the validation, by using the Kendo UI Upload widget.

###### Example

```html
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

Other articles on the Kendo UI Upload:

* [Upload JavaScript API Reference](/api/javascript/ui/upload)
* [Modes of Operation]({% slug modes_upload_widget %})
* [Metadata]({% slug metadata_upload_widget %})

For more runnable examples on the Kendo UI Upload widget, browse its [**How To** documentation folder]({% slug howto_select_additional_metadata_upload %}).
