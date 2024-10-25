---
title: Add Multi-Check Filter to Grid in Row Mode
description: Learn how to enable the multi-check filter in a Kendo UI Grid
type: how-to
page_title: Implement Multi-Checkbox Filter in Row-Filterable Grid - Kendo UI for jQuery Data Grid
slug: filter-multi-check-row-filter
tags: checkbox, filter, row, multi, kendo, grid
ticketid: 1123045
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td> 
 </tr>
</table>


## Description

My Grid uses row mode for filtering. I need the `FilterMultiCheck` to appear in the filter row and not in the header.

    filterable: {  
        mode: 'row'  
    },

How can I implement a multi-selection filter in a column Grid which is in a row-filterable mode?

## Suggested Workarounds

The Kendo UI Grid does not provide a built-in solution for achieving this behavior. However, you can still work around the issue.

Move the built-in menu to the filter row and, if not needed, hide the rest of the filter menus from the headers:

1. At Grid level, set `filterable` to `"menu, row"` mode. Initiate the `FilterMultiCheck` in the header of the Grid by using the [`column.filterable.multi`](/api/javascript/ui/grid/configuration/columns.filterable.multi).
1. Add an event handler to the [`dataBound`](/api/javascript/ui/grid/events/databound) event of the Grid.  
1. Look for the `MultiFilterCheck` in the header.
1. Find the desired filter row cell and replace its content with `MultiFilterCheck`.
1. To give it the same look and feel as the neighboring cells, wrap it in a span through `"class='k-button k-button-icon k-dropdown-wrap"`.   
1. Copy the following code:

    ```
    dataBound: function(e){

      var multifilter = e.sender.thead.find("th[data-field='name']>a");
      var ageFilter = e.sender.thead.find("th[data-field='age']>a").hide();

      if(multifilter){
        $("span[data-field='name']").first().replaceWith(multifilter);
        multifilter.wrap("<span class='k-button k-button-icon k-dropdown-wrap'></span>");
      }
    }
    ```

The following example demonstrates the complete implementation of the suggested approach.

```dojo
    <style>
      .nameFilter{
        height:10px;
      }
      .nameFilter > .k-grid-filter-menu {
        height:10px !important;
        padding: 0;
        left: 0;
        bottom: 0px !important;
      }
    </style>
  
    <div id="grid"></div>
    <script>
      var grid = $("#grid").kendoGrid({
        columns: [
          {
            field: "name" ,
            filterable: {
              multi:true,
              cell: {
                showOperators:false
              }
            }
          },
          { field: "age" }
        ],
        filterable: {
          mode: "menu, row"
        },
        dataSource: {
          data: [
            { name: "Jane Doe", age: 30 },
            { name: "John Doe", age: 33 }
          ],
          schema:{
            model:{
              fields:{
                age: { type:"number" }
              }
            }
          }
        },
        dataBound: function(e){
          var multifilter = e.sender.thead.find("th[data-field='name']>a");
          var ageFilter = e.sender.thead.find("th[data-field='age']>a").hide();
          if(multifilter){
            $("span[data-field='name']").first().replaceWith(multifilter);
            multifilter.wrap("<span class='nameFilter k-button k-button-icon k-dropdown-wrap'></span>");
          }
        }
      }).data("kendoGrid");
    </script>
```
