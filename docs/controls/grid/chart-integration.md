---
title: Chart Integration
page_title: jQuery Grid Documentation - Chart Integration
description: "Get started with the jQuery Grid by Kendo UI and learn how to quickly create the desired chart using the Grid datae."
components: ["grid"]
slug: chart_integration_kendoui_grid
position: 19
---

# Chart Integration

Integrating charts within the Grid provides a visual representation of the data, making trends, patterns, and outliers more clear compared to raw table data.

Use the [Kendo UI for jQuery Chart Wizard]({% slug overview_kendoui_chartwizard_widget %}) component to quickly create the desired chart using the Grid data.

The following example demonstrates how to launch the Chart Wizard from a [Context Menu]({% slug overview_kendoui_contextmenu_widget %}).


## Generating Chart from Grid Selection

You can create charts from the Grid row and cell selection. 
The example below demonstrates how you can use the [generateDataRows](/api/javascript/ui/chartwizard/methods/generatedatarows) method to create charts from the selected Grid cells or rows. 
To enable the generation of a chart, get a reference to the Grid component and pass the Grid selection and the Grid columns to the `generateDataRows` method:

```
const grid = $("#grid").data("kendoGrid");
const data = kendo.ui.ChartWizard.generateDataRows(grid.getSelectedData(), grid.columns);
```

In the example below you can select multiple cells using `Ctrl` + `click` and then press the Button on top to create Charts based on the selection in the Grid. 

```dojo
    <button id="btn">Create Chart</button>
    <div id="grid"></div>
    <div id="chartwizard"></div>
    <script>
      $(document).ready(function () {
        const dataSource = new kendo.data.DataSource({
          type: "odata-v4",
          transport: {
            read: "https://demos.telerik.com/service/v2/odata/Orders"
          },
          schema: {
            model: {
              fields: {
                OrderID: { type: "number" },
                Freight: { type: "number" },
                ShipName: { type: "string" },
                OrderDate: { type: "date" },
                ShipCity: { type: "string" }
              }
            }
          },
          pageSize: 15,
          serverPaging: true,
          serverFiltering: true,
          serverSorting: true
        });

        $("#grid").kendoGrid({
          dataSource: dataSource,
          selectable: {
            mode: "multiple, cells",
          },
          pageable: {
            pageSize: 10,
            buttonCount: 5,
          },
          scrollable: true,
          navigatable: true,
          columns: [
            {
              field:"OrderID",
            },
            "Freight",
            {
              field: "ShipName",
              title: "Ship Name"
            }, {
              field: "ShipCity",
              title: "Ship City"
            }
          ],
        });

        $("#chartwizard").kendoChartWizard({
          dataSource: dataSource,
          window: {
            visible: true,
          },
          dataColumns:  [
            {
              field:"OrderID",
            },
            "Freight",
            {
              field: "ShipName",
              title: "Ship Name"
            }, {
              field: "ShipCity",
              title: "Ship City"
            }
          ],
          dataBound: function (e) {
            const chartWizard = e.sender;
            const grid = $("#grid").data("kendoGrid");
            chartWizard.open();
          }
        });

        $("#btn").kendoButton({
          click: () => {
            const grid = $("#grid").data("kendoGrid");
            const data = kendo.ui.ChartWizard.generateDataRows(grid.getSelectedData(), grid.columns);
            const chartWizard = $("#chartwizard").data("kendoChartWizard");
            chartWizard.setOptions({ dataSource: data });
          },
        });
      })
    </script>
```


## See Also

* [Chart Integration Kendo UI for jQuery Grid (Demo)](https://demos.telerik.com/kendo-ui/grid/chart-integration)
* [JavaScript API Reference of the Kendo UI for jQuery Grid](/api/javascript/ui/grid)
* [Overview Kendo UI for jQuery ChartWizard (Demo)](https://demos.telerik.com/kendo-ui/chartwizard/index)
* [JavaScript API Reference of the Kendo UI for jQuery ChartWizard](/api/javascript/ui/chartwizard)

