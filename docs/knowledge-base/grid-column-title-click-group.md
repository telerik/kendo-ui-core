---
title: Get Grid Column Title upon Cell Selection
description: An example demonstrating how to get the title of a column when selecting a cell 
type: how-to
page_title: Obtain Column Name of Grouped Grid When Cell is Selected | Kendo UI Grid
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

How can I get the name of a column when a user clicks on one of its cells even if the Kendo UI Grid is using grouping? 

## Solution

During the Kendo UI Grid's [change event](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/change), here are the steps to get the column name when a cell is selected:
1.  Reference the Grid.
2.  Obtain the [selected cell](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/select) and its [index](https://api.jquery.com/index/).
3.  [Find](https://api.jquery.com/find/) the table header DOM element and [get the data-title attribute](https://www.w3schools.com/jsref/met_element_getattribute.asp).

```
    change: function(e) {
      var grid = e.sender;
      var cellIndex = grid.select().index();
      var columnTitle = grid.thead.find('th')[cellIndex].getAttribute("data-title");
    }
```

The following demonstrates when a user clicks on a cell in a Kendo UI Grid, the column name will appear in the [console](https://www.w3schools.com/jsref/met_console_log.asp).

```html
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

          //1 Reference the Grid.
          var grid = e.sender;

          //2 Obtain the selected cell's index.
          var cellIndex = grid.select().index();

          //3 Find the table header DOM element and get the data-title attribute.
          var columnTitle = grid.thead.find('th')[cellIndex].getAttribute("data-title");
          console.log(columnTitle);
        }
      });
    </script>
```

## Notes

This approach does not support multi-column headers.

## See Also

* [Kendo Grid - Selection Demo](https://demos.telerik.com/kendo-ui/grid/selection)
* [Kendo Grid - API Demo](https://demos.telerik.com/kendo-ui/grid/api)
