---
title: Dragging and Dropping
page_title: TreeView Drag and Drop | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn about the drag and drop functionality of the Kendo UI TreeView HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_treeview_drag_drop_aspnetcore
position: 4
---

# TreeView Drag and Drop

When the drag-and-drop feature is enabled, the nodes of the TreeView can be dragged and dropped across all levels.

The functionality also features tooltips that help users indicate where the node will be dropped.

The following example demonstrates how to enable the drag-and-drop functionality for the TreeView nodes.

###### Example

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

* [Overview of TreeView HTML Helper]({% slug htmlhelpers_treeview_aspnetcore %})
* [Binding TreeView HTML Helper]({% slug htmlhelpers_treeview_binding_aspnetcore %})
* [TreeView HTML Helper Item Properties]({% slug htmlhelpers_treeview_items_aspnetcore %})
* [Checkboxes Functionality of the TreeView HTML Helper]({% slug htmlhelpers_treeview_checkboxes_aspnetcore %})
