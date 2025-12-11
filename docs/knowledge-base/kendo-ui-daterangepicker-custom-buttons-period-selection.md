---
title: Adding Buttons to Select Periods in Kendo UI DateRangePicker
description: Learn how to add custom buttons within the Kendo UI DateRangePicker to select specific time periods.
type: how-to
page_title: Custom Buttons for Selecting Periods in Kendo UI DateRangePicker
slug: kendo-ui-daterangepicker-custom-buttons-period-selection
tags: kendo-ui, daterangepicker, buttons, period-selection, custom-ranges
res_type: kb
components: ["daterangepicker"]
ticketid: 1688253
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Progress® Kendo UI® DateRangePicker</td>
</tr>
<tr>
<td>Version</td>
<td>2025.2.520</td>
</tr>
</tbody>
</table>

## Description

I want to add buttons within the [Kendo UI DateRangePicker](https://docs.telerik.com/kendo-ui/api/javascript/ui/daterangepicker/overview) that allow users to select specific time periods, such as "Today", "Last 7 Days", or "This Month". However, the DateRangePicker does not provide built-in options for adding custom buttons or templates for this functionality.

This knowledge base article also answers the following questions:
- How can I customize the footer of Kendo UI DateRangePicker?
- How to add predefined date ranges in Kendo UI DateRangePicker?
- Can I add custom buttons to Kendo UI DateRangePicker?

## Solution

To achieve the desired behavior, handle the [`open`](/api/javascript/ui/daterangepicker/methods/open) event of the DateRangePicker only the first time it is fired. Use this event to append custom buttons to the footer using the `.k-calendar-footer` class. Then, initialize the appended elements as buttons and implement custom logic for each.

### Steps

1. Use the [`one`](/api/javascript/observable/methods/one) method to ensure the `open` event is handled only once.
2. Append custom button elements to the `.k-calendar-footer` container in the event handler.
3. Initialize the appended elements as Kendo UI buttons.
4. Add functionality to each button to set predefined date ranges using the `range` method.

### Example

```dojo
<div class="k-d-flex k-justify-content-center" style="padding-top: 54px">
      <div class="k-w-300">
        <div id="daterangepicker" title="daterangepicker"></div>
      </div>
    </div>
    <script>
      $(document).ready(function () {
        var dateRangePicker = $("#daterangepicker")
          .kendoDateRangePicker({
            calendarButton: true,
            clearButton: true,
          })
          .data("kendoDateRangePicker");

        dateRangePicker.one("open", function () {
          $(".k-calendar-footer").append(
            '<button id="todayBtn">Today</button><button id="last7Btn">Last 7 Days</button><button id="thisMonthBtn">This Month</button>',
          );

          $("#todayBtn").kendoButton({
            themeColor: "success",
            click: function () {
              var today = new Date();
              dateRangePicker.range({ start: today, end: today });
            },
          });

          $("#last7Btn").kendoButton({
            themeColor: "warning",
            click: function () {
              var end = new Date();
              var start = new Date();
              start.setDate(end.getDate() - 6);
              dateRangePicker.range({ start: start, end: end });
            },
          });

          $("#thisMonthBtn").kendoButton({
            themeColor: "primary",
            click: function () {
              var start = new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                1,
              );
              var end = new Date(
                new Date().getFullYear(),
                new Date().getMonth() + 1,
                0,
              );
              dateRangePicker.range({ start: start, end: end });
            },
          });
        });
      });
    </script>
```

### Notes

- The `.k-calendar-footer` class is used to target the footer section of the DateRangePicker popup.
- The `range` method sets the selected date range programmatically.

## See Also

- [Kendo UI DateRangePicker Overview](https://docs.telerik.com/kendo-ui/controls/daterangepicker/overview)
- [Kendo UI Button Overview](https://docs.telerik.com/kendo-ui/controls/button/overview)
- [Kendo UI DateRangePicker API](https://docs.telerik.com/kendo-ui/api/javascript/ui/daterangepicker)
- [Kendo UI Button API](https://docs.telerik.com/kendo-ui/api/javascript/ui/button)
