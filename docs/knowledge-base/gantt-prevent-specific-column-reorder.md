---
title: Prevent Specific Columns from Reordering in the Gantt Treelist  
description: "An example on how to prevent a specific column from reordering in the KendoUI for jQuery Gantt."
type: how-to
page_title: Prevent Specific Columns Reorder in the Gantt
slug: gantt-prevent-column-reorder
tags: kendo, jquery, gantt, prevent, column, reorder
res_type: kb
component: gantt
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI for jQuery Gantt</td>
 </tr>
</table>


## Description

How can I prevent a specific Gantt column from reordering?

## Solution

To achieve the desired scenario, use the [`reorderColumn`](https://docs.telerik.com/kendo-ui/api/javascript/ui/treelist/methods/reordercolumn) of the integrated TreeList to move the column back. 

```dojo
    <div id="gantt"></div>
    <script>
      var nonReordableColumn;

      var gantt = $("#gantt").kendoGantt({
        columns: ["title", "start", "end"],
        dataSource: [{
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }],

        dataBound: function(e){
          nonReordableColumn = e.sender.list.columns[0];
        },
        reorderable: true,
        columnReorder: function(e) {
          if(e.column.title === nonReordableColumn.title){
            setTimeout(function(){
              var ganttList = $(".k-treelist").data("kendoGanttList");
              ganttList.reorderColumn(0, nonReordableColumn)
            },1)

          }
        }
      }).data("kendoGantt");
    </script>
```

## See Also

* [Kendo UI for jQuery Gantt API Reference](/api/javascript/ui/gantt) 
* [Common Issues in Kendo UI for jQuery]({% slug troubleshooting_common_issues_kendoui %})