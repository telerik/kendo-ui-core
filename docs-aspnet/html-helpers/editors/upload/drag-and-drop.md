---
title: Dragging and Dropping of Files
page_title: Dragging and Dropping of Files
description: "Learn about the file drag and drop functionality of the Telerik UI Upload HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_upload_drag_drop_aspnetcore
position: 4
---

# Dragging and Dropping of Files

Users can select files by dragging and dropping them over the Upload.

You can also initialize custom drop zones depending on a particular selector that provides the upload of a file through the drag-and-drop functionality.

> The drag-and-drop functionality is available only in the [asynchronous mode]({% slug htmlhelpers_upload_modes_of_operation_aspnetcore %}#asynchronous-mode).

## Using the Upload as a Drop Zone

To use the Upload as a drop zone:

1. Drag a file over the browser window for the drop zone to appear. When you pass the mouse over the drop zone, it gets highlighted.
1. Release the file over the drop zone to add it to the upload queue.

## Custom Drop Zones

You can initialize custom drop zones depending on a particular selector that provides the upload of a file through the drag-and-drop functionality.

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

## Visibility of Drop Zones

By default, the drop zone is not visible.

The following example demonstrates how to override the default drop zone&mdash;when the Upload itself is used as a drop zone&mdash;by applying CSS rules.

    div.k-dropzone {
        border: 1px solid #c5c5c5; /* For Default; Different for each theme */
    }

    div.k-dropzone em {
        visibility: visible;
    }

The following example demonstrates how to customize the appearance of the drop zone during the process of dragging and dropping.

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

* [Custom Drop Zones by the Upload HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/upload/customdropzone)
* [Server-Side API](/api/upload)
