---
title: Aggregates
page_title: Aggregates
description: "Learn how to set the aggregate options in the DataSource component for {{ site.framework }}."
slug: htmlhelper_datasourceaggregates
---

# Aggregates

To make aggregates available on the client, configure them in the [`DataSourceAggregatesFactory`](/api/Kendo.Mvc.UI.Fluent/DataSourceAggregatesFactory). By using the `ToDataSourceResult()` extension method on the server, the results will be sent in the response object and can be used in group headers, footers or other client-side templates.

* The `Aggregates` method sets the aggregates.

```HtmlHelper
    @(Html.Kendo().DataSource<ProductViewModel>()
        .Name("dataSource1")
        .Ajax(dataSource => dataSource
            .PageSize(10)
            .Read(read => read.Action("Products_Read", "Home"))
            .Aggregates(aggregates =>
            {
                aggregates.Add(product => product.UnitsInStock).Min().Max().Count();
                aggregates.Add(product => product.UnitsOnOrder).Average();
                aggregates.Add(product => product.ProductName).Count();
                aggregates.Add(product => product.UnitPrice).Sum();
            })
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-datasource name="dataSource1" type="DataSourceTagHelperType.Ajax" page-size="10">
        <transport>
            <read url="@Url.Action("Products_Read", "Home")" />
        </transport>
        <aggregates>
            <aggregate field="UnitsInStock" aggregate="min,max,count" />
            <aggregate field="UnitsOnOrder" aggregate="average"/>
            <aggregate field="ProductName" aggregate="count"/>
            <aggregate field="UnitPrice" aggregate="sum"/>
        </aggregates>
    </kendo-datasource>
```
{% endif %}

## See Also

* [Server-Side API](/api/datasource)
