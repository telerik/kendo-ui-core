---
title: Show Grid Column Width while Resizing
description: Implement excel-like functionality in the Grid to display the width of the column while the user is resizing it.
type: how-to
page_title: Display Current Column Width on Resizing | Kendo UI Grid for jQuery
slug: grid-show-column-width-while-resizing
tags: grid, show, column, width, resize, resizable, tooltip, excel
ticketid: 1333477
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 </tr>
  <tr>
  <td>Created with Version</td>
  <td>2018.2.620</td>
 </tr>
 </tr>
</table>


## Description

I need a excel specification in our grid. When I am dragging the column it should show the scaling option of the grid column width - what is the current width of the dragged column.

## Solution

1. Add a handler to the grid `dataBound` event only once with the [`one()`](/api/javascript/observable/methods/one) method to avoid performance issues
1. Set the grid to `autoBind` false
1. Get the resizable widget instance and hook a handler function to the `resize` event and the `resizeend` event
1. In the function, show some styled HTML element, dynamically updating its position based on the width of the column
1. Make the data source read to force its data bound event 

    ```
        function notifyWidth(e){
          var th = $(e.currentTarget).data("th");
          var width = th.width();
          var left = $("#" + th.attr("id")).offset().left + width + 20;
          var top = $("#" + th.attr("id")).offset().top - 30;
          $("#notification").css({
            left: left,
            top:top
          }).text("Width: " + width + "px").show();
        } 

        grid.one("dataBound",function(e){
          this.resizable.bind("resize", function(e){
            notifyWidth(e);
          });
          this.resizable.bind("resizeend", function(e){
            $("#notification").fadeOut(700);
          });
        });

        grid.dataSource.read();
    ```

```dojo
    <h1>Resize any column to see column width</h1>
    <br /><br /><br />
    <div id="grid"></div>
    <div id="notification"></div>
    <style>
      #notification {
        position:absolute;
        border-radius: 5px;
        border-color:#d4e0f4;
        background-color: #d9e5f9;
        padding:5px;
        display:none;
      }
    </style>
    <script>
      function notifyWidth(e){
        var th = $(e.currentTarget).data("th");
        var width = th.width();
        var left = $("#" + th.attr("id")).offset().left + width + 20;
        var top = $("#" + th.attr("id")).offset().top - 30;
        $("#notification").css({
          left: left,
          top:top
        }).text("Width: " + width + "px").show();
      }

      var grid = $("#grid").kendoGrid({
        autoBind:false,
        columns: [ "id",
                  { field: "name" },
                  { field: "age" }
                 ],
        selectable:true,
        dataSource: [
          { id:1,name: "Jane Doe", age: 30 },
          { id:2, name: "John Doe", age: 33 }
        ],
        resizable: true,
        sortable:true
      }).data("kendoGrid");
      
      grid.one("dataBound",function(e){
        this.resizable.bind("resize", function(e){
          notifyWidth(e);
        });
        this.resizable.bind("resizeend", function(e){
          $("#notification").fadeOut(700);
        });
      });

      grid.dataSource.read();

    </script>
```
