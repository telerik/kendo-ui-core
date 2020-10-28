---
title: Calendar Types
page_title: jQuery DatePicker Documentation | Calendar Types
description: "Get started with the jQuery DatePicker by Kendo UI and learn how to work around the default calendar type implementation and simulate other calendar types."
slug: calendartypes_datepicker
position: 6
---

# Calendar Types

By default, the DatePicker works with JavaScript `Date` objects which support only the [Gregorian](https://en.wikipedia.org/wiki/Gregorian_calendar) calendar.

As a result, the DatePicker does not support other calendar types such as Lunar.

To work around the default behavior of the widget and simulate a different calendar type, use either of the following approaches:

* Use the JavaScript `Date` object.
* Create a date that is in the past.

```dojo
<fieldset>
    <label for="gregorianStyle">Gregorian year:</label>
    <input id="gregorianStyle" type="text" />
</fieldset>
<fieldset>
    <label for="lunarStyle">Lunar year:</label>
    <input id="lunarStyle" type="text" />
</fieldset>
<h4>Disclamer: In both cases, the DatePicker uses the Gregorian calendar date. The second widget only displays the Gregorian date with the Lunar year.</h4>

<script>
$(function() {
    var gregorian = new Date(2000, 10, 10); // A date using the Gregorian calendar.
    var lunar = new Date(1497, 10, 10); // A date using the Gregorian calendar but created in a Lunar year.

    $("#gregorianStyle").kendoDatePicker({ value: gregorian });
    $("#lunarStyle").kendoDatePicker({
        min: new Date(1400, 0, 1),
        value: lunar
    });
});
</script>
```

## See Also

* [JavaScript API Reference of the DatePicker](/api/javascript/ui/datepicker)
