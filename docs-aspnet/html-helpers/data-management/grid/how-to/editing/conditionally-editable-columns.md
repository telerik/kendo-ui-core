---
title: Make Columns Editable Conditionally
page_title: Make Columns Editable Conditionally
description: "Learn how to configure the Grid for ASP.NET MVC columns to be editable based on condition."
previous_url: /helpers/data-management/grid/how-to/editing/conditionally-editable-columns
slug: howto_conditionallyeditablecolumns_gridaspnetmv
---

# Make Columns Editable Conditionally

The columns in the Kendo UI Grid for ASP.NET MVC feature the `Editable` property that accepts a JavaScript function name.

By default, the current `dataItem` is passed to the JavaScript method as an argument. You can use this configuration to access the values from the Model.

To enable this functionality, follow the steps and refer to the examples below. They demonstrate how to make a column editable depending on a value in the Model.

1. Add the `Editable` property for a Grid column and specify the name of the JavaScript method.

    ```
        @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(p => p.ProductName).Editable("productNameEditable");
            columns.Bound(p => p.UnitPrice).Width(120);
            columns.Bound(p => p.UnitsInStock).Width(120);
            columns.Bound(p => p.Discontinued).Width(120);
        })
        .DataSource(dataSource => dataSource
            .Ajax()
            .Model(model => model.Id(p => p.ProductID))
            // ...
        )
        // settings omitted for brevity
        )

    ```

2. Add logic to the JavaScript function which will determine that the column is editable.

    ```
        <script>
            function productNameEditable(dataItem) {
                // do not allow editing for product with ProductID=3
                return dataItem.ProductID != 3;
            }
        </script>
    ```

## See Also

* [Overview of the Grid HtmlHelper]({% slug htmlhelpers_grid_aspnetcore_overview %})
* [GridBuilder API Reference](https://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/GridBuilder)
