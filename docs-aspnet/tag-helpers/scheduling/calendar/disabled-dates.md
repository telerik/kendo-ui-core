---
title: Disabled Dates
page_title: Disabled Dates
description: "Disable dates when working with the Telerik UI Calendar TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: disableddates_calendar_aspnetcore
position: 6
---

# Disabled Dates

The Calendar allows you to disable certain days which are not intended to be selected by the end user such as weekends, national holidays, and others.

To disable a date, either set an array or add a function.

## Setting an Array

When you set an array, list the days that need to be disabled by using the first letters from their names in English.

```tagHelper

    <kendo-calendar disable-dates="new DateTime[] { DateTime.Now.AddDays(2), DateTime.Now.AddDays(2) }" value="DateTime.Now" name="calendar">
    </kendo-calendar>

```
```cshtml

    @(Html.Kendo().Calendar()
        .Name("calendar")
        .Value(DateTime.Now)
        .DisableDates(new[] {DayOfWeek.Monday })
        )

```

## Adding a Function

When you add a function, determine its return value as `true` for the date that is disabled.

```
    <div class="demo-section k-content" style="text-align: center;">
        <kendo-calendar disable-dates-handler="disabledDatesHandler" value="DateTime.Now" name="calendar">
        </kendo-calendar>
    </div>

    <script>
        function disabledDatesHandler(date) {
            var disabled = [13, 14, 20, 21];
            if (date && disabled.indexOf(date.getDate()) > -1) {
                return true;
            } else {
                return false;
            }
        }
    </script>
```

## See Also

* [Server-Side API](/api/calendar)
