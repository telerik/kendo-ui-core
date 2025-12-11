---
title: Drag and Drop
page_title: Drag and Drop
description: "Understand how the Drag and Drop functionality in the {{ site.product }} FileManager enable you to manage the files"
components: ["filemanager"]
slug: htmlhelpers_filemanager_aspnetcore_dragndrop
position: 4
---

# Drag and Drop Overview

The {{ site.product }} FileManager provides inbuilt Drag and Drop functionality, which allows dragging and dropping files from the FileManager view(GridView, ListView) to the TreeView and vice versa. The functionality is enabled by default and it can be controlled by the `Draggable` option.


The following example demonstrates how to disable the Drag and Drop functionality of the FileManager:

```HtmlHelper
    @(Html.Kendo().FileManager()
        .Name("filemanager")
        .UploadUrl("Upload", "FileManagerData")
        .Draggable(false)
        .DataSource(ds =>
        {
            ds.Read(operation => operation
                .Type(HttpVerbs.Post)
                .Action("Read", "FileManagerData")
            );
            ds.Destroy(operation => operation
                .Type(HttpVerbs.Post)
                .Action("Destroy", "FileManagerData")
            );
            ds.Create(operation => operation
                .Type(HttpVerbs.Post)
                .Action("Create", "FileManagerData")
            );
            ds.Update(operation => operation
                .Type(HttpVerbs.Post)
                .Action("Update", "FileManagerData")
            );
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-filemanager name="filemanager" upload-url="@Url.Action("Upload", "FileManagerData")" draggable="false">
        <filemanager-datasource>
            <transport>
                <read url="@Url.Action("Read", "FileManagerData")" />
                <create url="@Url.Action("Destroy", "FileManagerData")" />
                <destroy url="@Url.Action("Create", "FileManagerData")" />
                <update url="@Url.Action("Update", "FileManagerData")" />
            </transport>
        </filemanager-datasource>
    </kendo-filemanager>
```
{% endif %}


## See Also

* [Overview of {{ site.product }} FileManager]({% slug htmlhelpers_filemanager_aspnetcore_overview %})
* [Preview Panes in {{ site.product }} FileManager]({% slug htmlhelpers_filemanager_aspnetcore_previewpane %})
* [ToolbarCommands in{{ site.product }} FileManager]({% slug htmlhelpers_filemanager_aspnetcore_toolbar %})
