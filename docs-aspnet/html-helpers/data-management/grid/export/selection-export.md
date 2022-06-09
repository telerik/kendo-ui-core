---
title: Selection & Export
page_title: Selection & Export
description: "With Telerik UI Grid for {{ site.framework }} you can enable users to select specific cells and export them to Excel or Telerik UI Chart"
slug: exportingselection_gridhelper_aspnetcore
position: 6
---

# Selection & Export

The Grid widget allows users to select specific cells and then to export them to Excel or a Telerik UI Chart for {{ site.framework }} .

For runnable example, refer to the [Demo on copying/exporting selected cells](https://demos.telerik.com/{{ site.platform }}/grid/selection-export)

## Getting Started

The following sections provide step-by-step instructions and examples on getting started with the Grid Selection Export functionality.

> The selection export functionality relies on the client-side Grid API. In this example, a Telerik UI ContextMenu is used to execute Grid methods related to copying and exporting of the selected cells.

### Enabling Excel Export

1. Configure the [Selectable]({% slug htmlhelpers_grid_aspnetcore_selection %}) property and apply the following settings:
    * Set the [Selection Mode]({% slug htmlhelpers_grid_aspnetcore_selection %}#select-modes) to [Multiple](/api/Kendo.Mvc.UI.Fluent/GridSelectionSettingsBuilder#modekendomvcuigridselectionmode).
    * Set the [Selection Type]({% slug htmlhelpers_grid_aspnetcore_selection %}#select-modes) to [Cell](/api/Kendo.Mvc.UI.Fluent/GridSelectionSettingsBuilder#typekendomvcuigridselectiontype).

1. To take full advantage of the Excel export feature, download the [JSZip library](https://stuk.github.io/jszip/) and include the file before the Kendo UI JavaScript files in the `Layout.cshtml`. For more information, refer to the article with the [requirements]({% slug exportsupport_core %}#jszip-library).

    ```HtmlHelper
        <script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
        <script src="http://cdnjs.cloudflare.com/ajax/libs/jszip/2.4.0/jszip.js"></script>
        <script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.all.min.js"></script>

        @(Html.Kendo().Grid<OrderViewModel>()
            .Name("grid")
            .Selectable(selectable => selectable
                .Mode(GridSelectionMode.Multiple)
                .Type(GridSelectionType.Cell))
            .DataSource(dataSource => dataSource
                .Ajax()
                .Read(read => read.Action("Orders_Read", "Grid"))
            )
        )
    ```
    {% if site.core %}
    ```TagHelper
        <kendo-grid name="grid">
            <selectable mode="multiple,cell" />
            <datasource type="DataSourceTagHelperType.Ajax">
                <transport>
                    <read url="@Url.Action("Orders_Read","Grid")" />
                </transport>
            </datasource>
        </kendo-grid>
    ```
    {% endif %}

### Initializing a ContextMenu

1. Add an icon for the ContextMenu.

    ```html
        <span class='k-primary k-bg-primary k-icon k-i-menu contextMenuIcon'></span>
    ```

1. Create the widget.

    ```HtmlHelper
        @(Html.Kendo().ContextMenu()
            .Name("contextmenu")
            .Target(".contextMenuIcon")
            .ShowOn("click")
            .AlignToAnchor(true)
            .Items(items =>
            {
                items.Add().Text("Copy").HtmlAttributes(new { id = "copy" });
                items.Add().Text("Copy with Headers").HtmlAttributes(new { id = "copyWithHeaders" });
                items.Add().Separator(true);
                items.Add().Text("Export").HtmlAttributes(new { id = "export" });
                items.Add().Text("Export with Headers").HtmlAttributes(new { id = "exportWithHeaders" });
                items.Add().Text("Export to Chart").HtmlAttributes(new { id = "exportToChart" });
            })
            .Events(ev => ev.Select("onSelect"))
        )
    ```
    {% if site.core %}
    ```TagHelper
        <kendo-contextmenu name="contextmenu" target=".contextMenuIcon" show-on="click" align-to-anchor="true" on-select="onSelect">
            <popup-animation>
                <open effects="fade:in" duration="500" />
            </popup-animation>
            <items>
                <menu-item text="Copy" image-html-attributes='new Dictionary<string,object> { ["id"] = "copy" }'>
                </menu-item>
                <menu-item text="Copy with Headers" image-html-attributes='new Dictionary<string,object> { ["id"] = "copyWithHeaders" }'></menu-item>
                <menu-item separator="true"></menu-item>
                <menu-item text="Export" image-html-attributes='new Dictionary<string,object> { ["id"] = "export" }'>
                </menu-item>
                <menu-item text="Export with Headers" image-html-attributes='new Dictionary<string,object> { ["id"] = "exportWithHeaders" }'>
                </menu-item>
                <menu-item text="Export to Chart" image-html-attributes='new Dictionary<string,object> { ["id"] = "exportToChart" }'>
                </menu-item>
            </items>
        </kendo-contextmenu>
    ```
    {% endif %}

1. Define the event handling function.

    ```javascript
        function onSelect(e) {
            var item = e.item.id;

            switch (item) {
                case "copy":
                    copySelected();
                    break;
                case "copyWithHeaders":
                    copySelectedWithHeaders();
                    break;
                case "export":
                    exportSelected();
                    break;
                case "exportWithHeaders":
                    exportSelectedWithHeaders();
                    break;
                case "exportToChart":
                    exportToChart();
                    break;
                default:
                    break;
            };
        }
    ```

### Copying Selected Data

To enable users to copy the selected data, call the [`copySelectionToClipboard`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/copyselectiontoclipboard) method.

```javascript
    function copySelected() {
        let selected = grid.select();

        if (selected.length === 0) {
            kendo.alert("Please select cells before copying.");
            return;
        }

        grid.copySelectionToClipboard(false);
    }

    function copySelectedWithHeaders() {
        let selected = grid.select();

        if (selected.length === 0) {
            kendo.alert("Please select cells before copying.");
            return;
        }

        grid.copySelectionToClipboard(true);
    }
```

### Exporting Selected Data to Excel

To enable users to export the selected data, call the [`exportSelectedToExcel`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/exportselectedtoexcel) method.

```javascript
    function exportSelected() {
        let selected = grid.select();

        if (selected.length === 0) {
            kendo.alert("Please select cells before exporting.");
            return;
        }
        grid.exportSelectedToExcel(false);
    }

    function exportSelectedWithHeaders() {
        let selected = grid.select();

        if (selected.length === 0) {
            kendo.alert("Please select cells before exporting.");
            return;
        }

        grid.exportSelectedToExcel(true);
    }
```

### Exporting Selected Data to Chart

To enable users to export the selected data to a Kendo UI Chart, call the [`getSelectedData`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/getselecteddata) method and initialize a Chart widget with the data.

1. Add an empty div before initializing the Grid.

        <div id="chart-container"></div>

1. Define the `exportToChart` method as demonstrated below.

    ```javascript
            function exportToChart() {
                var container = $('#chart-container');
                var windowInstance = $('#chart-container').data('kendoWindow');
                var currInstance = container.find('.k-chart').data('kendoChart');
                /* Get the selected data. */
                var data = grid.getSelectedData();

                if (!data.length) {
                    kendo.alert('Please select cells before exporting.');
                    return;
                }

                /* If the user selects only a value(Freight) without a category(ShipCountry), set the ShipCountry name to Uknown.*/
                let unknownCountries = $.extend(true, [], data);
                unknownCountries.forEach(function (item, index, array) {
                    if (!array[index].ShipCountry) {
                        array[index].ShipCountry = "Unknown"
                    }
                });

                /* Destroy the window instance. */
                if (windowInstance) {
                    windowInstance.destroy();
                }

                /* Destroy the chart instance. */
                if (currInstance) {
                    currInstance.destroy();
                }

                /* Initialize a new window instance and increase it's width for every row that has been selected. This way the chart can fit properly. */
                let windowWidth = data.length > 5 ? data.length * 75 : 500;
                windowInstance = container.kendoWindow({ width: windowWidth }).data('kendoWindow');
                container.empty();

                /* Create a chart using the data and append it to the window. */
                var element = $('<div></div>').appendTo(container);
                windowInstance.open().center();
                element.kendoChart({
                    dataSource: {
                        data: unknownCountries
                    },
                    series: [{
                        type: "column",
                        field: 'Freight'
                    }],
                    categoryAxis: {field: "ShipCountry"}
                });
            }
    ```

## Selection Types

The following selection types are supported:

- Cell selection - the user holds down the `CTRL` key (`Command` key on Mac) and uses the `left-click` of the mouse to select cells.
- Range selection - the user holds down the `left-click` on the mouse and drags across a range of cells.
- Range and Cell selection - the user can combine the two approaches from above and select both a range and separate cells.
- Range combination selection - the user performs a range selection and while holding the `CTRL` key (`Command` key on Mac), they perform another range selection.

## Known Limitations

- The `copySelectionToClipboard`, `exportSelectedToExcel` and `getSelectedData` methods do not work with rows that are persisted across different pages.
- The Export to Chart method does not work with `Range and Cell selection` type.

## See Also

* [Selection Copy/Export by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/selection-export)
* [Server-Side API](/api/grid)
