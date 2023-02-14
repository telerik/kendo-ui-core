---
title: Grouping
page_title: DataSource Grouping
description: "Learn how to set the initial group options in the DataSource component for {{ site.framework }}."
slug: htmlhelper_datasourcegroup
---

# Grouping

To request grouped data on initial load, configure the groups in the [`GroupDescriptorFactory`](/api/Kendo.Mvc.UI.Fluent/DataSourceGroupDescriptorFactory). The `ToDataSourceResult()` extension method will return only the grouped data in the response object.

* The `Group` method sets the initial groups.

```HtmlHelper
    @(Html.Kendo().DataSource<ProductViewModel>()
        .Name("myDataSource")
        .Ajax(datasource => datasource
            .Read(read => read.Action("Products_Read", "Home"))
            .Group(groups =>
            {
                groups.Add(product => product.UnitPrice);
                groups.Add(product => product.ProductName);
            })
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-datasource name="myDataSource" type="DataSourceTagHelperType.Ajax">
        <transport>
            <read url="@Url.Action("Products_Read", "Home")"/>
        </transport>
        <groups>
            <group field="UnitPrice" />
            <group field="ProductName" />
        </groups>
    </kendo-datasource>
```
{% endif %}

## See Also

* [Server-Side API](/api/datasource)
