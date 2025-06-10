---
title: Display Aggregation from ContextMenu in Grid
page_title: Display Aggregation from ContextMenu in Grid - Kendo UI for jQuery Grid
description: "Learn how to display specific aggregation from a ContextMenu in the Kendo UI Grid for jQuery."
slug: display-aggregation-from-contextmenu-in-grid
tags: grid, contextmenu, aggregation
component: grid
type: how-to
ticketid: 1607509
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td>
 </tr>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® ContextMenu for jQuery</td>
 </tr>
</table>

## Description

How can I display a specific aggregation by selecting it from a ContextMenu in the footer of the Grid?

## Solution

- Add an empty span with custom class as a [`footerTemplate`](/api/javascript/ui/grid/configuration/columns.footertemplate) in each column of the Grid.

```js
columns: [
   {
     field: ...,
     title: ...,
     footerTemplate: "<span class='ft'></span>",
   },
]
```

- In the [`select`](/api/javascript/ui/contextmenu/events/select) event of the ContextMenu component find the current column index, the field of the selected column and the Grid [`aggregates`](/api/javascript/data/datasource/methods/aggregate#aggregates). 

```js
 select: function(e){
    var colindex = $(e.target).index();
    var currentField = $("#grid").data('kendoGrid').options.columns[colindex].field;
    var selected = e.item.innerText;
    var aggregates = $("#grid").data('kendoGrid').dataSource.aggregates();
    var aggregatesCurrentField = aggregates[currentField];
    var currentAggr = '';

    ...
 }
```
- Based on the selected value in the ContextMenu, find the needed aggregate.

```js
    if (selected == 'Total' && aggregatesCurrentField){
      currentAggr = aggregatesCurrentField.sum;
    } else if (selected == 'Average' && aggregatesCurrentField){
      currentAggr = aggregatesCurrentField.average;
    } else {
      currentAggr = 'No such aggr';
    }
```

- Construct a string, containing the needed information, and use it to change the content of the footerTemplate of the respective column. 

```js
    var content = selected + ": " + currentAggr;
    $('.ft:eq('+ colindex +')').text(content);
```

The following example demonstrates the full implementation of the suggested approach:

```dojo
<div id="example">
      <ul id="context-menu">
        <li>Total
        </li>
        <li>Average
        </li>
      </ul>
      <div id="grid"></div>
      <script>
        $(document).ready(function() {
          $("#grid").kendoGrid({
            dataSource: {
              type: "odata-v4",
              transport: {
                read: "https://demos.telerik.com/service/v2/odata/Orders"
              },
              schema: {
                model: {
                  fields: {
                    OrderID: { type: "number" },
                    Freight: { type: "number" },
                    ShipName: { type: "string" },
                    OrderDate: { type: "date" },
                    ShipCity: { type: "string" }
                  }
                }
              },
              pageSize: 10,
              aggregate: [
                { field: "Freight", aggregate: "sum" },
                { field: "Freight", aggregate: "average" },
                { field: "OrderID", aggregate: "sum" },
                { field: "OrderID", aggregate: "average" }
              ]
            },
            sortable: true,
            filterable: true,
            pageable: true,
            sort: function(e) {
              let originalEvent = event;

              if($(originalEvent.target).is("#menuTarget")) {
                e.preventDefault();
              }
            },
            columns: [
              {
                field:"OrderID",
                headerTemplate: "<span id='menuTarget' class='k-icon k-i-more-vertical'></span><a class='k-link' href='#'>Amount</a>",
                footerTemplate: "<span class='ft'></span>",
              },
              {
                field: "ShipCity",
                title: "Ship City",
                footerTemplate: "<span class='ft'></span>",
              },
              {
                field: "Freight",
                title: "Freight",
                footerTemplate: "<span class='ft'></span>",
              }
            ]
          });

          $("#context-menu").kendoContextMenu({
            target: "#grid",
            filter: "td",
            alignToAnchor: true,
            copyAnchorStyles: false,
            showOn: "click",
            select: function(e){

               var colindex = $(e.target).index()
               var currentField = $("#grid").data('kendoGrid').options.columns[colindex].field
               var selected = e.item.innerText
               var aggregates = $("#grid").data('kendoGrid').dataSource.aggregates()
               var aggregatesCurrentField = aggregates[currentField];
              	console.log(aggregatesCurrentField);
               var currentAggr = ''

               if(selected == 'Total' && aggregatesCurrentField){
                 currentAggr = aggregatesCurrentField.sum
               } else if(selected == 'Average' && aggregatesCurrentField){
                 currentAggr = aggregatesCurrentField.average
               } else {
                 currentAggr = 'No such aggr'
               }
                
               var content = selected + ": " + currentAggr;
              $('.ft:eq('+ colindex +')').text(content)             

            }
          });
        });
      </script>
    </div>
```

## See Also
* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
* [JavaScript API Reference of the ContextMenu](/api/javascript/ui/contextmenu)