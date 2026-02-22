---
title: Formatting Time from Gantt Chart Tooltip in Kendo UI for jQuery
description: Learn how to customize the Gantt chart tooltip to display dates without time and configure the Gantt to focus on days and weeks in Kendo UI for jQuery.
type: how-to
page_title: Customize Gantt Chart Tooltip to Show Dates Without Time in Kendo UI for jQuery
slug: hide-time-gantt-chart-tooltip-kendo-ui-jquery
tags: kendo, ui, jquery, gantt, chart, tooltip, date, format
res_type: kb
components: ["gantt"]
ticketid: 1630677
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Progress® Kendo UI® Gantt for Kendo UI for jQuery</td>
</tr>
<tr>
<td>Version</td>
<td>2025.1.211</td>
</tr>
</tbody>
</table>

## Description
I want to hide the timestamp from Planned Start, Planned End, Start, and End in the Kendo UI for jQuery Gantt Chart Tooltip. Additionally, I am interested in completely hiding or blocking time from the Gantt chart as my work focuses on days and weeks without considering time.

This knowledge base article also answers the following questions:
- How can I display only the date in the Gantt chart tooltip without the time?
- Is there a way to configure the Gantt chart to focus on days and weeks, omitting time?
- How to format dates in the Gantt chart tooltip to exclude time information?

## Solution
To customize the tooltip content in the Gantt chart and display dates without the time component, use a [`tooltip template`](/api/javascript/ui/gantt/configuration/tooltip#tooltiptemplate). In the template, format the dates according to your preference, excluding time. The following example demonstrates how to format the start date of a task to display only the date part:

```javascript
template: ({ task, title }) => `Title: ${kendo.htmlEncode(task.title)}\
                                                  </br>\
                                                 ${kendo.toString(task.start, 'D')}`
```

This customization applies date formatting to the tooltip content, specifically to the start date, using the 'D' format specifier, which displays the date without the time.

For more information on date formatting options and how to apply them, refer to the [Date Formatting - Kendo UI Globalization - Kendo UI for jQuery](https://www.telerik.com/kendo-jquery-ui/documentation/globalization/intl/dateformatting) article.

For a runnable demontsration, please refer to the below Dojo example:
```dojo
<div id="gantt"></div>
<script>
$("#gantt").kendoGantt({
tooltip: {
  visible: true,
  template: ({ task, title }) => `Title: ${kendo.htmlEncode(task.title)}\
                                  </br>\
                                  ${kendo.toString(task.start, 'D')}`
},
dataSource: [{
    id: 1,
    orderId: 0,
    parentId: null,
    title: "Task1",
    start: new Date("2014/6/17 9:00"),
    end: new Date("2014/6/17 11:00")
  }]
});
</script>
```

Additionally, to focus the Gantt chart on days and weeks without time, ensure that your Gantt chart configuration and data source do not include specific time information, and adjust the Gantt's views to emphasize day or week views.

## See Also
- [Gantt Overview - Kendo UI for jQuery](https://docs.telerik.com/kendo-ui/controls/gantt/overview)
- [Globalization - Kendo UI for jQuery](https://docs.telerik.com/kendo-ui/globalization/)
