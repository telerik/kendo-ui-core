---
title: Show Command Buttons conditionally
page_title: Show Command Buttons conditionally | Kendo UI Grid HtmlHelper
description: "Configure the Grid for ASP.NET MVC commands to be displayed conditionally."
slug: howto_showcommandbuttonsconditionally_gridaspnetmv
---

# Show Command Buttons conditionally

The example below demonstrates how to show a command button depending on a value in the Model.

The command buttons in the Grid for ASP.NET MVC have `Editable` property that accepts a JavaScript function name. By default the current `dataItem` is passed to the JavaScript method as an argument. You can use it to access the values from the Model.

The steps to enable the functionality are listed below:

**Step 1** Add the `Enabled` property for a command and specify the name of the JavaScript method


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
    // settings ommited for brevity
    )

```


**Step 2** Add logic to the JavaScript function that will determine if the column will be editable

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

For more runnable examples on the Kendo UI Grid in ASP.NET MVC applications, browse its [**How To** documentation folder]({% slug howto_applycustomrowstylesbasedondata_gridaspnetmvc %}).
