---
title: Grid Foreign Key DropDown Editor with Filter TextBox
description: An example on how to customize the built-in dropdownlist editor of the foreign key column to include a filter in the Kendo UI Grid.
type: how-to
page_title: Grid Foreign Key DropDown Editor with Filter | Kendo UI Grid for jQuery
slug: grid-foreign-key-dropdown-with-filter
tags: grid, fk, foreign, key, dropdown, filter, contains, search, custom, edit
ticketid: 1148304
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Made with Version</td>
  <td>2016.3 1028</td>
 </tr>
</table>


## Description

How can I have a [`filter`](/api/javascript/ui/dropdownlist/configuration/filter) textbox in the dropdown list editor in the Grid foreign key column?

## Solution

You may add the filter option in the [`edit`](/api/javascript/ui/grid/events/edit) event of the Kendo UI Grid when the automatically generated Kendo UI DropDownList is initialized.

```
  edit: function(e){
    var ddl = e.container.find("[data-role='dropdownlist']").data("kendoDropDownList");
    if(ddl){
      ddl.setOptions({filter: "contains"});
    }              		
  },
```

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
