---
title: Filter nested collection
description: An example how to create a custom filter operator and filter a collection nested in the model and filter an array column in the Grid.
type: how-to
page_title: Filter hierarchy
slug: filter-model-with-collection
tags: filter, collection, nested, multiselect, custom, operator, grid, hierarchy, array, column
ticketid: 1500740
component: filter
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Created withProduct Version</td>
			<td>2020.3.1118</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>Progress® Kendo UI® Filter</td>
		</tr>
	</tbody>
</table>


## Description

I am planning to use filter component to model that contains an array, a collection. Is this possible?

## Solution

As a general rule, any data operations over an array as part of the model are not supported out of the box and may require a significant amount of custom code. The argument is that part of the collection meets the filter condition whilst the other part does not, the presence or absence of the item in the result set is a custom interpretation.

This means that a custom operator and custom filter handler is required. Currently, the custom operator is available only for primitive types and only for client-side filtering where a handler manages which items meet the custom filter criterion

1. Add a custom type, operator and editor

    ```
        { name: "Suppliers", type: "object", label: "Suppliers", defaultValue: [], editorTemplate: supplierDropDownEditor,  operators: {
              object:{
                customOperator:{
                  text: 'Contains Any Of',
                  handler: customOperatorHandler
                }
              } }},
    ```

1. Create the desired logic which will determine if the items are to be part of the result set or not

    ```
        function customOperatorHandler(itemValue, filterValue){
          var itemIds = itemValue.map(i=>i.Id);
          var filerIds = filterValue.map(f=>f.SupplierID);
          return itemIds.some(f=> filerIds.includes(f));
        }
    ```

```dojo
    <div id="example">
      <div id="filter"></div>
      <br />
      <br />
      <br />
      <div id="grid"></div>

      <script>
        var data = [{
          ProductID : 1,
          ProductName : "Chai",
          SupplierID : 1,
          CategoryID : 1,
          QuantityPerUnit : "10 boxes x 20 bags",
          UnitPrice : 18.0000,
          UnitsInStock : 39,
          UnitsOnOrder : 0,
          ReorderLevel : 10,
          Discontinued : false,
          Suppliers : [{
            Id : 3,
            Name : "Grandma Kelly's Homestead"
          }]
        }, {
          ProductID : 2,
          ProductName : "Chang",
          SupplierID : 1,
          CategoryID : 1,
          QuantityPerUnit : "24 - 12 oz bottles",
          UnitPrice : 19.0000,
          UnitsInStock : 17,
          UnitsOnOrder : 40,
          ReorderLevel : 25,
          Discontinued : false,
          Suppliers : [{
            Id : 1,
            Name : "Exotic Liquids"
          }, {
            Id : 2,
            Name : "New Orleans Cajun Delights"
          }]
        }]

        var dataSource = new kendo.data.DataSource({
          pageSize: 20,
          data: data,
          autoSync: true,
          schema: {
            model: {
              id: "ProductID",
              fields: {
                ProductID: { editable: false, nullable: true },
                ProductName: { validation: { required: true } },
                Suppliers: { type: "object", defaultValue: [] },
                UnitPrice: { type: "number", validation: { required: true, min: 1 } }
              }
            }
          }
        });

        $("#filter").kendoFilter({
          dataSource: dataSource,
          applyButton: true,
          fields: [
            { name: "Suppliers", type: "object", label: "Suppliers", defaultValue: [], editorTemplate: supplierDropDownEditor,  operators: {
              object:{
                customOperator:{
                  text: 'Contains Any Of',
                  handler: customOperatorHandler
                }
              } }},

            { name: "ProductName", label: "Product Name" },
            { name: "UnitPrice", type: "number", label: "Unit Price", editorTemplate: unitPriceEditor },
            { name: "UnitsInStock", type: "number", label: "Units In Stock" },
            { name: "QuantityPerUnit", label: "Quantity Per Unit" },
          ]
        });

        $("#grid").kendoGrid({
          dataSource: dataSource,
          pageable: true,
          height: 550,
          columns: [
            { field: "Suppliers", title: "Suppliers", width: "180px", template: "#=Suppliers.map(x=>x.Name).join(', ')#" },

            { field: "ProductName", title: "Product Name" },
            { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "130px" },
            { field: "UnitsInStock", title: "Units In Stock", width: "130px" },
            { field: "QuantityPerUnit", title: "Quantity Per Unit" }
          ]
        });
        function customOperatorHandler(itemValue, filterValue){
          var itemIds = itemValue.map(i=>i.Id);
          var filerIds = filterValue.map(f=>f.SupplierID);
          return itemIds.some(f=> filerIds.includes(f));
        }

        function unitPriceEditor(container, options) {
          $('<input data-bind="value: value" name="' + options.field + '"/>')
            .appendTo(container)
            .kendoNumericTextBox();
        }

        function supplierDropDownEditor(container, options) {
          $('<input style="width:200px" data-bind="value: value" name="' + options.field + '" style="width:100%"/>')
            .appendTo(container)
            .kendoMultiSelect({
            dataTextField: "CompanyName",
            dataValueField: "SupplierID",
            dataSource: {
              type: "odata",
              transport: {
                read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Suppliers"
              }
            }
          });
        }

      </script>
    </div>
```
