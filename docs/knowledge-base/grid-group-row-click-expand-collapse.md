---
title: Expand and Collapse Group on Group Row Click in Grid
description: An example on how to expand and collapse the group rows by clicking the group rows in the Kendo UI Grid.
type: how-to
page_title: Click the Group Row and Expand and Collapse the Group | Kendo UI Grid for jQuery
slug: grid-group-row-click-expand-collapse
tags: grid, group, click, expand, collapse, row
ticketid: 1158121
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>Created with 2018.1.221 version</td>
 </tr>
</table>

## Description

How can I expand and collapse the group rows by clicking the relevant group row in the Kendo UI Grid? I need the whole row to be clickable.

## Solution

1. To use the whole grouping row of the Kendo UI Grid to collapse and expand groups, you could add a `click` handler which targets them and then programmatically find and click the expand/collapse icons.

    ```
        $(".k-grouping-row").on("click", function(e){
            $(e.target).find(".k-icon").click();
        });
    ```
1. To indicate that it the row is "clickable", then also add a CSS rule for the row:

    ```css
        .k-grouping-row {
            cursor:pointer;
        }
    ```

```dojo
    <div id="grid"></div>
    <script>
        var grid = $("#grid").kendoGrid({
          columns: [
            { field: "name" },
            { field: "age",
              groupHeaderTemplate: "Age: #= value # total: #= count #"
            }
          ],
          dataSource: {
            data: [
              { name: "Jane Doe", age: 30 },
              { name: "John Doe", age: 30 }
            ],
            group: { field: "age", aggregates: [ { field: "age", aggregate: "count" }] }
          }
        }).data("kendoGrid");


        $(".k-grouping-row").on("click", function(e){
          $(e.target).find(".k-icon").click();
        });
    </script>
    
    <style>
      .k-grouping-row {
        cursor:pointer;
      }
    </style>
```

## See Also

* [Expand and Collapse Details on Master Row Click in Grid]({% slug grid-master-row-click-expand-collapse-detail %})