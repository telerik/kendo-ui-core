---
title: Week Numbers
page_title: jQuery Calendar Documentation | Week Numbers
description: "Get started with the jQuery Calendar by Kendo UI and define its first rendered view."
slug: weeknum_kendoui_calendar
position: 6
---

# Week Numbers

You can configure the Calendar to display the week number and also use the week number template to customize the cells in the **Week** column.

## Rendering of Week Numbers

The [`weekNumber`](/api/javascript/ui/calendar/configuration/weeknumber) option enables the Calendar to display the week number on an annual base to the left side of month view and as a separate column.

```dojo
   <div id="calendar"></div>
   <script>
    $("#calendar").kendoCalendar({
		weekNumber: true
	});
  </script>
```

## Customizing Week Column Cells

The week-number template intends to customize the cells in the **Week** column. By default, the Calendar renders the calculated week of the year.

The Calendar provides the following properties in the `data` object:

* `currentDate`&mdash;Returns the first date of the current week.
* `weekNumber`&mdash;The calculated week number.

You can use these properties in the template to make additional calculations.

    <style>
      .italic{
        font-style: italic;
      }
    </style>
    <body>

    <div id="calendar"></div>
    <script id="week-template" type="text/x-kendo-template">
       <a class="italic">#= data.weekNumber #</a>
    </script>
    <script>
      $("#calendar").kendoCalendar({
        weekNumber: true,
        month: {
          weekNumber: $("#week-template").html()
        }
      });
    </script>

## See Also

* [Week Number Column in the Calendar (Demo)](https://demos.telerik.com/kendo-ui/calendar/week-column)
* [JavaScript API Reference of the Calendar](/api/javascript/ui/calendar)
