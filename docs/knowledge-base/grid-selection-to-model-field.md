---
title: Bind Selection to Model Field with Checkbox Column
page_title: Bind Selection to Model Field | Kendo UI Grid for jQuery
description: "An example on how to select a row with a checkbox column that is bound to a model field in the Kendo UI Grid for jQuery."
previous_url: /controls/data-management/grid/how-to/Selection/grid-selection-to-model-field
slug: howto_bind_selection_to_model_field
tags: grid, bind, selection, model, field, checkbox, column
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>All</td>
 </tr>
</table>

## Description

How can I select a row with a checkbox column that is bound to a model field in the Kendo UI Grid for jQuery?

## Solution

Your project might require you to select a Kendo UI Grid row by using a checkbox which is bound to a field from the model.

After the user checks or unchecks the checkbox, an `update` request initiates and it updates the Boolean field in the model.

The following example demonstrates how `SelectAll` that is located in the header updates the Boolean field in `all pages`. This approach is suitable for scenarios with a limited number of records.

```dojo
<style>
    html { font-size: 14px; font-family: Arial, Helvetica, sans-serif; }
    [role='gridcell']{
      box-shadow: none!important;
    }
</style>

<div id="example">
    <div id="grid"></div>
</div>
<script>
    $(document).ready(function () {
        var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service",
            dataSource = new kendo.data.DataSource({
                autoSync: true,
                transport: {
                    read:  {
                        url: crudServiceBaseUrl + "/Products",
                        dataType: "jsonp"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/Products/Update",
                        dataType: "jsonp"
                    },
                    destroy: {
                        url: crudServiceBaseUrl + "/Products/Destroy",
                        dataType: "jsonp"
                    },
                    create: {
                        url: crudServiceBaseUrl + "/Products/Create",
                        dataType: "jsonp"
                    },
                    parameterMap: function(options, operation) {
                        if (operation !== "read" && options.models) {
                            return {models: kendo.stringify(options.models)};
                        }
                    }
                },
                batch: true,

                pageSize: 10,
                schema: {
                    model: {
                        id: "ProductID",
                        fields: {
                            ProductID: { editable: false, nullable: true },
                            ProductName: { validation: { required: true } },
                            UnitPrice: { type: "number", validation: { required: true, min: 1} },
                            Discontinued: { type: "boolean", editable: true },
                            UnitsInStock: { type: "number", validation: { min: 0, required: true } }
                        }
                    }
                }
            });

        $("#grid").kendoGrid({
            dataSource: dataSource,
            navigatable: true,
            pageable: true,
            columns: [
              { field: "Discontinued", width: 120, template: "<input type='checkbox' class='k-checkbox k-checkbox-md k-rounded-md' data-bind='checked:Discontinued' />", headerTemplate: "<input id='checkAll' type='checkbox' class='k-checkbox k-checkbox-md k-rounded-md' onclick='checkAll(this)'/>" },
                "ProductName",
                { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: 120 },
                { field: "UnitsInStock", title: "Units In Stock", width: 120 },                            
                { command: "destroy", title: "&nbsp;", width: 150 }],
            dataBound: function(e){
              e.sender.items().each(function(){
                var dataItem = e.sender.dataItem(this);
                kendo.bind(this, dataItem);
                if(dataItem.Discontinued){
                  $(this).addClass("k-state-selected");
                }
              })

              $("#checkAll")[0].checked = e.sender.items().find(":checked").length == e.sender.dataSource.view().length;
            }
        });
    });

      function checkAll(input){
        var grid = $("#grid").data("kendoGrid");
        var data = grid.dataSource.data();

        data.forEach(function(dataItem){
          if(dataItem.Discontinued != input.checked){
            dataItem.Discontinued = input.checked;
            dataItem.dirty = true;
          }
        })
        grid.dataSource.sync();
      }
</script>
```

The following example demonstrates how `SelectAll` that is located in the header updates the Boolean field on the `current page` only. This approach is suitable for scenarios with a great number of records.

```dojo
<style>
    html { font-size: 14px; font-family: Arial, Helvetica, sans-serif; }
    [role='gridcell']{
      box-shadow: none!important;
    }
</style>

<div id="example">
    <div id="grid"></div>
</div>
<script>
    $(document).ready(function () {
        var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service",
            dataSource = new kendo.data.DataSource({
                autoSync: true,
                transport: {
                    read:  {
                        url: crudServiceBaseUrl + "/Products",
                        dataType: "jsonp"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/Products/Update",
                        dataType: "jsonp"
                    },
                    destroy: {
                        url: crudServiceBaseUrl + "/Products/Destroy",
                        dataType: "jsonp"
                    },
                    create: {
                        url: crudServiceBaseUrl + "/Products/Create",
                        dataType: "jsonp"
                    },
                    parameterMap: function(options, operation) {
                        if (operation !== "read" && options.models) {
                            return {models: kendo.stringify(options.models)};
                        }
                    }
                },
                batch: true,

                pageSize: 10,
                schema: {
                    model: {
                        id: "ProductID",
                        fields: {
                            ProductID: { editable: false, nullable: true },
                            ProductName: { validation: { required: true } },
                            UnitPrice: { type: "number", validation: { required: true, min: 1} },
                            Discontinued: { type: "boolean", editable: true },
                            UnitsInStock: { type: "number", validation: { min: 0, required: true } }
                        }
                    }
                }
            });

        $("#grid").kendoGrid({
            dataSource: dataSource,
            navigatable: true,
            pageable: true,
            columns: [
              { field: "Discontinued", width: 120, template: "<input type='checkbox' class='k-checkbox k-checkbox-md k-rounded-md' data-bind='checked:Discontinued' />", headerTemplate: "<input id='checkAll' type='checkbox' class='k-checkbox k-checkbox-md k-rounded-md' onclick='checkAll(this)'/>" },
                "ProductName",
                { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: 120 },
                { field: "UnitsInStock", title: "Units In Stock", width: 120 },                            
                { command: "destroy", title: "&nbsp;", width: 150 }],
            dataBound: function(e){
              e.sender.items().each(function(){
                var dataItem = e.sender.dataItem(this);
                kendo.bind(this, dataItem);
                if(dataItem.Discontinued){
                  $(this).addClass("k-state-selected");
                }
              })

              $("#checkAll")[0].checked = e.sender.items().find(":checked").length == e.sender.dataSource.view().length;
            }
        });
    });

  function checkAll(input){
    var grid = $("#grid").data("kendoGrid");
    var items = grid.items();
    items.each(function(){
     var dataItem = grid.dataItem(this);
      if(dataItem.Discontinued != input.checked){
        dataItem.Discontinued = input.checked;
        dataItem.dirty = true;
      }
    })
    grid.dataSource.sync();
  }
</script>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
