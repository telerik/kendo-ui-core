---
title: Get Grid Column Title upon Cell Selection
description: An example on how to get the title of a column when selecting a cell in the Kendo UI Grid.
type: how-to
page_title: Obtain Column Name of Grouped Grid When Cell Is Selected | Kendo UI Grid for jQuery
slug: grid-column-title-click-group
tags: grid, column, title, click, group
ticketid: 1072636
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2018.2.516</td>
 </tr>
</table>

## Description

How can I get the name of a column when a user clicks one of its cells even if the Kendo UI Grid is using grouping?

## Solution

During the [`change`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/change) event of the Grid:
1.  Reference the Grid.
2.  Obtain the [selected cell](/api/javascript/ui/grid/methods/select) and its [index](https://api.jquery.com/index/).
3.  [Find](https://api.jquery.com/find/) the DOM element of the table header and [get the attribute of the data title](https://www.w3schools.com/jsref/met_element_getattribute.asp).

> The suggested approach is not applicable to multi-column headers.

```
    change: function(e) {
      var grid = e.sender;
      var cellIndex = grid.select().index();
      var columnTitle = grid.thead.find('th')[cellIndex].getAttribute("data-title");
    }
```

The following example demonstrates how to display the column name in the [console](https://www.w3schools.com/jsref/met_console_log.asp) when the user clicks a Grid cell.

```dojo
    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        dataSource: [
          { id: 1, name: "John", age: 33},
          { id: 2, name: "Jane", age: 34},
          { id: 3, name: "Jack", age: 35},
          { id: 4, name: "Judy", age: 53}
        ],
        columns: [{
          field: "id",
          title: "Column One"
        },{
          field: "name",
          title: "Column Two"
        },{
          field: "age",
          title: "Column Three"
        }],
        filterable: true,
        selectable: "cell",
        groupable: "true",
        change: function(e) {

          // Reference the Grid.
          var grid = e.sender;

          // Obtain the selected cell's index.
          var cellIndex = grid.select().index();

          // Find the table header DOM element and get the data-title attribute.
          var columnTitle = grid.thead.find('th')[cellIndex].getAttribute("data-title");
          console.log(columnTitle);
        }
      });
    </script>
```

## See Also

* [Demo on Kendo UI Grid Selection](https://demos.telerik.com/kendo-ui/grid/selection)
* [Demo on Using the Kendo UI Grid API](https://demos.telerik.com/kendo-ui/grid/api)
