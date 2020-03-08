---
title: Copy and Paste Multiple Rows from Excel to the Grid
description: An example on how to copy and paste rows from Excel to Kendo UI Grid.
type: how-to
page_title: Copy-Paste Multiple Rows with CRUD Operations | Kendo UI Grid for jQuery
slug: grid-paste-data-from-excel-batch-edit
tags: grid, excel, copy, paste, multiple, rows, batch, edit, crud
ticketid: 1133411
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
</table>


## Description

I am trying to implement the copy-and-paste functionality for multiple rows from Excel to the Kendo UI Grid. I am using the example on [copying data from Excel](https://docs.telerik.com/kendo-ui/controls/data-management/grid/how-to/excel/copy-from-excel-to-grid), but after I paste them, none of the events fire andit takes much time to add rows.

How can I enable the copying of multiple rows from Excel and pasting them in the Grid?

## Solution

1. Configure the CRUD operations for the Grid in which you want to implement the copy-paste functionality by using a [`batch`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/configuration/batch) data source to send all the requests at once.

1. Adjust the width and height of the text area to exclude the pager and the scrollbar.

    ```
    if($(e.target).hasClass("k-link") || $(e.target).hasClass("k-grid-toolbar")){
      return;
    }

    // crete a textarea element which will act as a clipboard
    var textarea = $("<textarea>");
    // position the textarea on top of the grid and make it transparent
    textarea.css({
      position: 'absolute',
      opacity: 0,
      top: offset.top,
      left: offset.left,
      border: 'none',
      width: $(this).find("table").width(),
      height: $(this).find(".k-grid-content").height()
    })
    ```

1. To add a native Kendo UI look and feel, add the dirty indicator to each new item and its fields.

    ```
    dataBound: function(e){
      var grid = this;
      var rows = grid.items();
      rows.each(function(idx, row){
       var dataItem = grid.dataItem(row);
       if(dataItem.isNew()){
        var td = $(row).find("td");
        td.each(function(idx, cell){
         if($(cell).text()){
           $(cell).prepend("<span class='k-dirty'></span>");
         }
        })
       }
      })
     }
    ```

## Full Implementation  

The following example demonstrates the full implementation of the approach.

```dojo
     <div id="example">
      <p>Click the grid to edit it or right click to paste edit</p>
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
              batch: true,
              pageSize: 10,
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

        var grid = $("#grid").kendoGrid({
          dataSource: dataSource,
          dataBound: function(e){
            var grid = this;
            var rows = grid.items();
            rows.each(function(idx, row){
              var dataItem = grid.dataItem(row);
              if(dataItem.isNew()){
                var td = $(row).find("td");
                td.each(function(idx, cell){
                  if($(cell).text()){
                    $(cell).prepend("<span class='k-dirty'></span>");
                  }
                })
              }
            })
          },
          toolbar: ["save"],
          height: 550,
          sortable: true,
          pageable: true,
          editable: true,
          columns: [
            { field: "ProductID", title: "Product ID", width: 100 },
            { field: "ProductName", title: "Product Name" },
            { field: "UnitPrice", title: "Unit Price", width: 150 },
          ]
        }).on('contextmenu', function (e) {
          // avoid the grid pager, headers and toolbar
          if($(e.target).is(".k-link, .k-grid-toolbar, .k-grid-pager")){
            return;
          }
          // Get the position of the Grid.
          var offset = $(this).find("table").offset();
          // Crete a textarea element which will act as a clipboard.
          var textarea = $("<textarea>");
          // Position the textarea on top of the Grid and make it transparent.
          textarea.css({
            position: 'absolute',
            opacity:0,
            top: offset.top,
            left: offset.left,
            border: 'none',
            width: $(this).find("table").width(),
            height: $(this).find(".k-grid-content").height()
          })
          .appendTo('body')
          .on("click", function(e){
            // in case user clicks to edit but the context menu is open and the textarea is over the grid's body
            textarea.remove();
           $(document.elementFromPoint(e.clientX, e.clientY)).click();
          })
          .on('paste', function () {
            setTimeout(function () {
              var value = $.trim(textarea.val());
              var grid = $("[data-role='grid']").data("kendoGrid");
              var rows = value.split('\n');
              var data = [];

              for (var i = 0; i < rows.length; i++) {
                var cells = rows[i].split('\t');
                var newItem = {
                  ProductName: cells[0],
                  UnitPrice: cells[1]
                }
                grid.dataSource.insert(0,newItem);
              };
              textarea.remove();
            });            
          }).focus();          
        });
      </script>
    </div>
```
