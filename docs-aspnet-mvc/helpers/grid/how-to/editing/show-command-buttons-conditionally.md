---
title: Show Command Buttons Conditionally
page_title: Show Command Buttons Conditionally | Kendo UI Grid HtmlHelper
description: "Learn how to configure the Kendo UI Grid for ASP.NET MVC to display a command button depending on a value in the Model."
slug: howto_showcommandbuttonsconditionally_gridaspnetmv
---

# Show Command Buttons Conditionally

The command buttons in the Kendo UI Grid for ASP.NET MVC feature the `Editable` property that accepts a JavaScript function name.

By default, the current `dataItem` is passed to the JavaScript method as an argument. You can use this configuration to access the values from the Model.

To enable this functionality, follow the steps and refer to the examples below. They demonstrate how to show a command button depending on a value in the Model.

1. Add the `Enabled` property for a command and specify the name of the JavaScript method.

    ###### Example

    ```
        @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(p => p.ProductName);
            columns.Bound(p => p.UnitPrice).Width(120);
            columns.Bound(p => p.UnitsInStock).Width(120);
            columns.Bound(p => p.Discontinued).Width(120);
            columns.Command(command =>
            {
                command.Edit().Visible("editVisible");
                command.Destroy();
            }).Width(250);
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

    ###### Example

    ```
        <script>
            function editVisible(dataItem) {
            // hide the Edit button for the item with ProductID=1
            return dataItem.ProductID != 1;
            }
        </script>
    ```

## See Also

* [Overview of the Grid HtmlHelper]({% slug overview_gridhelper_aspnetmvc %})
* [GridBuilder API Reference](/api/Kendo.Mvc.UI.Fluent/GridBuilder)

For more runnable examples on the Kendo UI Grid in ASP.NET MVC applications, browse its [**How To** documentation folder](/helpers/grid/how-to/Appearance/).
