---
title: Switch Between Day, Week, Month, and Year Views in the Gantt
description: Learn how to configure and switch between different timeline views in the Kendo UI for jQuery Gantt component using custom view selector buttons.
type: how-to
page_title: Configure and Switch Gantt Timeline Views - Kendo UI for jQuery Gantt
slug: gantt-views
tags: gantt, views, day, week, month, year, timeline, switch
res_type: kb
components: ["gantt"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Gantt for jQuery</td>
 </tr>
</table>

## Description

How can I configure the Kendo UI for jQuery Gantt to support Day, Week, Month, and Year views and allow users to switch between them with custom buttons?

## Solution

The Gantt component supports multiple built-in views (`day`, `week`, `month`, `year`) via its [`views`](https://docs.telerik.com/kendo-ui/api/javascript/ui/gantt/configuration/views) configuration. To switch views programmatically, use the [`view`](https://docs.telerik.com/kendo-ui/api/javascript/ui/gantt/methods/view) method.

The following approach demonstrates how to:

1. Configure the Gantt with all four view types and set Month as the default using `selected: true`.
2. Create custom view selector buttons outside the Gantt.
3. Handle the [`navigate`](https://docs.telerik.com/kendo-ui/api/javascript/ui/gantt/events/navigate) event to keep the custom buttons synchronized when the user switches views from the built-in view tabs.

### Initialize the Gantt with Views

```javascript
var tasksData = [
    { id: 1, title: "Project Plan", parentId: null, orderId: 0, start: new Date("2024-07-14"), end: new Date("2024-08-31"), percentComplete: 0.52, summary: true, expanded: true },
    { id: 2, title: "Research Phase", parentId: 1, orderId: 0, start: new Date("2024-07-14"), end: new Date("2024-07-20"), percentComplete: 1, summary: false, expanded: true },
    { id: 3, title: "Design Phase", parentId: 1, orderId: 1, start: new Date("2024-07-08"), end: new Date("2024-07-19"), percentComplete: 1, summary: false, expanded: true },
    { id: 4, title: "Development", parentId: 1, orderId: 2, start: new Date("2024-07-18"), end: new Date("2024-08-16"), percentComplete: 0.6, summary: true, expanded: true },
    { id: 5, title: "Backend Development", parentId: 4, orderId: 0, start: new Date("2024-07-18"), end: new Date("2024-08-02"), percentComplete: 0.75, summary: false, expanded: true },
    { id: 6, title: "Frontend Development", parentId: 4, orderId: 1, start: new Date("2024-07-29"), end: new Date("2024-08-16"), percentComplete: 0.45, summary: false, expanded: true },
    { id: 7, title: "Testing & QA", parentId: 1, orderId: 3, start: new Date("2024-08-07"), end: new Date("2024-08-17"), percentComplete: 0.2, summary: false, expanded: true },
    { id: 8, title: "Deployment & Launch", parentId: 1, orderId: 4, start: new Date("2024-08-16"), end: new Date("2024-08-24"), percentComplete: 0, summary: false, expanded: true }
];

var dependenciesData = [
    { id: 1, predecessorId: 2, successorId: 3, type: 1 },
    { id: 2, predecessorId: 3, successorId: 4, type: 1 },
    { id: 3, predecessorId: 5, successorId: 6, type: 3 },
    { id: 4, predecessorId: 6, successorId: 7, type: 1 },
    { id: 5, predecessorId: 7, successorId: 8, type: 1 }
];

$("#gantt").kendoGantt({
    dataSource: {
        data: tasksData,
        schema: {
            model: {
                id: "id",
                fields: {
                    id: { from: "id", type: "number" },
                    parentId: { from: "parentId", type: "number", defaultValue: null },
                    orderId: { from: "orderId", type: "number" },
                    title: { from: "title", type: "string" },
                    start: { from: "start", type: "date" },
                    end: { from: "end", type: "date" },
                    percentComplete: { from: "percentComplete", type: "number" },
                    summary: { from: "summary", type: "boolean" },
                    expanded: { from: "expanded", type: "boolean", defaultValue: true }
                }
            }
        }
    },
    dependencies: {
        data: dependenciesData,
        schema: {
            model: {
                id: "id",
                fields: {
                    id: { from: "id", type: "number" },
                    predecessorId: { from: "predecessorId", type: "number" },
                    successorId: { from: "successorId", type: "number" },
                    type: { from: "type", type: "number" }
                }
            }
        }
    },
    views: [
        "day",
        "week",
        { type: "month", selected: true },
        "year"
    ],
    columns: [
        { field: "id", title: "ID", width: 50 },
        { field: "title", title: "Title", editable: true, sortable: true },
        { field: "start", title: "Start Time", format: "{0:MM/dd/yyyy}", width: 100 }
    ],
    height: 430,
    showWorkHours: false,
    showWorkDays: false,
    snap: false,
    editable: false,
    navigate: function (e) {
        var viewName = e.view;
        $(".gantt-view-btn").removeClass("active");
        $(".gantt-view-btn[data-view='" + viewName + "']").addClass("active");
    }
});
```

### Add Custom View Selector Buttons

```html
<div class="gantt-view-buttons">
    <button type="button" class="gantt-view-btn" data-view="day">Day</button>
    <button type="button" class="gantt-view-btn" data-view="week">Week</button>
    <button type="button" class="gantt-view-btn active" data-view="month">Month</button>
    <button type="button" class="gantt-view-btn" data-view="year">Year</button>
</div>
```

### Handle View Switching

```javascript
$(".gantt-view-btn").on("click", function () {
    var gantt = $("#gantt").data("kendoGantt");
    var selectedView = $(this).data("view");

    $(".gantt-view-btn").removeClass("active");
    $(this).addClass("active");

    gantt.view(selectedView);
});
```

For a runnable example, refer to this [Gantt Views dojo sample](https://dojo.telerik.com/yvHzwCaj).

## See Also

* [Gantt Views Configuration](https://docs.telerik.com/kendo-ui/api/javascript/ui/gantt/configuration/views)
* [Gantt view() Method](https://docs.telerik.com/kendo-ui/api/javascript/ui/gantt/methods/view)
* [Gantt Navigate Event](https://docs.telerik.com/kendo-ui/api/javascript/ui/gantt/events/navigate)
* [Kendo UI for jQuery Gantt Demos](https://demos.telerik.com/kendo-ui/gantt)
