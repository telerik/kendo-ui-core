---
title: Show Multiple Aggregates in Separate Cells in Grid Group Header
description: How to show multiple aggregates in the Grid group header and align them with the Grid columns
type: how-to
page_title: Align Group Header Template with Grid Columns
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

* Show other column aggregates in group header row. 
* Control the colspan and show the aggregation in the specific columns.

## Solution

Using the `aggregates` field in the [`groupHeaderTemplate`](/api/javascript/ui/grid#configuration-columns.groupHeaderTemplate), you can access all available aggregates.

To display the different aggregates in separate cells aligned with the columns, you need to do the following:

1. Generate the group header template with the number of cells that you need in order to align it with the Grid columns, but leave out the first opening `<td>` tag and the last closing one.
	This is needed because the template is rendered within a single `<td></td>` in the group header.
	
	```
	    { field: "age", groupHeaderTemplate: "Names: #=aggregates.name.count#</td><td>Age: #= value #</td><td> Completed Tasks: #:aggregates.tasksCompleted.sum # " }
	```
1. Use the Grid `dataBound` event to correct the `colspan` of the first cell in the group header:
	 
	```
	    dataBound: function(e){
            var firstCell = e.sender.element.find(".k-grouping-row td:first-child");
  	        firstCell.attr("colspan", 2);
	    }
	```

Following, you can see a full example demonstrating this approach:

```html
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