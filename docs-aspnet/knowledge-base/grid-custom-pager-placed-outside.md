---
title: Implement a custom Pager for a Telerik UI Grid
description: An example on how to add a Pager with different custom functionalities and styles.
type: how-to
page_title: Implement a custom Pager for a Telerik UI Grid
slug: grid-custom-pager-placed-outside
tags: grid, pager, custom, input, numeric, outside
ticketid: 1570031
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Telerik® UI for ASP.NET MVC</td>
 </tr>
 <tr>
  <td>Created with Product Version</td>
  <td>2022.2.802</td>
 </tr>
</table>

## Description

I want to implement:

* A Telerik UI Grid with a custom Pager.
* The default Pager should not be displayed.
* The custom Pager should be placed outside of the Grid.
* The numeric of the Pager should apply the changes on Enter key click, or mouse click outside of the numeric.
* Previous and next page arrows should be implemented with the default behavior.
* It is required to use some custom styles for the Pager.

## Solution

1. Implement a span element for the left arrow with classes: "k-icon k-i-chevron-left".
1. Implement a [Telerik UI NumericTextBox](https://demos.telerik.com/aspnet-mvc/numerictextbox).
1. Implement a span element for the right arrow with classes: "k-icon k-i-chevron-right".
1. Implement a span element for the Pager Total info with id "total".
1. Handle the click event of the left arrow.
1. In the event handler, get the current [page](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/methods/page). Set the previous page to the [dataSource](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/datasource) of the Grid by using the current page. Change the value of the numeric.
1. Handle the [Change Event](https://docs.telerik.com/kendo-ui/api/javascript/ui/numerictextbox/events/change) of the NumericTextBox. It is fired even when clicking outside of the input, so it is perfect for the case.
1. In the Change Event handler, get the current value of the numeric and apply it to the Grid.
1. Handle the click event of the right arrow.
1. In the event handler, get the current page. Set the next page to the dataSource of the Grid by using the current page. Change the value of the numeric checking if the total pages are less or equal to the "next page".
1. In the "document.ready" scope, use the jQuery id selector("#total") to get the total info span and change its HTML(by using the "[html](https://api.jquery.com/html/)" method) to represent the total pages of the dataSource in the Grid.
1. Add additional CSS for the arrows.
1. Here is an example:

```Razor
        @(Html.Kendo().Grid<TelerikMvcApp3.Models.OrderViewModel>()
            .Name("grid")
            .Columns(columns =>
            {
                columns.Bound(p => p.OrderID).Filterable(false);
                columns.Bound(p => p.Freight);
                columns.Bound(p => p.OrderDate).Format("{0:MM/dd/yyyy}");
                columns.Bound(p => p.ShipName);
                columns.Bound(p => p.ShipCity);
            })
            .Pageable(p => p.Responsive(false).Input(true))
            .Sortable()
            .Scrollable()
            .Filterable()
            .HtmlAttributes(new { style = "height:550px;" })
            .DataSource(dataSource => dataSource
                .Ajax()
                .PageSize(20)
                .Read(read => read.Action("Orders_Read", "Grid"))
            )
        )
<br />
<br />
<h3>Choose page:</h3>
<span class="k-icon k-i-chevron-left"></span>
@(Html.Kendo().NumericTextBox<int>()
                    .Name("pages")
                    .Min(1)
                    .Format("#")
                    .Spinners(false)
                    .HtmlAttributes(new { style = "width: 3%", title = "pages" })
                    .Events(e => e.Change("onChange"))
                )
<span class="k-icon k-i-chevron-right"></span>
<span id="total"></span>
```

```JavaScript
    function onChange() {
        var grid = $("#grid").data("kendoGrid");
        var currSelection = this.value();
        grid.dataSource.page(currSelection);
        setTimeout(function () {
            var total = grid.dataSource.totalPages();
            if (currSelection > total) {
                var numerictextbox = $("#pages").data("kendoNumericTextBox");
                numerictextbox.value(total);
            }
        })
    }
    $(document).ready(function () {
        var grid = $("#grid").data("kendoGrid");
        $(".k-i-chevron-left").on("click", function () {
            var currentPage = grid.dataSource.page();
            var previousPage = currentPage - 1;
            grid.dataSource.page(previousPage);
            var numerictextbox = $("#pages").data("kendoNumericTextBox");
            numerictextbox.value(previousPage);
        })
        $(".k-i-chevron-right").on("click", function () {
            var currentPage = grid.dataSource.page();
            var nextPage = currentPage + 1;
            grid.dataSource.page(nextPage);
            var total = grid.dataSource.totalPages();
            if (total >= nextPage) {
                var numerictextbox = $("#pages").data("kendoNumericTextBox");
                numerictextbox.value(nextPage);
            }
        })
        setTimeout(function () {
            var total = grid.dataSource.totalPages();
            $("#total").html("of " + total);
        })
    })
```

```CSS
    .k-grid-pager {
        margin-top: 100px;
        width: 330px;
        display: none;
    }
    .k-i-chevron-left {
        color: mediumpurple;
        font-size: 30px;
    }
    .k-i-chevron-right {
        color: mediumpurple;
        font-size: 30px;
    }
```

## See Also

* [Overview Demo of the Telerik UI Grid for ASP.NET MVC](https://demos.telerik.com/aspnet-mvc/grid)
* [Paging Demo of the Telerik UI Grid for ASP.NET MVC](https://demos.telerik.com/aspnet-mvc/grid/paging)
* [Overview Demo of the Telerik UI Pager for ASP.NET MVC](https://demos.telerik.com/aspnet-mvc/pager)