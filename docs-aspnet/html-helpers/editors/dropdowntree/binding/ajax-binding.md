---
title:  Ajax Binding
page_title: Ajax Binding
description: "Learn how to implement Ajax Binding with Telerik UI DropDownTree component for {{ site.framework }}."
previous_url: /helpers/editors/dropdowntree/ajax-binding
slug: htmlhelpers_dropdowntree_ajaxbinding_aspnetcore
position: 2
---

# Ajax Data Binding

The DropDownTree provides support for remote data binding by using a `DataSource` configuration object.

```HtmlHelper
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
{% if site.core %}
```TagHelper
    <kendo-dropdowntree datatextfield="Name" datavaluefield="id" name="dropdowntree" >
        <hierarchical-datasource>
            <schema>
                <hierarchical-model id="id"></hierarchical-model>
            </schema>
            <transport>
                <read url="@Url.Action("Remote_DropDownTreeData", "Home")" />
            </transport>
        </hierarchical-datasource>
    </kendo-dropdowntree>
```
{% endif %}
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

## See Also

* [Local Data Binding by the DropDownTree HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/dropdowntree/local-data-binding)
* [Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdowntree)
* [Server-Side API](/api/dropdowntree)
