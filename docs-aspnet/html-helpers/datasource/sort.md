---
title: Sorting
page_title: DataSource Sorting
description: "Learn how to set the initial sort options in the DataSource component for {{ site.framework }}."
slug: htmlhelper_datasourcesort
---

# Sorting

To request sorted data on initial load, configure the sort options in the `DataSourceSortDescriptorFactory`. The `ToDataSourceResult()` extension method will return only the sorted data in the response object.

* The `Sort` method sets the initial sorts.

```HtmlHelper
    @(Html.Kendo().DataSource<ProductViewModel>()
        .Name("myDataSource")
        .Ajax(datasource => datasource
            .Read(read => read.Action("Products_Read", "Home"))
            .Sort(sort =>
            {
                //Sort by the UnitsInStock in descending order.
                sort.Add(product => product.UnitsInStock).Descending();
                // Then sort by the ProductName in ascending order.
                sort.Add(product => product.ProductName);
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
        <sorts>
            <sort field="UnitsInStock" direction="desc" />
            <sort field="ProductName" />
        </sorts>
    </kendo-datasource>
```
{% endif %}

## See Also

* [Server-Side API](/api/datasource)
