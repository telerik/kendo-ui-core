---
title: Using Nested Properties in Kendo UI TaskBoard
description: Learn how to use nested properties in the data of the Kendo UI TaskBoard.
type: how-to
page_title: How to Use Nested Properties in Kendo UI TaskBoard
slug: taskboard-using-nested-properties-kendo-ui-datasource
tags: kendo ui, taskboard, nested properties, datasource
res_type: kb
---

## Environment

|| Product | Version |
|---------|---------|
| Progress® Kendo UI® TaskBoard for jQuery | 2023.3.1114 |

## Description

How can the Kendo UI TaskBoard use nested properties in its data?

## Solution

Nested properties can be used in the Kendo UI TaskBoard. To configure this, you need to [set the schema.model.fields.fieldName.from property](/api/javascript/data/model/methods/define) of the DataSource to the specific nested item.

Here is an example of how to set up the dataSource with nested properties:

```dojo
<div id="taskBoard"></div>
<script>
$("#taskBoard").kendoTaskBoard({
  dataOrderField: "order",
  dataSource:{
    data: [
      { id: 1, order: 1, title: "Task 1", description: "Description 1", status: { value: "backlog" }, category: "red" },
      { id: 2, order: 2, title: "Task 11", description: "Description 11", status: { value: "backlog" }, category: "red" },
      { id: 3, order: 3, title: "Task 2", description: "Description 2", status: { value: "doing"}, category: "green" },
      { id: 4, order: 4, title: "Task 22", description: "Description 22", status: { value: "doing"}, category: "green" },
      { id: 5, order: 5, title: "Task 3", description: "Description 3", status: { value: "done"}, category: "blue" }
    ],
    schema: {
      model: {
        id: "id",
        fields: {
          id: {
            type: "int"
          },
          order: {
            type: "int"
          },
          title: {
            type: "string"
          },
          description: {
            type: "string"
          },
          status: {
            from: "status.value"  //Nested property defined
          },
          category: {
            type: "string"
          }
        }
      }
    },
  },
  columns: [
    { text: "Backlog", status: "backlog" },
    { text: "Doing", status: "doing" },
    { text: "Done", status: "done" }
  ]
});
</script>
```

For a working example, please refer to the following Progress Kendo UI Dojo: [Using Nested Properties in Kendo UI TaskBoard](https://dojo.telerik.com/ayeWaxep).
