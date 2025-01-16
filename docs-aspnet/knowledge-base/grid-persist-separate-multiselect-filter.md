---
title: Persist Separated MultiSelect Filters for a Telerik UI Grid in the SessionStorage
description: How can I persist the applied filters from separated MultiSelects to a {{ site.product }} Grid? Find the solution in the {{ site.product }} Knowledge Base.
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

How to reload the filtered state of a {{ site.product }} Grid applied from separated MultiSelect components?

## Solution

The example below is implemented as per the following steps:

1. Implement a custom **Apply Filters** button along with the MultiSelect components that are separated from the Grid.
1. Use the [`Click`](https://docs.telerik.com/kendo-ui/api/javascript/ui/button/events/click) event of the custom **Apply Filters** button.
1. In the Event handler, get the [`values`](https://docs.telerik.com/kendo-ui/api/javascript/ui/multiselect/methods/value) of the MultiSelects.
1. Implement a custom logic creating a filter for the [DataSource](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/datasource) of the {{ site.product }} Grid by using the values of the MultiSelect components (step 2) and main logic `OR`.
1. Apply the filter from the previous step.
1. Save the values of the MultiSelect components to variables in the `SessionStorage`.
1. For the `document.ready` scope (when returning to the application page), check if the `SessionStorage` has any saved values for the MultiSelect components. If it has, use them to filter the Grid.
1. You can use the values held in the `SessionStorage` to set them to their MultiSelect instances in the `document.ready` scope.

The following examples demonstrates the steps described above.

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

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)

{% if site.core %}
* [{{ site.framework }} DataGrid Product Page](https://www.telerik.com/aspnet-core-ui/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
