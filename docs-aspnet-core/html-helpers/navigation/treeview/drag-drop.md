---
title: Dragging and Dropping
page_title: TreeView Drag and Drop | Telerik UI TreeView HtmlHelper for ASP.NET Core
description: "Learn about the drag and drop functionality of the Telerik UI TreeView HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_treeview_drag_drop_aspnetcore
position: 4
---

# TreeView Drag and Drop

When the drag-and-drop feature is enabled, the nodes of the TreeView can be dragged and dropped across all levels.

The functionality also features tooltips that help users indicate where the node will be dropped.

The following example demonstrates how to enable the drag-and-drop functionality for the TreeView nodes.

    @(Html.Kendo().TreeView()
        .Name("treeview")
        .DragAndDrop(true)
        .DataTextField("Name")
        .DataSource(dataSource => dataSource
            .Read(read => read
                .Action("Employees", "TreeView")
            )
        )
    )

## See Also

* [Dragging and Dropping in the TreeView HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/treeview/dragdrop)
* [Server-Side API](/api/treeview)
