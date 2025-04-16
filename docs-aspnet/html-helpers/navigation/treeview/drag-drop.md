---
title: Dragging and Dropping
page_title: TreeView Drag and Drop
description: "Learn about the drag-and-drop functionality of the Telerik UI TreeView component for {{ site.framework }}."
slug: htmlhelpers_treeview_drag_drop_aspnetcore
position: 6
---

# Node Click-Move-Click

As of {{site.product}} UI R2 SP1 2023, users can reorder the TreeView's nodes by using the click-move-click functionality. To enable the feature use the [`.DragAndDrop(dd=>dd.ClickMoveClick(true))`](/api/kendo.mvc.ui.fluent/treeviewdraganddropbuilder#clickmoveclicksystemboolean) configuration option. To start moving the node, users can click on it, and then click again to place the node in its new position.

```HtmlHelper
    @(Html.Kendo().TreeView()
        .Name("treeview")
        .DragAndDrop(dd=>dd.ClickMoveClick(true))
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
    <kendo-treeview auto-bind="true" datatextfield="Name" load-on-demand="true" name="treeview">
        <drag-and-drop click-move-click="true"/>
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

# Drag and Drop

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
