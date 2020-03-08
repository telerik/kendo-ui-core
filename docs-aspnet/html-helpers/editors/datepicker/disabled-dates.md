---
title: Disabled Dates
page_title: Disabled Dates
description: "Get started with the {{ site.product }} DatePicker and learn how to disable specific dates in the widget."
slug: htmlhelpers_datepicker_aspnetcore_disableddates
position: 2
---

# Disabled Dates

The DatePicker allows you to disable specific days which are not intended to be selected by the end user such as weekends and national holidays.

To disable a date in the DatePicker, use either of the following approaches:
* [Set the days of the week](#setting-the-weekdays)
* [Add a function](#adding-a-function)

For a complete example, refer to the [demo on disabling dates in the DatePicker](https://demos.telerik.com/{{ site.platform }}/datepicker/disable-dates).

## Setting the Weekdays

To disable dates by setting the days of the week, list the names of days that will be disabled.

```Razor
    @(Html.Kendo().DatePicker()
        .Name("weekend-date-picker")
        .DisableDates(DayOfWeek.Saturday, DayOfWeek.Sunday)
    )
```

## Adding a Function

To disable dates through using a function, set the return value for the date that will be disabled to `true`.

```Razor
    @(Html.Kendo().DatePicker()
        .Name("national-date-picker")
        .DisableDates("disableDates")
    )
```
```JavaScript
    <script>
        function disableDates(date) {
            var dates = [
                new Date("1/1/2019"),
                new Date("1/21/2019"),
                new Date("2/18/2019"),
                new Date("5/27/2019"),
                new Date("7/4/2019"),
                new Date("9/2/2019"),
                new Date("10/14/2019"),
                new Date("11/11/2019"),
                new Date("11/28/2019"),
                new Date("12/25/2019")
            ];

            if (date && compareDates(date, dates)) {
                return true;
            } else {
                return false;
            }
        }

        function compareDates(date, dates) {
            for (var i = 0; i < dates.length; i++) {
                if (dates[i].getDate() == date.getDate() &&
                  dates[i].getMonth() == date.getMonth() &&
                    dates[i].getYear() == date.getYear()) {
                    return true
                }
            }
        }
    </script>
```

## See Also

* [Disabling Dates in the DatePicker HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/datepicker/disable-dates)
* [Server-Side API](/api/datepicker)
