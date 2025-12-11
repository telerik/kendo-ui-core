---
title: Locking TaskBoard Items to Prevent Movement
description: Learn how to lock specific task board items or all items within a column to prevent them from being moved in Progress® Kendo UI® TaskBoard.
type: how-to
page_title: How to Lock TaskBoard Items in Kendo UI for Preventing Movement
slug: how-to-lock-taskboard-items-kendo-ui
tags: kendo-ui, taskboard, lock, prevent, move, drag
res_type: kb
components: ["taskboard"]
ticketid: 1672436
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Progress® Kendo UI® TaskBoard</td>
</tr>
<tr>
<td>Version</td>
<td>2024.4.1112</td>
</tr>
</tbody>
</table>

## Description

I need to lock a specific task board item to prevent it from being moved. I also want to lock all board items in a column to stop them from being moved. This knowledge base article also answers the following questions:
- How can I disable dragging for a specific item in a TaskBoard?
- What is the method to prevent items in a specific column from being moved in TaskBoard?
- Can I conditionally restrict movement of TaskBoard items?

## Solution

To lock specific TaskBoard items or all items within a column and prevent them from being moved, use the `moveStart` event. The `moveStart` event allows you to conditionally prevent dragging operations based on the item's title or the column's text.

To achieve this, follow the steps below:

1. Attach a handler to the TaskBoard's `moveStart` [event](https://docs.telerik.com/kendo-ui/api/javascript/ui/taskboard/events/movestart).
2. Within the `moveStart` event handler, use the event's `card` and `column` properties to identify the item or column.
3. Call `ev.preventDefault()` to cancel the move operation based on your condition.

### Preventing Specific Item from Being Moved

To prevent a specific item titled "Task 1" from being dragged:

```javascript
moveStart: function (ev) {
  if(ev.card.get("title") === "Task 1") {
    ev.preventDefault();
  }
}
```

### Preventing All Items in a Column from Being Moved

To lock all items in the "Backlog" column:

```javascript
moveStart: function (ev) {
  if(ev.column.get("text") === "Backlog") {
    ev.preventDefault();
  }
}
```

By utilizing the `moveStart` event and the provided code snippets, you can effectively lock specific TaskBoard items or all items within a column to ensure they cannot be moved.

For a runnable demonstration, refer to the below Dojo demo.

```dojo
<div id="taskBoard"></div>
<script>
  $("#taskBoard").kendoTaskBoard({
    dataOrderField: "order",
    dataSource: [
      { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
      { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
      { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
      { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
      { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
    ],
    columns: [
      { text: "Backlog", status: "backlog" },
      { text: "Doing", status: "doing" },
      { text: "Done", status: "done" }
    ],
    moveStart: function (ev) {
      //prevent Task 1 from dragging
      if(ev.card.get("title") === "Task 1") {
        ev.preventDefault();
      }
      
      //prevent Backlog column from dragging
      if(ev.column.get("text") === "Backlog") {
        ev.preventDefault();
      }
    }
  });
</script>
```

## See Also

- [TaskBoard MoveStart Event Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/taskboard/events/movestart)
- [Progress® Kendo UI® TaskBoard Overview](https://docs.telerik.com/kendo-ui/controls/scheduling/taskboard/overview)
