---
title: File Identification
page_title: File Identification | Kendo UI Upload HtmlHelper for ASP.NET Core
description: "Learn how to identify the file, that is being uploaded wth the Kendo UI Upload HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_upload_identify_files_aspnetcore
position: 5
---

# File Identification

The internal implementation of the Upload widget allows you to identify which is the file object which is in the process of uploading to the remote endpoint.

Regardless of the mode of operation, the Upload generates a unique identifier (`uid`) for each file. When the Upload is in a synchronous or asynchronous mode with its [`batch`](https://docs.telerik.com/kendo-ui/api/javascript/ui/upload/configuration/async.batch) option enabled, the single `uid` that is generated stands for the whole batch of files which were selected at the same time. If the Upload is in an asynchronous mode with its `batch` option disabled, the Upload generates a `uid` for each separate file.

The generated `uid` is added as a property of the `e.files` collectio to all of the following events:

* [`cancel`](https://docs.telerik.com/kendo-ui/api/javascript/ui/upload/events/cancel)
* [`error`](https://docs.telerik.com/kendo-ui/api/javascript/ui/upload/events/error)
* [`progress`](https://docs.telerik.com/kendo-ui/api/javascript/ui/upload/events/progress)
* [`remove`](https://docs.telerik.com/kendo-ui/api/javascript/ui/upload/events/remove)
* [`select`](https://docs.telerik.com/kendo-ui/api/javascript/ui/upload/events/select)
* [`upload`](https://docs.telerik.com/kendo-ui/api/javascript/ui/upload/events/upload)

###### Example

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

* [Overview of the Upload HtmlHelper]({% slug htmlhelpers_upload_aspnetcore %})
* [Modes of Operation]({% slug htmlhelpers_upload_modes_of_operation_aspnetcore %})
* [Dragging and Dropping of Files]({% slug htmlhelpers_upload_drag_drop_aspnetcore %})
* [Chunk File Upload]({% slug htmlhelpers_upload_chunks_aspnetcore %})
* [File Validation]({% slug htmlhelpers_upload_validation_aspnetcore %})
* [Sending and Receiving of Metadata]({% slug htmlhelpers_upload_send_meta_aspnetcore %})
* [JavaScript API Reference of the Upload](http://docs.telerik.com/kendo-ui/api/javascript/ui/upload)
* [Upload HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/upload/overview)
* [Upload Official Demos](http://demos.telerik.com/aspnet-core/upload/index)
