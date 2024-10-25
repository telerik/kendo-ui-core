---
title: Filtering
page_title: Filtering
description: "Learn about the filtering functionality of the Telerik UI DropDownTree component for {{ site.framework }}."
slug: htmlhelpers_dropdowntree_filtering_aspnetcore
position: 4
---

# Filtering

The built-in filtering functionality enables the user to filter the displayed DropDownTree items by their text value.

By default, filtering is disabled and can be performed over string values using the field set as `DataTextField`.

The DropDownTree supports the following filter values:

* `StartsWith`
* `EndsWith`
* `Contains`

The following example demonstrates how to set the filter of the DropDownTree.

```HtmlHelper
    @(Html.Kendo().DropDownTree()
        .Name("dropdowntree")
        .DataTextField("Name")
        .Filter(FilterType.Contains)
        .DataSource(dataSource => dataSource
            .Read(read => read
                .Action("Read_DropDownTreeData", "Home")
            )
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-dropdowntree datatextfield="Name" datavaluefield="id" filter="FilterType.Contains" name="dropdowntree"  style="width: 100%">
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

## See Also

* [Ajax Data Binding by the DropDownTree HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/dropdowntree/remote-data-binding)
* [Server-Side API](/api/dropdowntree)
