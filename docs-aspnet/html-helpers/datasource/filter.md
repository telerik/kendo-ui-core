---
title: Filtering
page_title: DataSource Filtering
description: "Learn how to set the initial filter options in the DataSource component for {{ site.framework }}."
slug: htmlhelper_datasourcefilter
---

# Filters

To request filtered data on initial load, configure the filters with the [`FilterDescriptorFactory`](/api/Kendo.Mvc.UI.Fluent/DataSourceFilterDescriptorFactory). The `ToDataSourceResult()` extension method will return only the filtered data in the response object.

* The `Filter` method sets the initial filters.

```HtmlHelper
    @(Html.Kendo().DataSource<ProductViewModel>()
        .Name("myDataSource")
        .Ajax(datasource => datasource
            .Read(read => read.Action("Products_Read", "Home"))
            .Filter(filters =>
            {
                //Show products whose ProductName property contains a "C".
                filters.Add(product => product.ProductName).Contains("C");
                //Show products whose UnitsInStock is greater than 10.
                filters.Add(product => product.UnitsInStock).IsGreaterThan(10);
            })
        )
    )
```
{% if site.core %}
```TagHelper
    @{
        var filterValue = "C";
    }

    <kendo-datasource name="myDataSource" type="DataSourceTagHelperType.Ajax">
        <transport>
            <read url="@Url.Action("Products_Read", "Home")"/>
        </transport>
        <filters>
            <datasource-filter logic="and">
                <filters>
                    <datasource-filter field="ProductName" operator="contains" value="@filterValue"></datasource-filter>
                    <datasource-filter field="UnitsInStock" operator="gt" value="10"></datasource-filter>
                </filters>
            </datasource-filter>
        </filters>
    </kendo-datasource>
```
{% endif %}

## See Also

* [Server-Side API](/api/datasource)
