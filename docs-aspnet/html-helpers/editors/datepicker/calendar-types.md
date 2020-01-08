---
title: Calendar Types
page_title: Calendar Types
description: "Get started with the {{ site.product }} DatePicker and learn how to work around the default calendar type implementation and simulate other calendar types."
slug: htmlhelpers_datepicker_aspnetcore_calendartypes
position: 6
---

# Calendar Types

By default, the DatePicker works with JavaScript `Date` objects which support only the [Gregorian](https://en.wikipedia.org/wiki/Gregorian_calendar) calendar.,

As a result, the DatePicker does not support other calendar types such as Lunar.

To work around the default behavior of the DatePicker and simulate a different calendar type, use either of the following approaches:

* Set the `Value` of the DatePicker to a date in the past.
* Specify the `Min` option so that the selected date is within the valid range.

> In both cases, the DatePicker uses the Gregorian calendar date. The second component only displays the Gregorian date with the Lunar year.

```Razor
    @(Html.Kendo().DatePicker()
        .Name("gregorian")
        .Value(new DateTime(2000, 11, 10))
    )
    @(Html.Kendo().DatePicker()
        .Name("lunar")
        .Min(new DateTime(1400,1,1))
        .Value(new DateTime(1497, 11, 10))
    )
```

## See Also

* [Server-Side API](/api/datepicker)
