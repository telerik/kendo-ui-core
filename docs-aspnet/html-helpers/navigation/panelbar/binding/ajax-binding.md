---
title:  Ajax Binding
page_title: Ajax Data Binding
description: "Learn how to implement Ajax Binding with Telerik UI PanelBar component for {{ site.framework }}."
slug: htmlhelpers_panelbar_ajaxbinding_aspnetcore
position: 4
---

# Ajax Data Binding

The PanelBar provides support for remote data binding by using a `DataSource` configuration object. 

When using remote data binding, the PanelBar implements lazy loading for hierarchical data. When an item is expanded, its child items are requested from the server through an additional Read request. The `id` of the expanded item is sent as a parameter in the Read request, allowing the server to filter and return only the relevant child items back to the PanelBar. This approach ensures optimal performance by loading data on-demand as users navigate through the hierarchy.

The following example shows how to configure the `DataSource` of the PanelBar for remote data binding.

```HtmlHelper
@(Html.Kendo().PanelBar()
    .Name("panelbar")
    .DataTextField("Name")
    .DataSource(dataSource => dataSource
        .Read(read => read
            .Action("Read_PanelBarData", "Home")
        )
    )
)
```
{% if site.core %}
```TagHelper
<kendo-panelbar name="panelbar" datatextfield="Name">
    <hierarchical-datasource>
        <transport>
            <read url="@Url.Action("Read_PanelBarData", "Home")" />
        </transport>
    </hierarchical-datasource>
</kendo-panelbar>
```
```C# Controller
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

public IActionResult Read_PanelBarData(int? id)
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
{% else %}
```C# Controller
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

public ActionResult Read_PanelBarData(int? id)
{
    var result = GetHierarchicalData()
        .Where(x => id.HasValue ? x.ParentID == id : x.ParentID == null)
        .Select(item => new {
            id = item.ID,
            Name = item.Name,
            hasChildren = item.HasChildren
        });

    return Json(result, JsonRequestBehavior.AllowGet);
}
```
{% endif %}

## See Also

* [Remote Data Binding by the PanelBar for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/panelbar/remote-data-binding)
* [Server-Side API of the PanelBar HtmlHelper](/api/panelbar)
{% if site.core %}
* [Server-Side API of the PanelBar TagHelper](/api/taghelpers/panelbar)
{% endif %}
