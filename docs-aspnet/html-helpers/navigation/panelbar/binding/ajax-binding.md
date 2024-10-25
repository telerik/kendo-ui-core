---
title:  Ajax Binding
page_title: Ajax Binding
description: "Learn how to implement Ajax Binding with Telerik UI PanelBar component for {{ site.framework }}."
slug: htmlhelpers_panelbar_ajaxbinding_aspnetcore
position: 3
---

# Ajax Data Binding

The PanelBar provides support for remote data binding by using a `DataSource` configuration object.

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

* [Local Data Binding by the PanelBar HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/panelbar/local-data-binding)
* [Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/panelbar)
* [Server-Side API](/api/panelbar)
