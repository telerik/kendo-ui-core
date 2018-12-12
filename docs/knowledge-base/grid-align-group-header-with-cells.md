---
title: Show Multiple Aggregates in Separate Cells in Grid Group Header
description: An example on how to show multiple aggregates in the group header of a Kendo UI Grid and align them with the Grid columns.
type: how-to
page_title: Align Group Header Template with Columns | Kendo UI Grid
slug: grid-align-group-header-cells
tags: grid, grouping, aggregates, template
ticketid: 1142332
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
</table>


## Description

I am looking for a way to:

* Show other column aggregates in the group header row.
* Control the `colspan` setting and show the aggregation in the specific columns.

## Solution

Access all available aggregates by using the `aggregates` field in the [`groupHeaderTemplate`](/api/javascript/ui/grid/configuration/columns.groupheadertemplate).

To display the different aggregates in separate cells that are aligned with the columns:

1. Generate the group header template with the number of cells and align it with the Grid columns. Leave out the first opening and the last closing `<td>` tags, because the template is rendered within a single `<td></td>` in the group header.

	```
	    { field: "age", groupHeaderTemplate: "Names: #=aggregates.name.count#</td><td>Age: #= value #</td><td> Completed Tasks: #:aggregates.tasksCompleted.sum # " }
	```

1. Correct the `colspan` of the first cell in the group header by using the `dataBound` event of the Grid:

	```
	    dataBound: function(e){
            var firstCell = e.sender.element.find(".k-grouping-row td:first-child");
  	        firstCell.attr("colspan", 2);
	    }
	```

The following example demonstrates the full implementation of the suggested approach.

```dojo
    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "name"},
          { field: "age",
           groupHeaderTemplate: "Names: #=aggregates.name.count#</td>"+
           "<td>Age: #= value #</td><td> Completed Tasks: #:aggregates.tasksCompleted.sum #"
          },
          { field: "tasksCompleted", title: "tasks"}
        ],
        dataSource: {
          data: [
            { name: "Jane Doe", age: 30, tasksCompleted: 3 },
            { name: "John Doe", age: 30, tasksCompleted: 5 },
            { name: "Jane Doe", age: 25, tasksCompleted: 2 },
            { name: "John Doe", age: 20, tasksCompleted: 6 }
          ],
          group: { field: "age", aggregates: [
            { field: "name", aggregate: "count" },
            { field: "tasksCompleted", aggregate: "sum" }
          ]}
        },
        dataBound: function(e){
          var firstCell = e.sender.element.find(".k-grouping-row td:first-child");
          firstCell.attr("colspan", 2);
        }
      });
    </script>
```
