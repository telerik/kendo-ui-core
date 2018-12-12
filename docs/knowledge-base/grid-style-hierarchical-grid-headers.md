---
title: Apply Different Style for Multi-level Hierarchical Grid Headers
description: An example how to style different levels of detail Kendo UI Grids with CSS.
type: how-to
page_title: Style Hierarchical Grid Headers | Kendo UI Grid
slug: grid-style-hierarchical-grid-headers
tags: grid, headers, style, css, hierarchy, detail, kendo
ticketid: 1142385
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid for ASP.NET MVC</td>
 </tr>
 <tr>
  <td>Product</td>  <td>Progress® Kendo UI® Grid</td>
 </tr>
</table>


## Description

I have a four-level hierarchical Kendo UI MVC Grid.

How can I provide different header styles for each level of the Grid?

## Solution 

Use the following CSS rules to style a simple four-level Kendo UI Grid. These rules rely on the number of the nested levels of Grids, that is, they target `".k-grid tbody"`, and do not count on custom class names. 

```
<style>
  /* second level grid header */
  .k-grid tbody .k-grid .k-grid-header .k-header{
    background-color: lightblue;
  }

  /* third level grid header */
  .k-grid tbody .k-grid tbody .k-grid .k-grid-header .k-header {
    background-color: yellowgreen;
  }

  /* forth level grid header */
  .k-grid tbody .k-grid tbody .k-grid tbody .k-grid .k-grid-header .k-header {
    background-color: orange;
  }
</style>
```

```dojo
<div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "name" }
        ],
        dataSource: [{
          name: "Beverages",
          products: [{
            name: "Tea",
            brands: [{
              name: "PG tips", distributors: [{name:"Tesco"},{name: "Sainsbury's"}]
            },{
              name: "Lipton", distributors: [{name: "ASDA"}, {name: "Iceland"}]}]
          },{
            name: "Coffee",
            brands: [{
              name:"Lavaza", distributors: [{name: "Coca-Cola"}]
            },{
              name: "Kenco", distributors: [{name: "ASDA"}, {name: "Morrisons"}]}]
          }]},{
            name: "Food",
            products: [{
              name: "Ham", brands: [{ name: "Cook's ham"},{ name: "Honey and mustard breaded ham"}]
            },{
              name: "Bread", brands:[{ name: "KingsMill"},{ name: "Hovis"}]
            }]
          }],
        detailTemplate: 'Products: <div class="second-level-grid"></div>',
        detailInit: function(e) {
          e.detailRow.find(".second-level-grid").kendoGrid({
            dataSource: e.data.products,
            columns: ["name"],
            detailTemplate: 'Brands: <div class="third-level-grid"></div>',
            detailInit: function(e){
              e.detailRow.find(".third-level-grid").kendoGrid({
                dataSource: e.data.brands,
                columns:["name"],
                detailTemplate: 'Distributors: <div class="fourth-level-grid"></div>',
                detailInit: function(e){
                  e.detailRow.find(".fourth-level-grid").kendoGrid({
                    dataSource: e.data.distributors,
                  })
                }
              })
            }
          })
        }
      });
    </script>
    <style>
      /* second level grid header */
      .k-grid tbody .k-grid .k-grid-header .k-header{
        background-color: lightblue;
      }

      /* third level grid header */
      .k-grid tbody .k-grid tbody .k-grid .k-grid-header .k-header {
        background-color: yellowgreen;
      }

      /* forth level grid header */
      .k-grid tbody .k-grid tbody .k-grid tbody .k-grid .k-grid-header .k-header {
        background-color: orange;
      }
    </style>
```
