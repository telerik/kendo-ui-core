---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI DropDownTree HtmlHelper for {{ site.framework }}."
previous_url: /helpers/html-helpers/dropdowntree, /helpers/editors/dropdowntree/overview
slug: htmlhelpers_dropdowntree_aspnetcore
position: 1
---

# DropDownTree HtmlHelper Overview

The Telerik UI DropDownTree HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI DropDownTree widget.

The DropDownTree represents an editor of hierarchical data, rendered in a tree-like structure, which provides multiple selection option and custom nodes.

* [Demo page for the DropDownTree](https://demos.telerik.com/{{ site.platform }}/dropdowntree/index)

## Initializing the DropDownTree

The following example demonstrates how to define the DropDownTree by using the DropDownTree HtmlHelper.

```Razor
@(Html.Kendo().DropDownTree()
    .Name("dropdowntree")
    .DataTextField("Name")
    .DataValueField("id")
    .DataSource(dataSource => dataSource
        .Read(read => read
            .Action("Read_DropDownTreeData", "Home")
        )
    )
)
```
```Controller
public static IList<HierarchicalViewModel> GetHierarchicalData()
{
    var result = new List<HierarchicalViewModel>()
    {
        new HierarchicalViewModel() { ID = 1, ParentID = null, HasChildren = true, Name = "Parent item" },
        new HierarchicalViewModel() { ID = 2, ParentID = 1, HasChildren = true, Name = "Parent item" },
        new HierarchicalViewModel() { ID = 3, ParentID = 1, HasChildren = false, Name = "Item" },
        new HierarchicalViewModel() { ID = 4, ParentID = 2, HasChildren = false, Name = "Item" },
        new HierarchicalViewModel() { ID = 5, ParentID = 2, HasChildren = false, Name = "Item" }
    };

    return result;
}

public IActionResult Read_DropDownTreeData(int? id)
{
    var result = GetHierarchicalData()
        .Where(x => id.HasValue ? x.ParentID == id : x.ParentID == null)
        .Select(item => new {
            id = item.ID,
            Name = item.Name,
            hasChildren = item.HasChildren
        });

    return Json(result);
}
```

## Basic Configuration

The following example demonstrates the basic configuration of the DropDownTree HtmlHelper.

    @(Html.Kendo().DropDownTree()
        .Name("dropdowntree")
        .Checkboxes(true)
        .Filter(FilterType.Contains)
        .DataTextField("Name")
        .DataTextField("ID")
        .DataSource(dataSource => dataSource
            .Read(read => read
                .Action("Employees", "Home")
            )
        )
    )

## Functionality and Features

* [Data binding]({% slug htmlhelpers_dropdowntree_databinding_aspnetcore %})
* [Checkboxes]({% slug htmlhelpers_dropdowntree_checkboxes_aspnetcore %})
* [Filtering]({% slug htmlhelpers_dropdowntree_filtering_aspnetcore %})
* [Items]({% slug htmlhelpers_dropdowntree_items_aspnetcore %})
* [Templates]({% slug htmlhelpers_dropdowntree_templates_aspnetcore %})
* [Accessibility]({% slug accessibility_aspnetcore_dropdowntree %})

## Events

The following example demonstrates the available DropDownTree events and how an event handler could be implemented for each of them. 

For an example on basic DropDownTree events, refer to the [demo on using the events of the DropDownTree](https://demos.telerik.com/{{ site.platform }}/dropdowntree/events).

    @(Html.Kendo().DropDownTree()
        .Name("dropdowntree")
        .DataTextField("Name")
        .DataSource(dataSource => dataSource
            .Read(read => read
                .Action("Employees", "Home")
            )
        )
        .Events(events => events
            .DataBound("onDataBound")
            .Change("onChange")
            .Select("onSelect")
            .Close("onClose")
            .Open("onOpen")
            .Filtering("onFiltering")
        )
    )

    <script type="text/javascript">

        function onDataBound(e) {
            console.log('DropDownTree instance:', e.sender);
        }

        function onChange(e) {
            console.log('Selected node changed to:', e.sender.select());
        }

        function onSelect(e) {
            console.log('Selected node:', e.node);
        }

        function onClose(e) {
            console.log('DropDownTree instance:', e.sender);
        }

        function onOpen(e) {
            console.log('DropDownTree instance:', e.sender);
        }

        function onFiltering(e) {
            console.log('Folter:', e.filter);
        }
    </script>

## Referencing Existing Instances

To reference an existing DropDownTree instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [DropDownTree client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdowntree#methods) to control its behavior.

```
    // Place the following after your Telerik UI DropDownTree for {{ site.framework }} declaration.
    <script>
        $(document).ready(function() {
            // The Name() of the DropDownTree is used to get its client-side instance.
            var dropdowntree = $("#dropdowntree").data("kendoDropDownTree");
        });
    </script>
```

## See Also

* [Basic Usage of the TreeView HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/treeview/index)
* [Using the API of the TreeView HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/treeview/api)
* [Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdowntree)
* [Server-Side API](/api/treeview)
