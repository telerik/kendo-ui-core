---
title: Conditionally editable columns
page_title: Conditionally editable columns | Kendo UI Grid HtmlHelper
description: "Configure the Grid for ASP.NET MVC columns to be editable based on condition."
slug: howto_conditionallyeditablecolumns_gridaspnetmv
---

# Make column editable conditionally

The example below demonstrates how to make a column editable depending on a value in the Model.

The columns in the Grid component have `Editable` property that accepts a JavaScript function name. By default the current `dataItem` is passed to the JavaScript method as an argument. You can use it to access the values from the Model.

The steps to enable the functionality are listed below:

**Step 1** Add the Enabled property for a Grid column and specify the name of the JavaScript method


###### Example

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
    // settings ommited for brevity
    )

```


**Step 2** Add logic to the JavaScript function that will determine if the column will be editable

###### Example

```
    <script>
        function productNameEditable(dataItem) {
            // do not allow editing for product with ProductID=3
            return dataItem.ProductID != 3;
        }
    </script>
```


## See Also

* [Overview of the Grid HtmlHelper]({% slug overview_gridhelper_aspnetmvc %})
* [GridBuilder API Reference](/api/Kendo.Mvc.UI.Fluent/GridBuilder)

For more runnable examples on the Kendo UI Grid in ASP.NET MVC applications, browse its [**How To** documentation folder]({% slug howto_applycustomrowstylesbasedondata_gridaspnetmvc %}).
