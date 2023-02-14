---
title: Selection & Export
page_title: jQuery Grid Documentation - Selection & Export
description: "The jQuery Grid by Kendo UI allows you to select cells and then export them. This article explains the steps required to configure and use the component."
slug: exporting_selection_kendoui_grid
position: 4
---

# Selection & Export

The Grid component allows users to select specific cells and then export them to MS Excel or a Kendo UI Chart.

For runnable example, refer to the [Demo on copying/exporting selected cells](https://demos.telerik.com/kendo-ui/grid/selection-export).

## Getting Started

The following sections provide step-by-step instructions and examples on getting started with the Grid Selection Export functionality.

### Enabling Excel Export

1. Include the JSZip script on the page. For more information, refer to the article with the [requirements]({% slug introduction_excelexport_kendoui %}#requirements).

1. Set the [selectable](/api/javascript/ui/grid/configuration/selectable) option of the grid to `multiple, cell`.

### Initializing a ContextMenu

1. Create an unordered list element using html.

    ```html
        <ul id="contextmenu">
            <li id="copy">Copy</li>
            <li id="copyWithHeaders">Copy with Headers</li>
            <li class="k-separator"></li>
            <li id="export">Export</li>
            <li id="exportWithHeaders">Export with Headers</li>
            <li id="exportToChart">Export to Chart</li>
        </ul>
    ```

1. Create an icon for the `ContextMenu`. The icon can be appended to a Grid cell as demonstrated in the demo.

    ```javascript
    $(document).ready(function() {
        var grid = $("#grid").data("kendoGrid");
        /* Append the ContextMenu icon to the last cell. */
        grid.tbody.find('tr:first td:last').append("<span class='k-primary k-bg-primary k-icon k-i-menu contextMenuIcon'></span>");
    })
    ```

1. Initialize the `ContextMenu` component.

    ```javascript
    $("#contextmenu").kendoContextMenu({
                target: ".contextMenuIcon",
                showOn: "click",
                direction: "right",
                alignToAnchor: true,
                copyAnchorStyles: false,
                select: function (e) {
                    var item = e.item.id;
                    /* The methods and their implementation details can be found in the next section of the article. */
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
            });
    ```

### Copying Selected Data

To enable users to copy the selected data, call the [`copySelectionToClipboard`](/api/javascript/ui/grid/methods/copyselectiontoclipboard) method.

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

To enable users to export the selected data, call the [`exportSelectedToExcel`](/api/javascript/ui/grid/methods/exportselectedtoexcel) method.

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

To enable users to export the selected data to a Kendo UI Chart:

1. Create an empty div element which will hold the chart.

    ```html
        <div id="chart-container"></div>
    ```

1. Call the [`getSelectedData`](/api/javascript/ui/grid/methods/getselecteddata) method and initialize a Chart component with the data.

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
- The `copySelectionToClipboard` and `exportSelectedToExcel` methods do not work with Multi-column headers.

## See Also

* [Copying and Exporting the selected data to Excel (Demo)](https://demos.telerik.com/kendo-ui/grid/selection-export)
* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)