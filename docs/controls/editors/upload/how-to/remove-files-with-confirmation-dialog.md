---
title: Remove Files with Confirmation Dialog
page_title: Remove Files with Confirmation Dialog | Kendo UI Upload
description: "Learn how to display a custom confirmation dialog when removing files from the Kendo UI Upload widget."
slug: howto_remove_files_with_confirmation
---

# Remove Files with Confirmation Dialog

The example below demonstrates how to display a custom confirmation dialog by utilizing the [`kendo.confirm()`](/api/javascript/kendo#methods-confirm) method.

###### Example

```html
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

* [Upload JavaScript API Reference](/api/javascript/ui/upload)
* [Modes of Operation]({% slug modes_upload_widget %})
* [Metadata]({% slug metadata_upload_widget %})

For more runnable examples on the Kendo UI Upload widget, browse its [**How To** documentation folder]({% slug howto_select_additional_metadata_upload %}).
