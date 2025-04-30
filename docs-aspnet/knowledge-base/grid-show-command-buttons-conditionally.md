---
title: Conditionally Show Column Commands in Grid
page_title: Show Grid Column Commands Conditionally
description: "Learn how to configure the {{ site.product }} Grid to display a specified column command depending on a Model value."
previous_url: /helpers/data-management/grid/how-to/editing/show-command-buttons-conditionally, /html-helpers/data-management/grid/how-to/editing/show-command-buttons-conditionally
slug: howto_showcommandbuttonsconditionally_gridaspnetmv
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
 <tr>
  <td>Product version</td>
  <td>2025.1.227</td>
 </tr>
</table>

## Description

How can I conditionally show a specified column command in the Grid?

## Solution

The column commands support the `Visible` property that accepts a JavaScript function name.

By default, the current `dataItem` is passed to the JavaScript method as an argument. You can use this configuration to access the values of the respective data item.

The following example demonstrates how to show the built-in `Edit` command for the entire row based on the value of the **ProductID** field.

1. Add the `Visible` property to the `Edit` command and specify the name of the JavaScript function.

    ```HtmlHelper
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
                ... // Settings omitted for brevity.
            )
            ... // Settings omitted for brevity.
        )
    ```

1. Add logic in the JavaScript function to determine if the `Edit` command must be displayed.

    ```JS
        <script>
            function editVisible(dataItem) {
            // Hide the "Edit" button for the record with "ProductID" that equals "1".
                return dataItem.ProductID != 1;
            }
        </script>
    ```

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})
* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)
* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})
* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)

## See Also

* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
