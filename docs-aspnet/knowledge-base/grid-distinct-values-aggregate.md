---
title: Displaying the count of distinct values in Grid column footer template
description: An example on how to create a custom aggreagte that counts the distinct values in a column when using the Telerik UI for {{ site.framework }} Grid.
type: how-to
page_title: Displaying the count of distinct values in Grid column footer template
slug: grid-distinct-values-aggregate
tags: grid, count, distinct, values, aggregate, footer, template, telerik, core, mvc
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2023.2.829 version</td>
 </tr>
</table>

## Description

How can I calculate the count of the distinct values in a specified column and display the result within its footer template?

## Solution

The Grid's DataSource supports [`Count()` aggregate]({% slug htmlhelper_datasourceaggregates %}) field that calculates the total number of values. However, if you need to get the number of the distinct values, follow the steps below:

1. Execute a function within the `ClientFooterTemplate()` that will return the distinct values. Ensure that the server operations of the DataSource are disabled.

    ```HtmlHelper
        @(Html.Kendo().Grid<OrderViewModel>()
            .Name("grid")
            .Columns(columns =>
            {
                columns.Bound(p => p.OrderID);
                columns.Bound(x => x.ShipName).ClientFooterTemplate("#: getDistinctValues() #");
            })
            ...
            .DataSource(dataSource => dataSource
                .Ajax()
                .PageSize(10)
                .ServerOperation(false)
                ...
            )
            .Pageable()
            .Sortable()
            .Scrollable()
            .Groupable()
            .Filterable()
            ...
        )
    ```
    {% if site.core %}
    ```TagHelper
        @addTagHelper *, Kendo.Mvc

        <kendo-grid name="grid">
            <columns>
                <column field="OrderID"/>
                <column field="ShipName" footer-template="#: getDistinctValues() #"></column>
            </columns>
            <datasource type="DataSourceTagHelperType.Ajax" page-size="10" server-operation="false">
                <!-- Other configuration -->
            </datasource>
            <pageable enabled="true"/>
            <scrollable enabled="true"/>
            <filterable enabled="true"/>
            <sortable enabled="true" />
            <groupable enabled="true" />
            <!-- Other configuration -->
        </kendo-grid>

    ```
    {% endif %}
    ```Script
        function getDistinctValues() {
            ...
        }
    ```

1. Calculate the distinct values of the "ShipName" field on the client with jQuery.

    ```Script
        function getDistinctValues() {
            var grid = $("#grid").getKendoGrid(); // Get a reference to the Grid.
            var allGridData = grid.dataSource.data(); // Get the Grid's data.
            var appliedFilters = grid.dataSource.filter(); // Get the current filter expressions.
            var aggregateResult = 0;

            if (appliedFilters != null) { // Check if the Grid is filtered.
                var dataQuery = new kendo.data.Query(allGridData); // Create a Query (https://docs.telerik.com/kendo-ui/api/javascript/data/query).
                var filteredData = dataQuery.filter(appliedFilters).data; // Get a copy of the filtered data according to the applied filter expression.
                aggregateResult = getAggregates(filteredData); // Pass the filtered records to the getAggregates() function to calculate the distinct values count.
            } else {
                aggregateResult = getAggregates(allGridData); // If the Grid is not filtered, pass all records to the getAggregates() function.
            }

            return `Total: ${aggregateResult}`;
        }

        function getAggregates(gridData) {
            var distinctValues = [];
            $.each(gridData, function (i, el) { // Loop through the Grid records.
                if (distinctValues.indexOf(el.ShipName) == -1) {
                    distinctValues.push(el.ShipName);  // Store the unique values.
                }
            });
            return distinctValues.length; // Return their count.
        }
    ```

1. Handle the `DataBound` event of the Grid and update the displayed distinct values count when the Grid is filtered and/or grouped.

    ```Script
        function onDataBound(e) {
            if (e.sender.dataSource.filter() != null) { // Check if the data is filtered.
                var appliedFilters = e.sender.dataSource.filter(); // Get the current filter expressions.
                var allGridData = e.sender.dataSource.data(); //Get all Grid records.
                var dataQuery = new kendo.data.Query(allGridData); //Create a Query.
                var filteredData = dataQuery.filter(appliedFilters).data; // Get a copy of the filtered data according to the applied filter expression.
                var updatedAggregate = getAggregates(filteredData); // Update the aggregation result.
                var columnFooterIndex = e.sender.dataSource.group().length + 2; // Get the column index when the Grid is grouped. "+2" is added because the "ShipName" column is the second column the Grid declaration. Replace the value with the index of the column at your end (1-based index).
                e.sender.footer.find(`.k-footer-template td:nth-child(${columnFooterIndex})`).html(`Total: ${updatedAggregate}`); // Update the column footer template.
            }
        }
    ```

{% if site.core %}
For a runnable example based on the code above, refer to the following REPL samples:

* [Sample code with the Grid HtmlHelper](https://netcorerepl.telerik.com/mdaDwCEr18tFpjd408)
* [Sample code with the Grid TagHelper](https://netcorerepl.telerik.com/wRYNQsOh19KbF5LA18)
{% else %}
For a runnable example based on the code above, refer to the [REPL example on displaying distinct values in Grid column footer](https://netcorerepl.telerik.com/mdaDwCEr18tFpjd408).
{% endif %}

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)

{% if site.core %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-core-ui/grid)

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
{% if site.core %}
* [Server-Side TagHelper API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/taghelpers/grid)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)

