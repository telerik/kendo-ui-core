---
title: Sorting
page_title: DataSource Sorting
description: "Learn how to set the initial sort options in the DataSource HtmlHelper for {{ site.framework }}."
slug: htmlhelper_datasourcesort
---

# Sorting

To request sorted data on initial load, configure the sort options in the `DataSourceSortDescriptorFactory`. The `ToDataSourceResult()` extension method will return only the sorted data in the response object.

* The `Sort` method sets the initial sorts.

        .Ajax()
        .Read(read => read.Action("Products_Read", "Home"))
        .Sort(sort =>
        {
            //Sort by the UnitsInStock in descending order.
            sort.Add(product => product.UnitsInStock).Descending();
            // Then sort by the ProductName in ascending order.
            sort.Add(product => product.ProductName);
        })

## See Also

* [Server-Side API](/api/datasource)
