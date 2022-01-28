---
title: File Identification
page_title: File Identification
description: "Learn how to identify the file, that is being uploaded with the Telerik UI Upload HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_upload_identify_files_aspnetcore
position: 5
---

# File Identification

The internal implementation of the Upload widget allows you to identify which is the file object which is in the process of uploading to the remote endpoint.

Regardless of the mode of operation, the Upload generates a unique identifier (`uid`) for each file. When the Upload is in a synchronous or asynchronous mode with its `batch` option enabled, the single `uid` that is generated stands for the whole batch of files which were selected at the same time. If the Upload is in an asynchronous mode with its `batch` option disabled, the Upload generates a `uid` for each separate file.

The generated `uid` is added as a property of the `e.files` collection to all of the following events:

* `cancel`
* `error`
* `progress`
* `remove`
* `select`
* `upload`

```
@(Html.Kendo().Upload()
    .Name("files")
    .Async(a => a
        .Save("Save", "Upload")
        .Remove("Remove", "Upload")
        .AutoUpload(true)
    )
    .Events(events => events
        .Select("onSelect")
    )
)

<script type="text/javascript">
    function onSelect(e) {
        console.log("Selected files uids :: [ " + getFileInfo(e) + " ]");
    }

    function getFileInfo(e) {
        return $.map(e.files, function(file) {
            var info = file.uid;

            return info;
        }).join(", ");
    }
</script>
```

## See Also

* [Server-Side API](/api/upload)
