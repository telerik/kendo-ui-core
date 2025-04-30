---
title: Display Server Errors in Grid Using Tooltips
page_title: Display Server Errors in Grid Using Tooltips
description: "Display the server-side errors in the {{ site.product }} Grid as tooltips."
previous_url: /helpers/data-management/grid/how-to/editing/grid-handle-server-error, /html-helpers/data-management/grid/how-to/editing/grid-handle-server-error
slug: howto_displayservererrorinatooltip_gridaspnetmvc
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

How can I display the errors received from the server as tooltips when editing the Grid?

## Solution

The solution relies on the following key steps:

1. Define an editable Grid and handle the data validation on the server:

    ```HtmlHelper
    @(Html.Kendo().Grid<OrderViewModel>()
        .Name("grid")
        .Editable(editabel => editabel.Mode(GridEditMode.InLine))
        .DataSource(dataSource => dataSource
            .Ajax()
            .Model(model => model.Id(p => p.OrderID))
            .PageSize(20)
            .Read(read => read.Action("Orders_Read", "Home"))
            .Update(up => up.Action("Orders_Update", "Home"))
        )
        ... // Additional configuration.
    )
    ```
    ```C# HomeController
        public ActionResult Orders_Update([DataSourceRequest] DataSourceRequest request, OrderViewModel order)
        {
            ... // Validation logic.
            if (!isValid)
            {
                ModelState.AddModelError("'" + order.Category.CategoryName + "'", "This is my server error!");
            }
            return Json(new[] { order }.ToDataSourceResult(request, ModelState));
        }
    ```

1. Create a Tooltip:

    ```Razor
    <div id="tooltip" hidden="hidden"></div>

    @(Html.Kendo().Tooltip()
        .For("#tooltip")
        .Position(TooltipPosition.Top)
    )
    ```

1. Handle the `Error` event of the Grid's DataSource to retrieve the returned errors from the server when the Update request fails and display them by using the Tooltip component.

    ```JS
    function err_handler(e) {
        if (e.errors !== undefined) {
            var message = "Errors:\n";
            $.each(e.errors, function (key, value) {
                if ('errors' in value) {
                    $.each(value.errors, function () {
                        message += this + "\n";
                    });
                }
            });

            // Modify the Tooltip settings at runtime.
            tooltip.setOptions({
                autoHide: false,
                content: message
            });
            tooltip.show($("td[data-container-for='Category']")); // Show the Tooltip with the error message.
        }
    }
    ```

To review the complete example, refer to the [project on how to display server error using a Tooltip component](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridHandleServerError).

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
