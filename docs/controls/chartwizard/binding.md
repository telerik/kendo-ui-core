---
title: Data Binding
page_title: jQuery ChartWizard Documentation - Data Binding
description: "Get started with the jQuery ChartWizard by Kendo UI and bind the widget to local or remote data and provide its suggestions."
slug: databinding_kendoui_chartwizard
position: 3
---

# Data Binding

The ChartWiizard component provides different options for binding data. You can bind the component to an array of data, use a Grid selection or bind it to a table-like data.


## Binding to Array

You can bind the ChartWizard component to a local or remote data array.
The bound data must contain one or more arrays of objects with `field` and `value` properties.

The following example demonstrates how to bind the Chart Wizard to an array of data.

```dojo
    <div id="chartwizard"></div>
    $("#chartwizard").kendoChartWizard({            
        dataSource: [
           [
               { field: 'Product Name', value: 'Calzone' },
               { field: 'Quantity', value: 1 },
               { field: 'Price', value: 12.39 },
               { field: 'Tax', value: 2.48 },
               { field: 'Total', value: 14.87 }
           ]
        ],
    });
```

When the ChartWizard is bound to remote data, the remote service must return one or more arrays of objects with `field` and `value` properties. The example below demonstrates how to bind the ChartWizard to remote data:

```dojo
<div id="chartwizard"></div>

<script>
    var chartwizard = $("#chartwizard").kendoChartWizard({
        dataSource: {
            transport: {
                read: {
                    url: "../content/dataviz/js/wizard-products.json",
                    dataType: "json"
                }
            }
        }
    }).data("kendoChartWizard");
</script>
```


## Binding to Grid Selection

The ChartWizard lets you bind the component to [selected Grid cells or rows]({% slug selection_kendoui_grid_widget %}):

* For more details, refer to the [Chart Integration]({% slug chart_integration_kendoui_grid %}) article in the Grid documentation.

* For a live demo, see [How to create Charts from selected Grid cells or rows by using the Kendo ContextMenu](https://demos.telerik.com/kendo-ui/grid/chart-integration).

## Binding to Table-Like Data

ChartWizard component accepts table-like data comprising an array of objects with `dataItem` and `dataColumns` fields.

To bind the Chart Wizard component to table-like data, create a `DataRow` collection and use the [`getWizardDataFromDataRows`](/api/javascript/ui/chartwizard/methods/getwizarddatafromdatarows) helper method to convert it to the format required by the ChartWizard.

The example below demonstrates ChartWizard bound to local table-like data:

```dojo
<div id="chartwizard"></div>
<script>
    const dataColumns = [
        {
            field: 'Product',
            title: 'Product Name'
        },
        {
            field: 'Quantity',
            title: 'Quantity'
        }
    ];

    const dataRows = [
        {
            dataItem: {
                ID: 216321,
                Product: 'Calzone',
                Quantity: 1
            },
            dataColumns
        },
        {
            dataItem: {
                ID: 546897,
                Product: 'Margarita',
                Quantity: 2
            },
            dataColumns
        },
        {
            dataItem: {
                ID: 456231,
                Product: 'Pollo Formaggio',
                Quantity: 1
            },
            dataColumns
        }
    ];

    const chartWizardData = kendo.ChartWizard.getWizardDataFromDataRows(dataRows);

    var chartwizard = $("#chartwizard").kendoChartWizard({
        dataSource: chartWizardData
    }).data("kendoChartWizard");   
</script>
```

To bind the ChartWizard component to a remote data source, which returns only the `dataItems`, set the [`dataColumns`](/api/javascript/ui/chartwizard/#dataColumns) field.

```dojo
    <div id="chartwizard"></div>
    <script>
      var dataSource = new kendo.data.DataSource({
        type: "odata",
        transport: {
          read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
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
        pageSize: 20,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
      });

      $("#chartwizard").kendoChartWizard({
        dataSource: dataSource,
        dataColumns: [
          {
            field: "OrderID",
          },
          {
            field: "Freight",
          },
          {
            field: "ShipName",
            title: "Ship Name"
          }, {
            field: "ShipCity",
            title: "Ship City"
          }
        ],
      });
    </script>
```


## See Also

* [Basic Usage of the ChartWizard (Demo)](https://demos.telerik.com/kendo-ui/chartwizard/index)
* [Using the API of the ChartWizard (Demo)](https://demos.telerik.com/kendo-ui/chartwizard/api)
* [JavaScript API Reference of the ChartWizard](/api/javascript/ui/chartwizard)
