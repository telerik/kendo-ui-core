---
title: Identify Files When Uploading
page_title: Identify Files | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn how to identify the file, that is being uploaded wth the Kendo UI Upload HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_upload_identify_files_aspnetcore
position: 5
---

# Identify Files When Uploading

The internal implementation of the Upload widget allows you to identify which is the file object, that is being uploaded to the remote endpoint.

## Identify Files

Regardless of the mode of operation, a unique identifier (`uid`) is generated for each file. In the case of a synchronous or asynchronous upload with the [batch option](https://docs.telerik.com/kendo-ui/api/javascript/ui/upload/configuration/async.batch) enabled, the single `uid` that is generated, stands for the whole batch of files, selected at the same time. In the case of asynchronous upload with the batch option disabled, a `uid` is generated for each separate file.

The generated `uid` is added to all the below events as a property of the `e.files` collection:

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

* [Overview of Upload HtmlHelper]({% slug htmlhelpers_upload_aspnetcore %})
* [Upload Modes of Operation]({% slug htmlhelpers_upload_modes_of_operation_aspnetcore %})
* [Drag and Drop]({% slug htmlhelpers_upload_drag_drop_aspnetcore %})
* [Chunk Upload]({% slug htmlhelpers_upload_chunks_aspnetcore %})
* [Validation]({% slug htmlhelpers_upload_validation_aspnetcore %})
* [Send Receive Metadata]({% slug htmlhelpers_upload_send_meta_aspnetcore %})
* [JavaScript API Reference of the Upload](http://docs.telerik.com/kendo-ui/api/javascript/ui/upload)
* [Upload HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/upload/overview)
* [Upload Official Demos](http://demos.telerik.com/aspnet-core/upload/index)
