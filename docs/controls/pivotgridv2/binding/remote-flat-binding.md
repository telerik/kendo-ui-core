---
title: Remote Flat Binding
page_title: jQuery PivotGridV2 Documentation - Remote Flat Data Binding
description: "Get started with the jQuery PivotGridV2 by Kendo UI and learn how to bind it to a local array of data."
slug: remote_flat_binding_kendoui_pivotgridv2
position: 5
---

# Remote Flat Data Binding

You can bind the Kendo UI for jQuery PivotGridV2 to JSON data fetched from a remote end point. 


For a runnable example on how to bind the PivotGridV2 to a remote flat data review the dedicated demo.

* [Demo page for the PivotGridV2 Remote Binding](https://demos.telerik.com/kendo-ui/pivotgridv2/remote-flat-data-binding)


## Bind the Data

The code snippet below showcases a small data sample from the [Remote Binding demo](https://demos.telerik.com/kendo-ui/pivotgridv2/remote-flat-data-binding). 

```javascript
[{ ProductID: 1, ProductName: "Chai", UnitPrice: "18.00"},
{ ProductID: 2, ProductName: "Chang", UnitPrice: "19.00"},
{ ProductID: 3, ProductName: "Aniseed Syrup", UnitPrice: "10.00"}]
```

The following code snippet showcases how you can use the [`transport`](/api/javascript/data/pivotdatasourcev2/configuration/transport) option to read the data from the remote end point.

```javascript
$("#pivotgrid").kendoPivotGridV2({
    dataSource: {
		transport: {
			read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
		}
        ......
    }
});
```

## Columns and Rows

You can construct the PivotGridV2 table by using the fields from the sample data in the [previous section](#bind-the-data).

   1. Configure the [`schema`](/api/javascript/data/pivotdatasource/configuration/schema#schemacube).

   ```javascript
            schema: {
				model: {
					fields: {
						ProductID: { type: "number" },
						ProductName: { type: "string" },
						UnitPrice: { type: "number" }
					}
				},
				cube: {
					dimensions: {
						ProductID: { caption: "All Products" },
						ProductName: { caption: "All Names" },
						UnitPrice: { caption: "Total Price" }
					},
					measures: {
						"Price Sum": { field: "UnitPrice", aggregate: "sum" }
					}
				}
			},
   ```

   2. Configure the columns, rows, and measures.

   ```javascript
           columns: [{ name: "ProductName", expand: true }],
			rows: [{ name: "ProductID", expand: true }],
			measures: ["Price Sum"]
   ```


## Known Limitations

The known limitations are listed in the [following link](/controls/pivotgridv2/binding/local-binding#known-limitations).
