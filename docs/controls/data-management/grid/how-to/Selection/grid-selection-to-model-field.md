---
title: Bind Selection to Model Field with Checkbox Column
page_title:  Bind Selection to Model Field with Checkbox Column | Kendo UI Grid
description: "Learn how to select a Kendo UI Grid row with a checkbox column bound to a model field."
slug: howto_bind_selection_to_model_field
---

# Bind Selection to Model Field with Checkbox Column

The example below demonstrates how to select a Kendo UI Grid row using a checkbox bound to a field from the model. After checking/unchecking the chechbox, an Update request will be initiated to update the boolean field in the model. 

###### Example 1: SelectAll in the header will update the boolean field in all pages (suitable for scenario with limited amount of records)

```html
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
              { field: "Discontinued", width: 120, template: "<input type='checkbox' data-bind='checked:Discontinued' />", headerTemplate: "<input id='checkAll' type='checkbox' onclick='checkAll(this)'/>" },
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

###### Example 2: SelectAll in the header will update the boolean field on the current page only (suitable for scenario with many records)

```html
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
              { field: "Discontinued", width: 120, template: "<input type='checkbox' data-bind='checked:Discontinued' />", headerTemplate: "<input id='checkAll' type='checkbox' onclick='checkAll(this)'/>" },
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

Other articles on the Kendo UI Grid and how-to examples on the selection functionality:

* [JavaScript API Reference](/api/javascript/ui/grid)
* [How to Persist Row Selection while Paging, Sorting, and Filtering]({% slug howto_persist_row_selection_paging_sorting_filtering_grid %})
* [How to Prevent Selection for Checkbox Cells]({% slug howto_prevent_selection_checkbox_cells_grid %})
* [How to Select Multiple Rows with Checkboxes]({% slug howto_select_multiple_rowswith_checkboxes_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
