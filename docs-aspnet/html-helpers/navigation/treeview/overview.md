---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI TreeView component for {{ site.framework }}."
previous_url: /helpers/html-helpers/treeview, /helpers/navigation/treeview/overview
slug: htmlhelpers_treeview_aspnetcore
position: 1
---

# TreeView Overview

{% if site.core %}
The Telerik UI TreeView TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI TreeView widget.
{% else %}
The Telerik UI TreeView HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI TreeView widget.
{% endif %}

The TreeView displays hierarchical data in a traditional tree structure.

* [Demo page for the TreeView HtmlHelper](https://demos.telerik.com/{{ site.platform }}/treeview/index)
{% if site.core %}
* [Demo page for the TreeView TagHelper](https://demos.telerik.com/aspnet-core/treeview/tag-helper)
{% endif %}

## Initializing the TreeView

The following example demonstrates how to define the TreeView.

```HtmlHelper
@(Html.Kendo().TreeView()
    .Name("treeview")
    .DataTextField("Name")
    .DataSource(dataSource => dataSource
        .Read(read => read
            .Action("Read_TreeViewData", "TreeView")
        )
    )
)
```
{% if site.core %}
```TagHelper
    <kendo-treeview name="treeView1">
    </kendo-treeview>
```
{% endif %}
```Controller
public static IList<HierarchicalViewModel> GetHierarchicalData()
{
    var result = new List<HierarchicalViewModel>()
    {
        new HierarchicalViewModel() { ID = 1, ParendID = null, HasChildren = true, Name = "Parent item" },
        new HierarchicalViewModel() { ID = 2, ParendID = 1, HasChildren = true, Name = "Parent item" },
        new HierarchicalViewModel() { ID = 3, ParendID = 1, HasChildren = false, Name = "Item" },
        new HierarchicalViewModel() { ID = 4, ParendID = 2, HasChildren = false, Name = "Item" },
        new HierarchicalViewModel() { ID = 5, ParendID = 2, HasChildren = false, Name = "Item" }
    };

    return result;
}

public IActionResult Read_TreeViewData(int? id)
{
    var result = GetHierarchicalData()
        .Where(x => id.HasValue ? x.ParendID == id : x.ParendID == null)
        .Select(item => new {
            id = item.ID,
            Name = item.Name,
            expanded = item.Expanded,
            imageUrl = item.ImageUrl,
            hasChildren = item.HasChildren
        });

    return Json(result);
}
```

## Basic Configuration

The following example demonstrates the basic configuration of the TreeView HtmlHelper and how to get the TreeView instance.

```HtmlHelper
    @(Html.Kendo().TreeView()
        .Name("treeview")
        .Checkboxes(true)
        .DragAndDrop(true)
        .DataTextField("Name")
        .DataSource(dataSource => dataSource
            .Read(read => read
                .Action("Employees", "TreeView")
            )
        )
    )

    <script type="text/javascript">
        $(function () {
            // The Name() of the TreeView is used to get its client-side instance.
            var treeview = $("#treeview").data("kendoTreeView");
            console.log(treeview);
        });
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-treeview name="treeview2" datatextfield="FullName">
        <hierarchical-datasource>
            <transport>
                <read url="https://demos.telerik.com/kendo-ui/service/Employees" datatype="jsonp" />
            </transport>
            <schema type="json">
                <hierarchical-model id="EmployeeId" has-children="HasEmployees">
                </hierarchical-model>
            </schema>
        </hierarchical-datasource>
    </kendo-treeview>
```
```TagHelper-items
    <kendo-treeview name="treeView1">
        <items>
            <treeview-item text="Web Site" expanded="true" sprite-css-class="folder">
                <items>
                    <treeview-item text="images" expanded="true" sprite-css-class="folder">
                        <items>
                            <treeview-item text="logo.png" sprite-css-class="image"></treeview-item>
                        </items>
                    </treeview-item>
                    <treeview-item text="resources" expanded="true" sprite-css-class="folder">
                        <items>
                            <treeview-item text="pdf" expanded="true" sprite-css-class="folder">
                                <items>
                                    <treeview-item text="prices.pdf" sprite-css-class="pdf"></treeview-item>
                                </items>
                            </treeview-item>
                        </items>
                    </treeview-item>
                    <treeview-item text="index.html" sprite-css-class="html"></treeview-item>
                </items>
            </treeview-item>
        </items>
    </kendo-treeview>
```
{% endif %}

## Functionality and Features

* [Data binding]({% slug htmlhelpers_treeview_binding_aspnetcore %})
* [Items]({% slug htmlhelpers_treeview_items_aspnetcore %})
* [Dragging and dropping]({% slug htmlhelpers_treeview_drag_drop_aspnetcore %})
* [Checkboxes]({% slug htmlhelpers_treeview_checkboxes_aspnetcore %})

## Events

The following example demonstrates the available TreeView events and how an event handler could be implemented for each of them. For a complete example on basic TreeView events, refer to the [demo on using the events of the TreeView](https://demos.telerik.com/{{ site.platform }}/treeview/events).

```HtmlHelper
    @(Html.Kendo().TreeView()
        .Name("treeview")
        .DataTextField("Name")
        .Checkboxes(true)
        .DragAndDrop(true)
        .DataSource(dataSource => dataSource
            .Read(read => read
                .Action("Employees", "TreeView")
            )
        )
        .Events(events => eventsChange("onChange")
            .Select("onSelect")
            .Check("onCheck")
            .Collapse("onCollapse")
            .Expand("onExpand")
            .DragStart("onDragStart")
            .Drag("onDrag")
            .DragEnd("onDragEnd")
            .Drop("onDrop")
        )
    )

    <script type="text/javascript">
        function onChange(e) {
            console.log('Selected node changed to:', e.sender.select());
        }

        function onSelect(e) {
            console.log('Selected node:', e.node);
        }

        function onCheck(e) {
            console.log('Checked node:', e.node);
        }

        function onCollapse(e) {
            console.log('Collapsed node:', e.node);
        }

        function onExpand(e) {
            console.log('Expanded node:', e.node);
        }

        function onDragStart(e) {
            console.log('Started dragging:', e.sourceNode);
        }

        function onDrag(e) {
            console.log("Dragging:", e.sourceNode);
        }

        function onDragEnd(e) {
            console.log("Finished dragging:", e.sourceNode);
        }

        function onDrop(e) {
            console.log("Dropped:", e.sourceNode);
        }
    </script>
```

## See Also

* [Basic Usage of the TreeView HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/treeview/index)
{% if site.core %}
* [Basic Usage of the TreeView TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/treeview/tag-helper)
{% endif %}
* [Using the API of the TreeView HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/treeview/api)
* [Telerik UI for {{site.framework}} DataSource configuration]({% slug htmlhelpers_datasource_aspnetcore %})
* [Server-Side API](/api/treeview)
