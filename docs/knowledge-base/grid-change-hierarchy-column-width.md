---
title: Set the Width of Details Column with Hierarchy in Grid
description: An example on how to change the width of the hierarchy column in the Kendo UI Grid.
type: how-to
page_title: Change the Width of the Hierarchy Column Cell | Kendo UI Grid
slug: grid-change-hierarchy-column-width
tags: grid, hierarchy, column width, change
ticketid: 1149333
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product Version</td>
		<td>2018.1 117</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Progress Kendo UI Wrappers for React</td>
	</tr>
</table>


## Description

How can I set the width of details column when for each detail level too much space gathers to the right?

## Solution

Depending on the theme, the hierarchy column applies a different width. For example, in the new Kendo UI Default SASS theme, the detail column with the expand arrow is `32px`.

To change the column with the hierarchy cell, use the following CSS selector to target it.

```
<style>
  .k-grid .k-hierarchy-col {
    width: 20px;
  }
</style>
```

The following example demonstrates how to implement the suggested approach.

```dojo
<style>
      .k-grid .k-hierarchy-col {
        width: 120px;
      }
    </style>
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
              name:"Lavazza", distributors: [{name: "Coca-Cola"}]
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
```
