---
title: Change the Width after Using AutoFitColumn Method over All Grid Columns
description: An example on how to calculate the width of the Kendo UI Grid after using the autoFitColumn method.
type: how-to
page_title: Calculate New Width after Using AutoFitColumn Method | Kendo UI Grid for jQuery
slug: grid-change-wrapper-width-after-autofitcolumn
tags: kendoui, kendo, grid, column width, grid width
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

How can I change the width of the Grid after using the `autoFitColumn` method for all Grid columns?

## Solution

When the Grid is rendered and you execute the `autoFitColumn` method over all of its columns:
1. Retrieve the calculated total width of the columns
1. If scrolling is enabled, include the scrollbar width.
1. Manually set that total to the wrapping element of the Grid.

```dojo
<div id="example">
            <table id="grid">
                <colgroup>
                  <col><col><col><col>                  
                <thead>
                   <tr>                     
                     <th data-field="col1">Size</th>
                     <th data-field="col2">TKN (N.m)</th>
                     <th data-field="col3">L (mm)</th>
                     <th data-field="col4">Ø A (mm)</th>                    
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td data-label="Size">KB2/1</td>
                    <td data-label="TKN (N.m)">0.1</td>
                    <td data-label="L (mm)">25</td>
                    <td data-label="Ø A (mm)">10</td>                    
                  </tr>
                  <tr>
                    <td data-label="RowProduct">2</td>
                    <td data-label="Size">KB2/5</td>
                    <td data-label="TKN (N.m)">0.5</td>
                    <td data-label="L (mm)">21</td>                    
              </tbody>
            </table>
            <script>
                $(document).ready(function() {
                    $("#grid").kendoGrid({                        
                        sortable: true,
                      scrollable:true,
                      resizable:true,
                      filterable: true
                    });
                  var grid = $("#grid").data("kendoGrid");                  
                  for (var i = 0; i < grid.columns.length; i++) {
                      grid.autoFitColumn(i);
                  }
                  var currentWrapperWidth = grid.element.parent().width();
                  var currentTableWidth = grid.element.width();
                  if(currentWrapperWidth > currentTableWidth)
                  grid.element.closest(".k-grid").width(currentTableWidth + 17);
                });
            </script>
        </div>
```
