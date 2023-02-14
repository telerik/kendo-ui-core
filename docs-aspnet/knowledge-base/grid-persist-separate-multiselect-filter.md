---
title: Persist Separated MultiSelect Filters for a Telerik UI Grid in the SessionStorage
description: How can I persist the applied filters from separated MultiSelects to a Telerik UI Grid
type: how-to
page_title: Persist The Filter State of a Telerik UI Grid When Using Outside Placed MultiSelects
slug: grid-persist-separate-multiselect-filter
tags: grid, multiselect, persist, filter, sessionstorage
res_type: kb
component: grid
---

## Environment

<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2022.2.802</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>Grid for Progress® Telerik® {{ site.product_short }}</td>
		</tr>
	</tbody>
</table>

## Description

How to reload the filtered state of a Telerik UI Grid applied from separated MultiSelects?

## Solution

The example below is implemented as per the following steps:

1. Implement a Custom "Apply Filters" Button along with the separated from the Grid MultiSelects.
1. Use the ["Click"](https://docs.telerik.com/kendo-ui/api/javascript/ui/button/events/click) Event of the "Apply Filters" Custom button.
1. In the Event handler, get the [values](https://docs.telerik.com/kendo-ui/api/javascript/ui/multiselect/methods/value) of the MultiSelects.
1. Implement a custom logic creating a filter for the [dataSource](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/datasource) of the Telerik UI Grid by using the values of the MultiSelects(step 2) and main logic "or".
1. Apply the filter(from point 4).
1. Save the values of the MultiSelects to variables in the "SessionStorage".
1. For the "document.ready" scope(when returning to the application page) - check if the SessionStorage has saved values of the MultiSelects. If yes - use them to filter the Grid.
1. The held values in the SessionStorage could be used in order to set them to their MultiSelects instances in the document.ready scope.
1. Here is an example:

```Index.cshtml
    @(Html.Kendo().MultiSelect()
          .Name("freight")
          .AutoClose(false)
          .Placeholder("Select Freights...")
          .BindTo(new List<decimal>() {10, 20, 30, 40, 50, 60, 70, 80, 90, 100})
    )
<br />
<br />

@(Html.Kendo().MultiSelect()
          .Name("shipName")
          .AutoClose(false)
          .Placeholder("Select ShipNames...")
          .BindTo(new List<string>() {
              "ShipName 1",
              "ShipName 2",
              "ShipName 3",
              "ShipName 4",
              "ShipName 5",
              "ShipName 6",
              "ShipName 7",
              "ShipName 8",
              "ShipName 9",
              "ShipName 10",
          })
    )

<br />
<br />

@(Html.Kendo().MultiSelect()
          .Name("shipCity")
          .AutoClose(false)
          .Placeholder("Select ShipCities...")
          .BindTo(new List<string>() {
              "ShipCity 1",
              "ShipCity 2",
              "ShipCity 3",
              "ShipCity 4",
              "ShipCity 5",
              "ShipCity 6",
              "ShipCity 7",
              "ShipCity 8",
              "ShipCity 9",
              "ShipCity 10",
          })
    )

<br />
<br />

@(Html.Kendo().Button()
        .Name("testButton")
        .HtmlAttributes( new {type = "button"} )
        .Content("Apply Filters")
        .Events(e => e.Click("onClick"))
        )

<br />
<br />

        @(Html.Kendo().Grid<TelerikMvcApp63.Models.OrderViewModel>()
            .Name("grid")
            .Columns(columns =>
            {
                columns.Bound(p => p.OrderID).Filterable(false);
                columns.Bound(p => p.Freight);
                columns.Bound(p => p.ShipName);
                columns.Bound(p => p.ShipCity);
            })
            .Pageable()
            .Sortable()
            .Scrollable()
            .Filterable()
            .HtmlAttributes(new { style = "height:450px;" })
            .DataSource(dataSource => dataSource
                .Ajax()
                .PageSize(20)
                .Read(read => read.Action("Orders_Read", "Grid"))
            )
        )
```
```JavaScript
    <script>
 function onClick() {
        var freights = $("#freight").data("kendoMultiSelect").value();
        var shipNames = $("#shipName").data("kendoMultiSelect").value();
        var shipCities = $("#shipCity").data("kendoMultiSelect").value();

        // Filter the Grid
        filterGrid(freights, shipNames, shipCities);

        // Save Multiselects in the SessionStorage
        sessionStorage.setItem('freights', freights);
        sessionStorage.setItem('shipNames', shipNames);
        sessionStorage.setItem('shipCities', shipCities);
    }

    function filterGrid(freights, shipNames, shipCities) {
        var gridDataSource = $("#grid").data("kendoGrid").dataSource;

        // Create custom filter with 'or' logic
        var _filter = { logic: "or", filters: [] };

        if (freights.length > 0) {
            for (var i = 0; i < freights.length; i++) {
                _filter.filters.push({ field: "Freight", operator: "eq", value: freights[i] });
            }
        }

        if (shipNames.length > 0) {
            for (var i = 0; i < shipNames.length; i++) {
                _filter.filters.push({ field: "ShipName", operator: "eq", value: shipNames[i] });
            }
        }

        if (shipCities.length > 0) {
            for (var i = 0; i < shipCities.length; i++) {
                _filter.filters.push({ field: "ShipCity", operator: "eq", value: shipCities[i] });
            }
        }

        // Apply the filter
        gridDataSource.filter(_filter);
    }

    $(document).ready(function () {
        var freights = sessionStorage.getItem('freights');
        var shipNames = sessionStorage.getItem('shipNames');
        var shipCities = sessionStorage.getItem('shipCities');

        var namesArr = shipNames.split(",");
        var citiesArr = shipCities.split(",");

        if (freights || shipNames || shipCities) {
                filterGrid(freights, namesArr, citiesArr);
        }

        var freightsMulti = $("#freight").data("kendoMultiSelect");
        var shipNamesMulti = $("#shipName").data("kendoMultiSelect");
        var shipCitiesMulti = $("#shipCity").data("kendoMultiSelect");

        freightsMulti.value(freights);
        shipNamesMulti.value(namesArr);
        shipCitiesMulti.value(citiesArr);
    })
    </script>
```

## See Also
 * [Grid server-side API methods](https://docs.telerik.com/aspnet-mvc/api/grid)
 * [Grid cient-side API methods](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid#methods)
 * [MVC MultiSelect demo](https://demos.telerik.com/aspnet-mvc/multiselect)