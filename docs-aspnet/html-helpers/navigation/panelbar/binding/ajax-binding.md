---
title:  Ajax Binding
page_title: Ajax Data Binding
description: "Learn how to implement Ajax Binding with Telerik UI PanelBar component for {{ site.framework }}."
components: ["panelbar"]
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

>tip By default, the PanelBar shows an expand icon if the dataItem has a property named `hasChildren` and it evaluates to `true`. You can either ensure data is mapped as demonstrated above, or configure the mapping through the `DataSource` configuration.

```HtmlHelper
    @(Html.Kendo().PanelBar()
        .Name("panelbar")
        .DataTextField("Name")
        .DataSource(dataSource => dataSource
            .Read(read => read
                .Action("Read_PanelBarData", "Home")
            )
            .Model(m=> {
                m.HasChildren("HasNestedItemsField");
            })
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
            <schema>
                <hierarchical-model has-children="HasNestedItemsfield" />
            </schema>
        </hierarchical-datasource>
    </kendo-panelbar>
```
{% endif %}

## Troubleshooting Remote Loading

The PanelBar supports two remote loading scenarios:

* **Remote hierarchical data**&mdash;The `DataSource` sends a `Read` request for the root items and for the children of an expanded item. Inspect the request in the browser developer tools and verify that the response contains the configured text field, the item `id`, the `hasChildren` value, and the children for the requested parent.
* **Remote HTML content**&mdash;The `LoadContentFrom` method or the `content-url` attribute loads HTML into an item when it is expanded. Verify that the content URL returns HTML and that the item's content `<div>` is empty before the request is made. For more information, see [Loading Content with AJAX in the PanelBar](https://docs.telerik.com/kendo-ui/controls/panelbar/content).

For remote hierarchical data, you can customize the loading and retry messages and handle DataSource errors:

```HtmlHelper
@(Html.Kendo().PanelBar()
    .Name("panelbar")
    .Messages(messages => messages
        .Loading("Loading items...")
        .RequestFailed("Request failed.")
        .Retry("Retry")
    )
    .Events(events => events.Error("onError"))
)

<script>
    function onError(e) {
        console.error(e);
    }
</script>
```
{% if site.core %}
```TagHelper
<kendo-panelbar name="panelbar" on-error="onError">
    <messages loading="Loading items..." retry="Retry" />
</kendo-panelbar>

<script>
    function onError(e) {
        console.error(e);
    }
</script>
```
{% endif %}

The `Messages` settings and built-in retry behavior apply to DataSource binding failures. For remote HTML content requests, use the `contentLoad` and `error` events where supported and inspect the network response. The PanelBar `error` event does not fire with jQuery 3.x. For more information, see [PanelBar Data Binding](https://docs.telerik.com/kendo-ui/controls/panelbar/binding) and the [PanelBar API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/panelbar).

## See Also

* [Remote Data Binding by the PanelBar for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/panelbar/remote-data-binding)
* [Server-Side API of the PanelBar HtmlHelper](/api/panelbar)
{% if site.core %}
* [Server-Side API of the PanelBar TagHelper](/api/taghelpers/panelbar)
{% endif %}
