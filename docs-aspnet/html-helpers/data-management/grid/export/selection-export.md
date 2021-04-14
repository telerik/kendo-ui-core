---
title: Selection Export
page_title: Selection Export
description: "With Telerik UI Grid for {{ site.framework }} you can enable users to select specific cells and export them to Excel or Telerik UI Chart"
slug: exportingselection_gridhelper_aspnetcore
position: 6
---

# Selection Export

The Grid widget allows users to select specific cells and then to export them to Excel or a Telerik UI Chart for {{ site.framework }} .

For runnable example, refer to the [Demo on copying/exporting selected cells](https://demos.telerik.com/{{ site.platform }}/grid/advanced-export)

## Getting Started

The following sections provide step-by-step instructions and examples on getting started with the Grid Selection Export functionality.

### Enabling Excel Export

1. Configure the [Selectable]({% slug htmlhelpers_grid_aspnetcore_selection %}) property and apply the following settings:
    * Set the [Selection Mode]({% slug htmlhelpers_grid_aspnetcore_selection %}#select-modes) to [Multiple](/api/Kendo.Mvc.UI.Fluent/GridSelectionSettingsBuilder#modekendomvcuigridselectionmode).
    * Set the [Selection Type]({% slug htmlhelpers_grid_aspnetcore_selection %}#select-modes) to [Cell](/api/Kendo.Mvc.UI.Fluent/GridSelectionSettingsBuilder#typekendomvcuigridselectiontype).

1. To take full advantage of the Excel export feature, download the [JSZip library](https://stuk.github.io/jszip/) and include the file before the Kendo UI JavaScript files in the `Layout.cshtml`. For more information, refer to the article with the [requirements]({% if site.core %}{% slug exportsupport_core %}{% else %}{% slug exportsupport_aspnetmvc %}{% endif %}#jszip-library).

        <script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
        <script src="http://cdnjs.cloudflare.com/ajax/libs/jszip/2.4.0/jszip.js"></script>
        <script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.all.min.js"></script>

        @(Html.Kendo().Grid<OrderViewModel>()
            .Name("grid")
            .ToolBar(tools => {
                tools.Custom().Name("copy").Text("Copy Selected").IconClass("k-icon k-i-copy");
            })
            .Selectable(selectable => selectable
                .Mode(GridSelectionMode.Multiple)
                .Type(GridSelectionType.Cell))
            .DataSource(dataSource => dataSource
                .Ajax()
                .Read(read => read.Action("Orders_Read", "Grid"))
            )
        )

### Copying Selected Data

To enable users to copy the selected data, call the [`copySelectionToClipboard`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/copyselectiontoclipboard) method.

1. Define a custom command in the toolbar:

        @(Html.Kendo().Grid<OrderViewModel>()
            .Name("grid")
            .ToolBar(tools => {
                tools.Custom().Name("copy").Text("Copy Selected").IconClass("k-icon k-i-copy");
            })
            .Selectable(selectable => selectable
                .Mode(GridSelectionMode.Multiple)
                .Type(GridSelectionType.Cell))
            .DataSource(dataSource => dataSource
                .Ajax()
                .Read(read => read.Action("Orders_Read", "Grid"))
            )
        )

1. On click of the `Copy Selected` button, copy the selected cells:

        <script>
            $(".k-grid-copy").on("click", function (e) {
                e.preventDefault();
                var grid = $("#grid").data("kendoGrid");
                let selected = grid.select();

                /* Set to true in order to copy the headers as well. */
                grid.copySelectionToClipboard(false);
            });
        </script>

### Exporting Selected Data

To enable users to export the selected data, call the [`exportSelectedToExcel`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/exportselectedtoexcel) method.

1. Define a custom command in the toolbar.

        @(Html.Kendo().Grid<OrderViewModel>()
            .Name("grid")
            .ToolBar(tools => {
                tools.Custom().Name("export").Text("Export Selected").IconClass("k-icon k-i-excel");
            })
            .Selectable(selectable => selectable
                .Mode(GridSelectionMode.Multiple)
                .Type(GridSelectionType.Cell))
            .DataSource(dataSource => dataSource
                .Ajax()
                .Read(read => read.Action("Orders_Read", "Grid"))
            )
        )

1. On click of the `Export Selected` button, export the selected cells.

        <script>
            $(".k-grid-export").on("click", function (e) {
                e.preventDefault();
                var grid = $("#grid").data("kendoGrid");
                let selected = grid.select();

                /* Set to true in order to export the headers as well. */
                grid.exportSelectedToExcel(false);
            });
        </script>

### Exporting Selected Data to Chart

To enable users to export the selected data to a Telerik UI Chart, call the [`getSelectedData`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/getselecteddata) method and initialize a Chart widget with the data.

1. Add an empty div before initializing the Grid.

        <div id="chart-container"></div>

1. Define a custom command in the toolbar.

        @(Html.Kendo().Grid<OrderViewModel>()
            .Name("grid")
            .ToolBar(tools => {
                tools.Custom().Name("exportChart").Text("Export Selected To Chart").IconClass("k-icon k-i-column-clustered");
            })
            .Selectable(selectable => selectable
                .Mode(GridSelectionMode.Multiple)
                .Type(GridSelectionType.Cell))
            .DataSource(dataSource => dataSource
                .Ajax()
                .Read(read => read.Action("Orders_Read", "Grid"))
            )
        )

1. On click of the `Export Selected To Chart` button, initialize a Kendo UI Chart inside a Kendo UI Window with the selected data.

        <script>
            $(".k-grid-exportChart").on("click", function (e) {
                var grid = $('#grid').data('kendoGrid');

                var container = $('#chart-container');

                /* Get a reference to the Kendo Window widget if it has been initialized. */
                var windowInstance = $('#chart-container').data('kendoWindow');
                var currInstance = container.find('.k-chart').data('kendoChart');

                /* Get the data from the selected cells. */
                var data = grid.getSelectedData();
                var categoryField;

                if (!data.length) {
                    kendo.alert('Please select cells before exporting.');
                    return;
                }

                /* Set the categoryField of the chart using one of the grid fields. */
                categoryField = data[0].ShipCountry ? 'ShipCountry' : 'ShipCity';

                /* If the Kendo Window widget is undefined, initialize it. */
                if (!windowInstance) {
                    windowInstance = container.kendoWindow({ width: 800 }).data('kendoWindow');
                }

                /* If the chart widget already exists, destroy it. */
                if (currInstance) {
                    currInstance.destroy();
                }

                /* Empty the div element. */
                container.empty();
                /* Append an empty div to the container. */
                var element = $('<div></div>').appendTo(container);
                windowInstance.open().center();

                /* Initialize a Chart from the appended div. */
                element.kendoChart({
                    series: [{
                        type: "column",
                        categoryField: categoryField,
                        field: 'Freight',
                        data: data
                    }]
                });
            });
        </script>

## See Also

* [Selection Copy/Export by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/advanced-export)
* [Server-Side API](/api/grid)
