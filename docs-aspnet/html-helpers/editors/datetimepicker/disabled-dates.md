---
title: Disabled Dates
page_title: Disabled Dates
description: "Get started with the Telerik UI DateTimePicker for {{ site.framework }} and learn how to disable specific dates."
slug: disableddates_datetimepicker_aspnetcore
position: 13
---

# Disabled Dates

The DateTimePicker allows you to disable specific days which are not intended to be selected by the end user such as weekends and national holidays.

To disable a date in the DateTimePicker, use either of the following approaches:
* [Set an array of dates](#setting-an-array)
* [Add a function](#adding-a-function)

For a complete example, refer to the [demo on disabling dates in the DateTimePicker](https://demos.telerik.com/{{ site.platform }}/datetimepicker/disable-dates).

## Setting an Array

To disable dates by setting an array, list the names of days that will be disabled by using the first letters from their names in English.

```HtmlHelper
    @(Html.Kendo().DateTimePicker()
        .Name("dateTimePicker")
        .Value(DateTime.Now)
        .DisableDates(new[] {"we", "th" })
    )
```
{% if site.core %}
```TagHelper
    <kendo-datetimepicker name="MultiViewCalendar" 
        disable-dates="new DateTime[] { DateTime.Now }">
    </kendo-datetimepicker>
```
{% endif %}

## Adding a Function

To disable dates by using a function, set the return value for the date that will be disabled to `true`.

```HtmlHelper
    @(Html.Kendo().DateTimePicker()
        .Name("dateTimePicker")
        .Value(DateTime.Now)
        .DisableDates("disableDatesHandler")
    )
```
{% if site.core %}
```TagHelper
    <kendo-datepicker value="DateTime.Now" name="dateTimePicker" disable-dates-handler="disableDatesHandler">
    </kendo-datepicker>
```
{% endif %}
```JavaScript
    <script type="text/javascript">
        function disableDatesHandler(date){
            var disabled = [13,14,20,21];
            if (date && disabled.indexOf(date.getDate()) > -1 ) {
                return true;
            } else {
                return false;
            }
        }
    </script>
```

## See Also

* [Disabling Dates in the DateTimePicker (Demo)](https://demos.telerik.com/{{ site.platform }}/datetimepicker/disable-dates)
* [Server-Side API](/api/datetimepicker)
