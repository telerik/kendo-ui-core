---
title: Disabled Dates
page_title: Disabled Dates
description: "Disable dates when working with the Telerik UI Calendar component for {{ site.framework }}."
slug: htmlhelpers_disableddates_calendar_aspnetcore
position: 6
---

# Disabled Dates

The Calendar allows you to disable certain days which are not intended to be selected by the end user such as weekends, national holidays, and others.

To disable a date, either [set an array](#setting-an-array) or [add a function](#adding-a-function).

## Setting an Array

When you set an array, list the days that will be disabled by using the first letters from their names in English.

```HtmlHelper
    @(Html.Kendo().Calendar()
        .Name("calendar")
        .Value(DateTime.Now)
        .DisableDates(new[] {DayOfWeek.Monday })
        )
```
{% if site.core %}
```TagHelper
    @{
        var disabledDates = new DateTime[] { DateTime.Now.AddDays(2), DateTime.Now.AddDays(2) };
    }

    <kendo-calendar name="calendar" disable-dates="disabledDates" value="DateTime.Now">
    </kendo-calendar>
```
{% endif %}

## Adding a Function

When you add a function, determine its return value as `true` for the date that is disabled.

```HtmlHelper
@(Html.Kendo().Calendar()
    .Name("calendar")
    .Value(DateTime.Now)
    .DisableDates("disabledDatesHandler")
)

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
{% if site.core %}
```TagHelper
    <div class="demo-section k-content" style="text-align: center;">
        <kendo-calendar name="calendar" disable-dates-handler="disabledDatesHandler" value="DateTime.Now">
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
{% endif %}

## See Also

* [Disabling Dates in the Calendar HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/calendar/disable-dates)
* [Server-Side API](/api/calendar)
