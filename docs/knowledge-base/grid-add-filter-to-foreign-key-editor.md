---
title: Grid Foreign Key DropDownList with Filter
description: How to Add a filter to the DropDownList of a Foreign Key Column in the Grid
type: how-to
page_title: Add Filter to the Foreign Key Column Editor
slug: grid-add-filter-to-foreign-key-editor
position:
tags: grid, foreign key , dropdown, filter, column
ticketid: 1148304
res_type: kb
---

## Environment
<table>
	<tr>
		<td>Product Version</td>
		<td>2019.1.220</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Grid for Progress® Kendo UI®</td>
	</tr>
</table>

## Description

I would like to enable the [`filter`](/api/javascript/ui/dropdownlist/configuration/filter) of the foreign key column DropDownListEditor. How can I do that?

## Solution

You may add the filter option but it will need to happen on the [`edit`](/api/javascript/ui/grid/events/edit) event of the Kendo UI Grid when the automatically generated Kendo UI DropDownList is initialized.

```dojo
	 <script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js" type="text/javascript"></script>
    <div id="example">
      <div id="grid"></div>

      <script>
        var categories = [{
          "value": 1,
          "text": "Beverages"
        },{
          "value": 2,
          "text": "Condiments"
        },{
          "value": 3,
          "text": "Confections"
        },{
          "value": 4,
          "text": "Dairy Products"
        },{
          "value": 5,
          "text": "Grains/Cereals"
        },{
          "value": 6,
          "text": "Meat/Poultry"
        },{
          "value": 7,
          "text": "Produce"
        },{
          "value": 8,
          "text": "Seafood"
        }];

        $(document).ready(function () {
          var dataSource = new kendo.data.DataSource({
            pageSize: 20,
            data: products,
            autoSync: true,
            schema: {
              model: {
                id: "ProductID",
                fields: {
                  ProductID: { editable: false, nullable: true },
                  ProductName: { validation: { required: true} },
                  CategoryID: { field: "CategoryID", type: "number", defaultValue: 1 },
                  UnitPrice: { type: "number", validation: { required: true, min: 1} }
                }
              }
            }
          });

          $("#grid").kendoGrid({
            dataSource: dataSource,
            filterable: true,
            sortable:true,
            groupable: true,
            pageable: true,
            height: 540,
            edit: function(e){
              var ddl = e.container.find("[data-role='dropdownlist']").data("kendoDropDownList");
              if(ddl){
                ddl.setOptions({filter: "contains"});
              }
            },
            toolbar: ["create"],
            columns: [
              { field: "ProductName", title: "Product Name", filterable:false },
              { field: "CategoryID", width: "200px", values: categories, title: "Category", filterable: { multi: true, search:true } },
              { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "200px", filterable:false},
              { command: "destroy", title: " ", width: "150px"}],
            editable: true
          });
        });
      </script>
    </div>
```