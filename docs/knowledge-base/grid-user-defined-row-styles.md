---
title: Dynamic User Defined Grid Row Styles
description: An example on how to dynamically change the grid row background and hover styles based on user selected values.
type: how-to
page_title: User Selected Row Styles | Kendo UI Grid for jQuery
slug: grid-user-defined-row-styles
tags: grid, user, selected, defined, value, background, hover, rows, colorpicker, dynamic. color
ticketid: 1425657
res_type: kb
component: grid, colorpicker
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Created with version</td>
  <td>2019.2.619</td>
 </tr>
</table>


## Description

We have requirement to change the kendo grid style (background color, font color,active row color etc.). We could achieve changing the style of kendo grid by overriding the kendo classes in a CSS file. But we want to achieve the same via javascript to allow our users to make their own style changes to the rows. 

## Solution

To apply the custom background to odd and even rows, you can use the built-in functionality. The Kendo UI Grid decorates every other row with the `.k-alt` class. To make the styling dynamic and based on user selection we could: 

1. Use a couple of ColorPickers
1. Handle their [`change`](/api/javascript/ui/colorpicker/events/change) event
1. Add the color via inline styles on `mousover` and then again on `mouseout` events

    ```
        var background = $("#background").kendoColorPicker({
          value: "grey",
          change: function(e){
            $("tr.k-alt").css({
              backgroundColor: e.value
            }).on("mouseover", function(){
              this.style.backgroundColor =  hover.value();
            });
          }
        }).data("kendoColorPicker");

        var hover = $("#hover").kendoColorPicker({
          value: "red",
          change: function(e){
            $("tr.k-alt").on("mouseover", function(){
              this.style.backgroundColor = e.value;
            }).on("mouseout", function(){
              this.style.backgroundColor = background.value();
            });
          }
        }).data("kendoColorPicker");
    ```

```dojo
    <style>
      tr.k-alt {
        color: white;
        background-color: grey !important; 
      }

      tr.k-alt:active,
      tr.k-alt:hover {
        color: white;
        background-color: red;
      }
    </style>
    <div>
        Background<div id="background"></div>
        Hover<div id="hover">< /div>
        </div><br /><br />
        <div id="grid"></div>
        <script>
            var background = $("#background").kendoColorPicker({
              value: "grey",
              change: function(e){
                $("tr.k-alt").css({
                  backgroundColor: e.value
                }).on("mouseover", function(){
                  this.style.backgroundColor =  hover.value();
                });
              }
            }).data("kendoColorPicker");

            var hover = $("#hover").kendoColorPicker({
              value: "red",
              change: function(e){
                $("tr.k-alt").on("mouseover", function(){
                  this.style.backgroundColor = e.value;
                }).on("mouseout", function(){
                  this.style.backgroundColor = background.value();
                });
              }
            }).data("kendoColorPicker");

            $("#grid").kendoGrid({
              columns: [ {
                field: "name",
                title: "Name"
              },{
                field : "age"
              }],
              dataSource: [ { name: "Jane Doe", age : 42 }, 
                           { name: "John Doe" ,age : 13},
                           { name: "Sam Smith",age : 23 },
                           { name: "Robert" ,age : 45},
                           { name: "Tom" ,age : 14}]
            });
        </script>
```

## See Also

* [Style Grid Table Rows and Cells Based on Values]({% slug howto_customize_rowsand_cells_basedon_dataitem_values_grid %})