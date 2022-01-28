---
title: Grouping
page_title: DataSource Grouping
description: "Learn how to set the initial group options in the DataSource HtmlHelper for {{ site.framework }}."
slug: htmlhelper_datasourcegroup
---

# Grouping

To request grouped data on initial load, configure the groups in the [`GroupDescriptorFactory`](/api/Kendo.Mvc.UI.Fluent/DataSourceGroupDescriptorFactory). The `ToDataSourceResult()` extension method will return only the grouped data in the response object.

* The `Group` method sets the initial groups.

        .Ajax()
        .Read(read => read.Action("Products_Read", "Home"))
        .Group(groups =>
        {
            groups.Add(product => product.UnitPrice);
            groups.Add(product => product.ProductName);
        })

## See Also

* [Server-Side API](/api/datasource)
