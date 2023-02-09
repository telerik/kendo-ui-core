---
title: Use ContextMenu on Grid Cell
description: Learn how to use the Kendo UI ContextMenu over a Kendo UI Grid row.
type: how-to
page_title: Use ContextMenu over Grid Row - Kendo UI Grid for jQuery
previous_url: /knowledge-base/how-to-use-context-menu-over-grid-row
slug: use-context-menu-over-grid-row
ticketid: 1114321
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td> 
 </tr>
</table>
 

## Description

I want to add a drill-down options functionality to a Grid cell and have it work in the following way:

1. Right-click a Grid cell.
1. View a ContextMenu with the available drillable options.
1. Once you click an action from the menu, I want to retrieve the sender cell parameters&mdash;for example, row id, column id, value, and others&mdash;depending on the action that is needed.

I achieve a similar functionality by using a tooltip which fires on a left-click and allows me to retrieve the sender-cell data through the `selected` method of the Grid. However, I want to improve this solution.

How can I append a Kendo UI ContextMenu to each cell or part of the cells in a Kendo UI Grid?

## Solution

1. Initialize the ContextMenu over the Grid rows. By default, the ContextMenu opens on right click on the mouse. This could be adjusted with the [`showOn`](api/javascript/ui/contextmenu/configuration/showon) property.
1. On the `select` event of the ContextMenu, retrieve the row information by using the `dataItem` method of the Grid.

The following example demonstrates how to achieve the desired scenario.

```dojo
    <div id="grid"></div>

    <ul id="context-menu">
      <li>Shown Row details</li>
    </ul>

    <script>
      $("#grid").kendoGrid({
        columns: ["name", "age"],
        dataSource: [ { name: "Jane", age: 31 }, { name: "John", age: 33 }]
      });

      $("#context-menu").kendoContextMenu({
        target: "#grid",
        filter: "tr[role='row']",
        select: function(e) {
          var grid = $("#grid").data("kendoGrid");
          var model = grid.dataItem(e.target);
          alert( model.age + " " + model.name);
        }
      });
    </script>
```

For more information, refer to:  
* [https://docs.telerik.com/kendo-ui/api/javascript/ui/grid\/methods/dataitem](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/dataitem)  
* [https://docs.telerik.com/kendo-ui/api/javascript/ui/contextmenu\/events/select](https://docs.telerik.com/kendo-ui/api/javascript/ui/contextmenu/events/select)  


