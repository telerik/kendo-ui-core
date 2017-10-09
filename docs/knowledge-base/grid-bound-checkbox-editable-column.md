---
title: Checkbox column inside a grid bound and editable
description: Checkbox editable column bound to the model in grid
type: how-to 
page_title: Checkboxes bound to model in editable Kendo UI Grid
slug: grid-bound-checkbox-editable-column
position:
tags: checkbox,template,column,grid,boolean,bound,dirty flag,edit mode,batch,editable
ticketid: 1132606
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Kendo UI Grid</td>
 </tr>
 <tr>
</table>


## Description 

I want to have a checkbox that is bound to the model in my grid that works as expected with editing and batch=true.

## Solution

The grid has two modes - read and edit. Its read mode displays the text of the dataItems, in edit mode, it renders the appropriate editor and binds to its dataItem property value. This means that even though we render an editor as a template, the grid will still create the respective editor when in edit mode.This is the reason why we need to do a few things programmatically.

1. Column configuration

```
columns:[
    { field: "Discontinued", template: '<input type="checkbox" #= Discontinued ? \'checked="checked"\' : "" # class="chkbx" />', width: 110 },
]
```

2. Handle the change event of the template checkbox 

```
$("#grid .k-grid-content").on("change", "input.chkbx", function(e) {
    var grid = $("#grid").data("kendoGrid"),
    dataItem = grid.dataItem($(e.target).closest("tr"));
    // add the dirty flag to the cell
    $(e.target).closest("td").prepend("<span class='k-dirty'></span>");

    // use equals, not the set() method because set will trigger the change event of the data source and the grid will rebind
    dataItem.Discontinued = this.checked;

    // mark the item as dirty so it will be added to the next update request
    dataItem.dirty = true;
 });
```

```html
        <div id="grid"></div>
    <script>
      var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service",
          dataSource = new kendo.data.DataSource({
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
            filter:{ field: "Discontinued", operator: "eq", value: true },
            batch: true,
            pageSize: 20,
            schema: {
              model: {
                id: "ProductID",
                fields: {
                  ProductID: { editable: false, nullable: true },
                  ProductName: { validation: { required: true } },
                  UnitPrice: { type: "number", validation: { required: true, min: 1} },
                  Discontinued: { type: "boolean" },
                  UnitsInStock: { type: "number", validation: { min: 0, required: true } }
                }
              }
            }
          });

      $("#grid").kendoGrid({
        dataSource: dataSource,
        filterable:true,
        pageable: true,
        height: 430,
        toolbar: ["create", "save", "cancel"],
        columns: [
          "ProductName",
          { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: 110 },
          { field: "UnitsInStock", title: "Units In Stock", width: 110 },
          { field: "Discontinued", template: '<input type="checkbox" #= Discontinued ? \'checked="checked"\' : "" # class="chkbx" />', width: 110 },
          { command: "destroy", title: "&nbsp;", width: 100 }],
        editable: true,
        edit:function(e){
        	if(e.container.find("input[type='checkbox']")){
          	this.closeCell();
          }
        }
      });

      $("#grid .k-grid-content").on("change", "input.chkbx", function(e) {
        var grid = $("#grid").data("kendoGrid"),
            dataItem = grid.dataItem($(e.target).closest("tr"));
        		$(e.target).closest("td").prepend("<span class='k-dirty'></span>");
        		dataItem.Discontinued = this.checked;
        		dataItem.dirty = true;
      });
    </script>
```
