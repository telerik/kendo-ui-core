---
title: Filtering
page_title: DataSource Filtering
description: "Learn how to set the initial filter options in the DataSource HtmlHelper for {{ site.framework }}."
slug: htmlhelper_datasourcefilter
---

# Filters

To request filtered data on initial load, configure the filters with the [`FilterDescriptorFactory`](/api/Kendo.Mvc.UI.Fluent/DataSourceFilterDescriptorFactory). The `ToDataSourceResult()` extension method will return only the filtered data in the response object.

* The `Filter` method sets the initial filters.

        .Ajax()
        .Read(read => read.Action("Products_Read", "Home"))
        .Filter(filters =>
        {
            //Show products whose ProductName property contains a "C".
            filters.Add(product => product.ProductName).Contains("C");
            //Show products whose UnitsInStock is greater than 10.
            filters.Add(product => product.UnitsInStock).IsGreaterThan(10);
        })

## See Also

* [Server-Side API](/api/datasource)
