---
title: Disabled Dates
page_title: Disabled Dates | Telerik UI DateTimePicker HtmlHelper for ASP.NET Core
description: "Get started with the Telerik UI DateTimePicker for ASP.NET Core and learn how to disable specific dates in the HTML Helper."
slug: disableddates_datetimepicker_aspnetcore
position: 2
---

# Disable Dates

The DateTimePicker provides the opportunity to disable certain days, such as weekends, national holidays, and others, which are not intended to be selected by the end user.

To disable a date, either:
* [Set an array of dates](#setting-an-array)
* [Add a function](#adding-a-function)

For a complete example, refer to the [demo on disabling dates in the DateTimePicker](https://demos.telerik.com/aspnet-core/datetimepicker/disable-dates).

## Setting an Array

To disable dates by setting an array, list the names of days that will be disabled by using the first letters from their names in English.

```
    @(Html.Kendo().DateTimePicker()
        .Name("dateTimePicker")
        .Value(DateTime.Now)
        .DisableDates(new[] {"we", "th" })
    )
```

## Adding a Function

To disable dates through using a function, set the return value for the date that will be disabled to `true`.

```
    @(Html.Kendo().DateTimePicker()
        .Name("dateTimePicker")
        .Value(DateTime.Now)
        .DisableDates("disableDatesHandler")
    )

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

* [Disabling Dates in the DateTimePicker (Demo)](https://demos.telerik.com/aspnet-core/datetimepicker/disable-dates)
* [Server-Side API](/api/datetimepicker)
