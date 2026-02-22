---
title: Displaying One Month in DateRangePicker
description: Learn how to configure the Kendo UI for jQuery DateRangePicker to display only one month when opened.
type: how-to
page_title: Configuring DateRangePicker to Show Only One Month
meta_title: Configuring DateRangePicker to Show Only One Month
slug: daterangepicker-show-one-month
tags: daterangepicker, kendo-ui-for-jquery, open-event, multiviewcalendar, views
res_type: kb
components: ["daterangepicker"]
ticketid: 1699094
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Kendo UI for jQuery DateRangePicker</td>
</tr>
<tr>
<td>Version</td>
<td>2025.3.825</td>
</tr>
</tbody>
</table>

## Description

I want the Kendo UI for jQuery [DateRangePicker](https://docs.telerik.com/kendo-ui/api/javascript/ui/daterangepicker) to display only one month when opened instead of two months. This behavior is needed to simplify the selection view for users.

This knowledge base article also answers the following questions:
- How to customize DateRangePicker to show one month only?
- How to modify the MultiViewCalendar used in DateRangePicker?
- How to hide the second month's calendar in DateRangePicker?

## Solution

To achieve this behavior, handle the [`open`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/daterangepicker/events/open) event of the DateRangePicker. In the event handler, customize the internal MultiViewCalendar by setting its [`views`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/multiviewcalendar/configuration/views) option to `1`. Use the following code snippet:

```javascript
$("#daterangepicker").kendoDateRangePicker({
    open: function(e) {
        // Hide the second month's calendar table
        $('.k-calendar-table:eq(1)').hide();
        
        // Adjust the calendar header to show only the first month's title
        let monthTitle = $('.k-calendar-header .k-button-text').text().split('-')[0].trim();
        $('.k-calendar-header .k-button-text').text(monthTitle);
        
        // Set the calendar views option to display only one month
        $("#daterangepicker").data('kendoDateRangePicker').dateView.calendar.options.views = 1;
    }
});
```

This will ensure that only one month is displayed when the DateRangePicker is opened. You can test this configuration in the example below:

```dojo
<div id="daterangepicker" title="daterangepicker"></div>
    <script>
      $(document).ready(function () {       
        $("#daterangepicker")
          .kendoDateRangePicker({
            open: function (e) {
              $(".k-calendar-table:eq(1)").hide();
              let monthTitle = $(".k-calendar-header .k-button-text")
                .text()
                .split("-")[0]
                .trim();
              $(".k-calendar-header .k-button-text").text(monthTitle);
              $("#daterangepicker").data(
                "kendoDateRangePicker",
              ).dateView.calendar.options.views = 1;
            },
          })
          .data("kendoDatePicker");
      });
    </script>
```


## See Also

- [DateRangePicker API](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/daterangepicker)
- [MultiViewCalendar API](https://docs.telerik.com/kendo-ui/api/javascript/ui/multiviewcalendar)
- [DateRangePicker Overview](https://www.telerik.com/kendo-jquery-ui/documentation/controls/daterangepicker/overview)
