---
title: Overview
page_title: Overview
description: "The Telerik UI TreeView component for {{ site.framework }} displays items in a tree-shape hierarchy, supports local and remote data binding, and provides templates for easier customization."
previous_url: /helpers/html-helpers/treeview, /helpers/navigation/treeview/overview
slug: htmlhelpers_treeview_aspnetcore
position: 0
---

# {{ site.framework }} TreeView Overview

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
        .Items(items =>
        {
            items.Add().Text("Item 1").Expanded(true)
            .Items(subItems =>
            {
                subItems.Add().Text("Item 1.1");
                subItems.Add().Text("Item 1.2");
                subItems.Add().Text("Item 1.3");
            });

            items.Add().Text("Item 2")
            .Items(subItems =>
            {
                subItems.Add().Text("Item 2.1");
                subItems.Add().Text("Item 2.2");
                subItems.Add().Text("Item 2.3");
            });

            items.Add().Text("Item 3");
        })
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

	<kendo-treeview name="treeview">
		<items>
			<treeview-item expanded="true" text="Item 1">
				<items>
                    <treeview-item text="Item 1.1"></treeview-item>
                    <treeview-item text="Item 1.2"></treeview-item>
                    <treeview-item text="Item 1.3"></treeview-item>
                </items>
			</treeview-item>
			<treeview-item text="Item 2">
				<items>
                    <treeview-item text="Item 2.1"></treeview-item>
                    <treeview-item text="Item 2.2"></treeview-item>
                    <treeview-item text="Item 2.3"></treeview-item>
                </items>
			</treeview-item>
			<treeview-item text="Item 3"></treeview-item>
		</items>
	</kendo-treeview>
```
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
{% else %}
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

public ActionResult Read_TreeViewData(int? id)
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

    return Json(result, JsonRequestBehavior.AllowGet);
}
```
{% endif %}

> Do not use the names of the [`kendo.data.Node` fields and methods](https://docs.telerik.com/kendo-ui/api/javascript/data/node) (for example, `children`) as fields in the TreeView data.

## Basic Configuration

The following example demonstrates how to configure the TreeView to bind to remote data and access the TreeView instance.

```HtmlHelper
    @(Html.Kendo().TreeView()
        .Name("treeview")
        .DragAndDrop(true)
        .DataTextField("Name")
        .DataSource(dataSource => dataSource
            .Read(read => read
                .Action("ReadItems", "TreeView")
            )
        )
    )

    <script type="text/javascript">
        $(function () {
            // Select the TreeView element by using its "Name()" to get the client-side instance.
            var treeview = $("#treeview").data("kendoTreeView");
            console.log(treeview);
        });
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-treeview name="treeview" drag-and-drop="true" datatextfield="Name">
        <hierarchical-datasource>
            <transport>
                <read url="@Url.Action("ReadItems", "Treeview")"/>
            </transport>
            <schema>
                <hierarchical-model id="id"></hierarchical-model>
            </schema>
        </hierarchical-datasource>
    </kendo-treeview>

    <script type="text/javascript">
        $(function () {
            // Select the TreeView element by using its "Name()" to get the client-side instance.
            var treeview = $("#treeview").data("kendoTreeView");
            console.log(treeview);
        });
    </script>
```
```Controller
    public List<HierarchicalViewModel> GetHierarchicalData()
    {
        var data = new List<HierarchicalViewModel>()
        {
            new HierarchicalViewModel() { ID = 1, ParendID = null, HasChildren = true, Name = "Parent item" },
            new HierarchicalViewModel() { ID = 2, ParendID = 1, HasChildren = true, Name = "Item 1" },
            new HierarchicalViewModel() { ID = 3, ParendID = 1, HasChildren = false, Name = "Item 2" },
            new HierarchicalViewModel() { ID = 4, ParendID = 2, HasChildren = false, Name = "Item 1.1" },
            new HierarchicalViewModel() { ID = 5, ParendID = 2, HasChildren = false, Name = "Item 1.2" }
        };
        return data;
    }

    public JsonResult ReadItems(int? id)
    {
        var result = GetHierarchicalData()
        .Where(x => id.HasValue ? x.ParendID == id : x.ParendID == null)
        .Select(item => new {
            id = item.ID,
            Name = item.Name,
            hasChildren = item.HasChildren
        });

        return Json(result);
    }
```
{% else %}
```Controller
    public List<HierarchicalViewModel> GetHierarchicalData()
    {
        var data = new List<HierarchicalViewModel>()
        {
            new HierarchicalViewModel() { ID = 1, ParendID = null, HasChildren = true, Name = "Parent item" },
            new HierarchicalViewModel() { ID = 2, ParendID = 1, HasChildren = true, Name = "Item 1" },
            new HierarchicalViewModel() { ID = 3, ParendID = 1, HasChildren = false, Name = "Item 2" },
            new HierarchicalViewModel() { ID = 4, ParendID = 2, HasChildren = false, Name = "Item 1.1" },
            new HierarchicalViewModel() { ID = 5, ParendID = 2, HasChildren = false, Name = "Item 1.2" }
        };
        return data;
    }

    public JsonResult ReadItems(int? id)
    {
        var result = GetHierarchicalData()
        .Where(x => id.HasValue ? x.ParendID == id : x.ParendID == null)
        .Select(item => new {
            id = item.ID,
            Name = item.Name,
            hasChildren = item.HasChildren
        });

        return Json(result, JsonRequestBehavior.AllowGet);
    }
```
{% endif %}

> Do not use the names of the [`kendo.data.Node` fields and methods](https://docs.telerik.com/kendo-ui/api/javascript/data/node) (for example, `children`) as fields in the TreeView data.

## Functionality and Features

|Feature|Description|
|------|------|
| [Data Binding]({% slug htmlhelpers_treeview_binding_aspnetcore%})| Explore the available data-binding approaches of the TreeView. |
| [Animations]({% slug htmlhelpers_treeview_animations_aspnetcore %})| Configure different animation effects when expanding or collapsing the TreeView nodes. |
| [Appearance]({% slug appearance_treeview %})| The TreeView has built-in styling options that allow you to customize its appearance. |
| [Items]({% slug htmlhelpers_treeview_items_aspnetcore %})| Set up the TreeView by adding items within the helper declaration. |
| [Images]({% slug htmlhelpers_treeview_images %})| Enhance the TreeView items by adding images or sprites. |
| [Drag and Drop]({% slug htmlhelpers_treeview_drag_drop_aspnetcore %})| Enable the drag-and-drop feature of the component. |
| [Checkboxes]({% slug htmlhelpers_treeview_checkboxes_aspnetcore %})| Render the TreeView items with checkboxes.  |
| [Templates]({% slug htmlhelpers_treeview_templates_aspnetcore %})| To take full control over the rendering of the TreeView items, use templates. |
| [Events]({% slug events_treeview_aspnetcore %})| The component exposes various events that allow you to respond to user actions. |
| [Accessibility]({% slug htmlhelpers_treeview_accessibility %})| The TreeView is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support. |

## Next Steps

* [Getting Started with the TreeView]({% slug aspnetcore_treeview_getting_started %})
* [Basic Usage of the TreeView HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/treeview/basic-usage)
{% if site.core %}
* [Basic Usage of the TreeView TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/treeview/tag-helper)
* [TreeView in Razor Pages]({% slug htmlhelpers_pager_razorpage_aspnetcore %})
{% endif %}

## See Also

* [Using the API of the TreeView for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/treeview/api)
* [Knowledge Base Section](/knowledge-base)
