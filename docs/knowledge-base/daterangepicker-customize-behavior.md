---
title: Customizing DateRangePicker Behavior in Kendo UI
description: Learn how to modify the DateRangePicker control behavior to update start and end date selections accurately.
type: how-to
page_title: How to Customize DateRangePicker Selection Behavior
slug: daterangepicker-customize-behavior
tags: kendo ui, daterangepicker, custom behavior, date selection
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® DateRangePicker for jQuery</td>
 </tr>
</table>

## Description
When using the [DateRangePicker](https://docs.telerik.com/kendo-ui/api/javascript/ui/daterangepicker) control, selecting an end date updates the start date field instead of the end date field. The goal is to ensure that when either the start or end date is selected, the corresponding field updates accurately, providing a seamless user experience.

This KB article also answers the following question:
- What code changes are required to update the start and end dates correctly in DateRangePicker?

## Solution
To achieve the desired behavior, implement custom logic using the [`change`](https://docs.telerik.com/kendo-ui/api/javascript/ui/daterangepicker/events/change) and [`open`](https://docs.telerik.com/kendo-ui/api/javascript/ui/daterangepicker/events/open) events of the DateRangePicker. This solution involves tracking the selected start and end dates and updating them based on user interactions.

1. **Initialize the DateRangePicker and define custom logic:**

```javascript
$(document).ready(function() {
    var savedRange = {};

    $("#daterangepicker").kendoDateRangePicker({
        change: function() {
            var range = this.range();

            if (!savedRange.start && range.start) {
                savedRange.start = range.start;
            } 

            if (range.start && range.end) {
                savedRange = range;
            } else if (range.start) {
                var newDate = range.start;

                if (newDate > savedRange.start) {
                    savedRange.end = newDate;
                } else {
                    savedRange = { start: newDate, end: null };
                }
            }
            this.range(savedRange);
        },
        open: function() {
            if (savedRange.start || savedRange.end) {
                this.range(savedRange);
            }
        }
    });
});
```
2. **Test the behavior with a dojo example:** 

Visit the dojo example at [https://dojo.telerik.com/NShpKjFe](https://dojo.telerik.com/NShpKjFe) to see the custom behavior in action.

## See Also
- [DateRangePicker Change Event Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/daterangepicker/events/change)
- [DateRangePicker Open Event Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/daterangepicker/events/open)
- [Official Kendo UI DateRangePicker Documentation](https://docs.telerik.com/kendo-ui/controls/editors/daterangepicker/overview)