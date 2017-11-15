---
title: Changing the Width of the Grid After Using AutoFitColumn Method Over All Grid Columns
description: An example for calculating the width of the Grid after using autoFitColumn
type: how-to
page_title: Calculating the New Width of the Kendo UI Grid After Using AutoFitColumn Method
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

How to change the width of the Grid after using the autoFitColumn method for all columns? 

## Solution

When the Grid is rendered and the autoFitColumn method is executed over all column, you could retrieve the calculated the total width of the columns, include the scrollbar width if the scrolling is enabled and manually set that total to the wrapping element of the Grid.

```html
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
