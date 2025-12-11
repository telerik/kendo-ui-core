---
title: Enabling Automatic Scrolling for TaskBoard During Drag-and-Drop
description: Learn how to implement automatic scrolling for TaskBoard in Kendo UI for jQuery while dragging tasks.
type: how-to
page_title: Implementing Automatic Scrolling for Kendo UI for jQuery TaskBoard
meta_title: Automatic Scrolling for Kendo UI for jQuery TaskBoard During Drag-and-Drop
slug: automatic-scrolling-taskboard-drag-drop
tags: taskboard,kendo ui for jquery,scrolling,drag-and-drop,move-event,scrollleft
res_type: kb
components: ["taskboard"]
ticketid: 1703783
---

## Environment

<table>
<tbody>
<tr>
<td> Product </td>
<td>
Kendo UI for jQuery TaskBoard
</td>
</tr>
<tr>
<td> Version </td>
<td>
2025.4.1111
</td>
</tr>
</tbody>
</table>

## Description

I am developing an interface with [TaskBoard](https://www.telerik.com/kendo-jquery-ui/documentation/controls/taskboard/overview) in Kendo UI for jQuery. When I drag a task and try to drop it onto a column that is hidden, the component does not scroll automatically to reveal hidden columns.

This knowledge base article also answers the following questions:
- How to enable TaskBoard scrolling during drag-and-drop?  
- How to programmatically scroll the TaskBoard while dragging a task?  
- How to implement auto-scroll for hidden columns in TaskBoard?  

## Solution

Automatic scrolling of TaskBoard during drag-and-drop is not supported out of the box. Implement custom logic using the [`move`](/api/javascript/ui/taskboard/events/move) event of the TaskBoard and programmatically modify the scroll position using the `scrollLeft()` method.

### Steps to Implement Automatic Scrolling:

1. Subscribe to the `move` event of the TaskBoard.  
   Refer to the [move event documentation](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/taskboard/events/move).

2. Within the event handler, programmatically update the scroll position of the TaskBoard's container using the `scrollLeft()` method. The logic calculates the offset to focus the hidden column.

   Example code snippet:
   ```javascript
   move: function (e) {
       let col = e.columnElement;
       let columnsContainer = e.sender.columnsContainer;
       columnsContainer.scrollLeft(col.offset().left - col.width() / 2);
   },
   ```

3. Test the implementation and ensure it meets your requirements. Note that this is a custom solution and may introduce side effects. Handle these scenarios as needed.

### Live Demo

Explore the full implementation in the example below

```dojo

    <div id="example">
      <div class="demo-section wide">
        <div id="taskBoard"></div>
      </div>
    </div>

    <script>
      var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core";

      $("#taskBoard").kendoTaskBoard({
        columnSettings: {
          dataTextField: "Text",
          dataStatusField: "Status",
          dataOrderField: "Order",
        },
        columns: {
          transport: {
            read: {
              url: crudServiceBaseUrl + "/taskboard/columns",
            },
          },
          schema: {
            model: {
              id: "ID",
              fields: {
                ID: { type: "number" },
                Text: { type: "string" },
                Status: { type: "string", defaultValue: "todo" },
                Order: { type: "number" },
              },
            },
          },
        },
        dataCategoryField: "Category",
        dataDescriptionField: "Description",
        dataTitleField: "Title",
        dataStatusField: "Status",
        dataOrderField: "Order",
        dataSource: {
          transport: {
            read: {
              url: crudServiceBaseUrl + "/taskboard",
            },
            update: {
              // Update operation is required in order for cards to be moved across columns
              url: crudServiceBaseUrl + "/taskboard/update",
              method: "POST",
            },
          },
          schema: {
            model: {
              id: "ID",
              fields: {
                ID: { type: "number" },
                Category: { type: "string", defaultValue: "lowpriority" },
                Description: { type: "string" },
                Title: { type: "string", validation: { required: true } },
                Status: { type: "string", defaultValue: "todo" },
                Order: { type: "number" },
              },
            },
          },
        },
        resources: [
          {
            field: "Category",
            title: "Priority",
            dataSource: [
              { value: "urgent", text: "Urgent", color: "orange" },
              { value: "highpriority", text: "High Priority", color: "blue" },
              { value: "lowpriority", text: "Low Priority", color: "green" },
            ],
          },
        ],
        editable: false,
        cardMenu: false,
        height: 750,
        move: function (e) {
          let col = e.columnElement;
          let columnsContainer = e.sender.columnsContainer;
          columnsContainer.scrollLeft(col.offset().left - col.width() / 2);
        },
      });
    </script>

    <style>
      .demo-section.wide {
        max-width: 1025px;
      }

      .k-taskboard-drag-hint {
        font:
          400 14px Arial,
          Helvetica,
          sans-serif;
      }
    </style>

```

## See Also

- [TaskBoard Overview](https://www.telerik.com/kendo-jquery-ui/documentation/controls/taskboard/overview)  
- [TaskBoard API](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/taskboard)  
- [scrollLeft() jQuery API](https://api.jquery.com/scrollLeft/)  

