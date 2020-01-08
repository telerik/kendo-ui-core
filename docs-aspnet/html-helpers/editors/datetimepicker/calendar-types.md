---
title: Calendar Types
page_title: Calendar Types
description: "Get started with the Telerik UI DateTimePicker for {{ site.framework }} and learn how to work around the default calendar type implementation and simulate other calendar types."
slug: calendartypes_datetimepicker_aspnetcore
position: 7
---

# Calendar Types

By default, the DatePicker works with `Date` objects which support only the [Gregorian](https://en.wikipedia.org/wiki/Gregorian_calendar) calendar.

As a result, the DateTimePicker does not support other calendar types such as Lunar.

To work around the default behavior of the DateTimePicker and simulate a different calendar type, use either of the following approaches:

* Use the JavaScript `Date` object.
* Create a date that is in the past.

## See Also

* [Server-Side API](/api/datetimepicker)
