---
title: Calendar Types
page_title: jQuery DateRangePicker Documentation | Calendar Types
description: "Get started with the jQuery DateRangePicker by Kendo UI and learn how to work around the default calendar type implementation and simulate other calendar types."
slug: calendartypes_kendoui_daterangepicker
position: 5
---

# Calendar Types

By default, the DateRangePicker works with `Date` objects which support only the [Gregorian](https://en.wikipedia.org/wiki/Gregorian_calendar) calendar.

As a result, the DateRangePicker does not support other calendar types such as Lunar.

To work around the default behavior of the DateRangePicker and simulate a different calendar type, use either of the following approaches:
* Use the JavaScript `Date` object.
* Create a date that is in the past.

```dojo
    <div id="daterangepicker"></div>

    <script>
        $("#daterangepicker").kendoDateRangePicker({
            disableDates: function (date) {
                var disabled = [13,14,20,21];
                if (date && disabled.indexOf(date.getDate()) > -1 ) {
                    return true;
                } else {
                    return false;
                }
            }
        });
    </script>
```

## See Also

* [Basic Usage of the DateRangePicker (Demo)](https://demos.telerik.com/kendo-ui/daterangepicker/index)
* [JavaScript API Reference of the DateRangePicker](/api/javascript/ui/daterangepicker)
