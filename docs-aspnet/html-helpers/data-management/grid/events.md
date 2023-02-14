---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI Grid component for {{ site.framework }}."
slug: grid_events
position: 5
---

# Events

You can subscribe to [all Grid events](/api/Kendo.Mvc.UI.Fluent/GridEventBuilder) and then use them to further customize the behavior of the Grid.

The example below demonstrates how to use the [`Change` event](/api/Kendo.Mvc.UI.Fluent/GridEventBuilder#changesystemstring) that the Grid generates when the user selects a table row or a cell.

```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.CustomerViewModel>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(c => c.ContactName).Title("Contact Name").Width(240).Filterable(ftb => ftb.Multi(true));
            columns.Bound(c => c.ContactTitle).Title("Contact Title");
            columns.Bound(c => c.CompanyName).Title("Company Name");
            columns.Bound(c => c.Country).Title("Country").Width(150);
        })
        .Groupable()
        .Events(events => events
            .Change("onChange")
        )
        .Sortable()
        .Pageable(pageable => pageable
            .Refresh(true)
            .PageSizes(true)
            .ButtonCount(5))
        .DataSource(dataSource => dataSource
            .Ajax()
            .Read(read => read.Action("Orders_Read", "Grid"))
            .PageSize(20)
        )
    )

    <script>
            function onChange(e) {
                var selectedRow = this.select();
                var dataItem = this.dataItem(selectedRow);
                console.log(dataItem)
            }
   </script>
```
{% if site.core %}
```TagHelper
    <kendo-grid name="grid" height="550" on-change="onChange" selectable="true">
        <datasource type="DataSourceTagHelperType.Custom" custom-type="odata" page-size="20">
            <transport>
                <read url="https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers" />
            </transport>
        </datasource>
        <groupable enabled="true" />
        <sortable enabled="true" />
        <pageable button-count="5" refresh="true" page-sizes="new int[] { 5, 10, 20 }">
        </pageable>

        <filterable enabled="true" />
        <columns>
            <column field="ContactName" title="Contact Name" width="240" />
            <column field="ContactTitle" title="Contact Title" />
            <column field="CompanyName" title="Company Name" />
            <column field="Country" title="Country" width="150" />
        </columns>
    </kendo-grid>

    <script>
        function onChange(e) {
            var selectedRow = this.select();
            var dataItem = this.dataItem(selectedRow);
            console.log(dataItem)
        }
    </script>
```
{% endif %}

## Next Steps

* [API for Configuring the Grid Events](/api/Kendo.Mvc.UI.Fluent/GridEventBuilder)
* [Using the Grid Events (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/events)

## See Also

* [Using the API of the Grid for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/api)
* [Optimizing the Grid Performance]({% slug bestpractice_aspnetcore_grid %})
