---
title: Dragging and Dropping
page_title: TreeView Drag and Drop
description: "Learn about the drag-and-drop functionality of the Telerik UI TreeView component for {{ site.framework }}."
slug: htmlhelpers_treeview_drag_drop_aspnetcore
position: 5
---

# TreeView Drag and Drop

When the drag-and-drop feature is enabled, the nodes of the TreeView can be dragged and dropped across all levels.

The functionality also features tooltips that help users indicate where the node will be dropped.

The following example demonstrates how to enable the drag-and-drop functionality for the TreeView nodes.

```HtmlHelper
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
```
{% if site.core %}
```TagHelper
    <kendo-treeview auto-bind="true" drag-and-drop="true" datatextfield="Name" load-on-demand="true" name="treeview">
        <hierarchical-datasource>
            <schema>
                <hierarchical-model id="id"></hierarchical-model>
            </schema>
            <transport>
                <read url="@Url.Action("Employees", "TreeView")"/>
            </transport>
        </hierarchical-datasource>
    </kendo-treeview>
```
{% endif %}


## See Also

* [Dragging and Dropping in the TreeView HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/treeview/dragdrop)
* [Server-Side API](/api/treeview)
