---
title: Drag and Drop
page_title: File Drag and Drop | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn about the file drag and drop functionality of the Kendo UI Upload HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_upload_drag_drop_aspnetcore
position: 4
---

# Drag and Drop

Users can select files by dropping them over the Kendo UI Upload.

Custom drop zones can also be initialized depending on a particular selector that provides the upload of a file through the drag-and-drop functionality.

> **Important**
>
> The drag-and-drop functionality is available only in the [asynchronous mode]({% slug htmlhelpers_upload_modes_of_operation_aspnetcore %}#asynchronous-mode).

## Drag Drop on File Upload

To use the Kendo UI Upload as a drop zone:

1. Drag a file over the browser window for the drop zone to appear.
2. When you pass the mouse over the drop zone, it gets highlighted.
3. Release the file over the drop zone to add it to the upload queue.

## Custom Drop Zones

Custom drop zones can be initialized depending on a particular selector that provides the upload of a file through the drag-and-drop functionality.

###### Example

```
<div class="dropZoneElement" style="height: 200px; width: 200px; border: 1px solid red;">
</div>

@(Html.Kendo().Upload()
    .Name("files")
    .Async(a => a
        .Save("Save", "Upload")
        .Remove("Remove", "Upload")
        .AutoUpload(true)
    )
    .DropZone(".dropZoneElement")
)
```

To customize the appearance of the drop zone during the process of dragging and dropping, note the following:

1. When the user drags the file over the browser window, the custom drop zone element receives the `"k-dropzone-active"` class.
2. When the user drags the files over the drop zone itself, the element receives an additional `"k-dropzone-hovered"` class and the drop zone is highlighted.
3. Once the file is released over the drop zone, it is added to the upload queue.

## Drop Zone Visibility

By default, the drop zone is not visible.

The following example demonstrates how to override the default drop zone&mdash;when the Kendo UI Upload itself is used as a drop zone&mdash;by applying CSS rules.

###### Example

    div.k-dropzone {
        border: 1px solid #c5c5c5; /* For Default; Different for each theme */
    }

    div.k-dropzone em {
        visibility: visible;
    }

The following example demonstrates how to customize the appearance of the drop zone during the process of dragging and dropping.

###### Example

    div.k-dropzone {
        border: 1px solid red;
    }

    .customDropZone.k-dropzone-active {
        border: 1px solid yellow;
    }
    .customDropZone.k-dropzone-active.k-dropzone-hovered {
        border: 1px solid green;
    }

## See Also

* [Overview of Upload HtmlHelper]({% slug htmlhelpers_upload_aspnetcore %})
* [Upload Modes of Operation]({% slug htmlhelpers_upload_modes_of_operation_aspnetcore %})
* [Chunk Upload]({% slug htmlhelpers_upload_chunks_aspnetcore %})
* [Validation]({% slug htmlhelpers_upload_validation_aspnetcore %})
* [Send Receive Metadata]({% slug htmlhelpers_upload_send_meta_aspnetcore %})
* [Identify Files]({% slug htmlhelpers_upload_identify_files_aspnetcore %})
* [JavaScript API Reference of the Upload](http://docs.telerik.com/kendo-ui/api/javascript/ui/upload)
* [Upload HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/upload/overview)
* [Upload Official Demos](http://demos.telerik.com/aspnet-core/upload/index)
