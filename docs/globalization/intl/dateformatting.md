---
title: Date Formatting
page_title: Date Formatting - Kendo UI Globalization
description: "Learn how to convert the date object to a human readable string, and support standard and custom date formats in Kendo UI."
previous_url: /framework/globalization/dateformatting
slug: dateformatting_kendoui_globalization
position: 3
---

# Date Formatting

The purpose of date formatting is to convert the `Date` object to a human readable string by using the culture-specific settings.

The [`kendo.format`](/api/javascript/kendo/methods/format) and [`kendo.toString`](/api/javascript/kendo/methods/tostring) methods support standard and custom date formats.

The following runnable example demonstrates how to convert a JavaScript `Date` object to a string by using the [`kendo.toString`](/api/javascript/kendo/methods/tostring) method:

```dojo
    <!-- Add the de-DE culture file -->
    <script src="https://kendo.cdn.telerik.com/2022.1.119/js/cultures/kendo.culture.de-DE.min.js"></script>
    <h4>Date formats with US culture.</h4>
    <div id="content"></div>
    <h4>Date formats with DE culture.</h4>
    <div id="content2"></div>
    <h4>Applying Date formatting to Grid columns.</h4>
    <div id="grid"></div>
    <script>
      // Default culture is en-US.
      let format = "<p> Format 'd' = " + kendo.toString(new Date(), "d") + "</p>"
      +"<p> Format 'D' = " + kendo.toString(new Date(), "D") + "</p>"
      +"<p> Format 'F' = " + kendo.toString(new Date(), "F") + "</p>"
      +"<p> Format 'g' = " + kendo.toString(new Date(), "g") + "</p>"
      +"<p> Format 'u' = " + kendo.toString(new Date(), "u") + "</p>"
      +"<p> Custom format dd/MMMM/yyyy H:mm = " + kendo.toString(new Date(), "dd/MMMM/yyyy H:mm") + "</p><hr>";
      $(format).appendTo(content);

      // Switch to DE culture.
      kendo.culture("de-DE");

      let format2 = "<p> Format 'd' = " + kendo.toString(new Date(), "d") + "</p>"
      +"<p> Format 'D' = " + kendo.toString(new Date(), "D") + "</p>"
      +"<p> Format 'F' = " + kendo.toString(new Date(), "F") + "</p>"
      +"<p> Format 'g' = " + kendo.toString(new Date(), "g") + "</p>"
      +"<p> Format 'u' = " + kendo.toString(new Date(), "u") + "</p>"
      +"<p> Custom format dd/MMMM/yyyy H:mm = " + kendo.toString(new Date(), "dd/MMMM/yyyy H:mm") + "</p><hr>";

      $(format2).appendTo(content2);

      $("#grid").kendoGrid({
        dataSource: [{dateField: new Date(), dateField1: new Date(), dateField2: new Date(), dateField3: new Date(), dateField4: new Date(), dateField5: new Date()}],
        columns: [{
          field: "dateField",
          format: "{0:d}"
        },{
          field: "dateField1",
          format: "{0:D}"
        },{
          field: "dateField2",
          format: "{0:F}"
        },{
          field: "dateField3",
          format: "{0:g}"
        },{
          field: "dateField4",
          format: "{0:u}"
        },{
          field: "dateField5",
          format: "{0:dd/MMMM/yyyy H:mm}"
        }]
      });
    </script>
```

## Default Date Formats

The following table lists the default Kendo UI date format specifiers.

| Specifier     | Result  |
|:---           |:---     |
|`standard`     |Retrieved from the used Kendo UI culture script that is defined with the [`kendo.culture`](/api/javascript/kendo/methods/culture) method.
|`d`            | Renders a short date pattern (`"M/d/yyyy"` for en-US). For example, `kendo.toString(new Date(2000, 10, 6), "d") -> 10/6/2000`.
|`D`            |Renders a long date pattern (`"dddd, MMMM dd, yyyy"` for en-US). For example, `kendo.toString(new Date(2000, 10, 6), "D") -> Monday, November 06, 2000`.
|`F`            |Renders a full date/time pattern (`"dddd, MMMM dd, yyyy h:mm:ss tt"` for en-US). For example, `kendo.toString(new Date(2000, 10, 6), "F") -> Monday, November 06, 2000 12:00:00 AM`.
|`g`            |Renders a general date/time pattern (short time) (`"M/d/yyyy h:mm tt"` for en-US). For example, `kendo.toString(new Date(2000, 10, 6), "g") -> 11/6/2000 12:00 AM`.
|`G`            |Renders a general date/time pattern (long time) (`"M/d/yyyy h:mm:ss tt"` for en-US). For example, `kendo.toString(new Date(2000, 10, 6), "G") -> 11/6/2000 12:00:00 AM`.
|`M` or `m`     |Render a month/day pattern (`"MMMM dd"` for en-US). For example, `kendo.toString(new Date(2000, 10, 6), "m") -> November 06.
|`t`            |Renders a short time pattern (`"h:mm tt"` for en-US). For example, `kendo.toString(new Date(2000, 10, 6, 14, 30, 45), "t") -> 2:30 PM`.
|`T`            |Renders a long time pattern (`"h:mm:ss tt"` for en-US). For example, `kendo.toString(new Date(2000, 10, 6, 14, 30, 45), "T") -> 2:30:45 PM`.
|`s`            |Renders universal sortable **local** date/time pattern (`"yyyy-MM-dd HH:mm:ss"` for en-US). For example, `kendo.toString(new Date(2000, 10, 6), "s") -> 2000-11-06 00:00:00`.
|`u`            |Renders universal sortable **UTC** date/time pattern (`"yyyy-MM-dd HH:mm:ssZ"` for en-US). For example, `kendo.toString(new Date(2000, 10, 6), "u") -> 2000-11-06 00:00:00Z`.
|`Y` or `y`     |Renders a year/month pattern (`"MMMM, yyyy"` for en-US). For example, `kendo.toString(new Date(2000, 10, 6), "y") -> November, 2000`.

## Custom Date Formats

The following table lists the supported custom date format specifiers. 

| Specifier     | Result  |
|:---           |:---     |
| `"d"`     | Renders the day of the month, from 1 through 31.|
| `"dd"`    | The day of the month, from 01 through 31.|
| `"ddd"`   | The abbreviated name of the day of the week.
| `"dddd"`  | The full name of the day of the week.
| `"f"`     | The tenths of a second in a date and time value.
| `"ff"`    | The hundredths of a second in a date and time value.
| `"fff"`   | The milliseconds in a date and time value.
| `"M"`     | The month, from 1 through 12.
| `"MM"`    | The month, from 01 through 12.
| `"MMM"`   | The abbreviated name of the month.
| `"MMMM"`  | The full name of the month.
| `"h"`     | The hour, using a 12-hour clock from 1 to 12.
| `"hh"`    | The hour, using a 12-hour clock from 01 to 12.
| `"H"`     | The hour, using a 24-hour clock from 1 to 23.
| `"HH"`    | The hour, using a 24-hour clock from 01 to 23.
| `"m"`     | The minute, from 0 through 59.
| `"mm"`    | The minute, from 00 through 59.
| `"s"`     | The second, from 0 through 59.
| `"ss"`    | The second, from 00 through 59.
| `"tt"`    | The AM/PM designator.
| `"yy"`    | The last two characters from the year value.
| `"yyyy"`  | The year full value.
| `"zzz"`   | The local timezone when using formats to [parse UTC date strings]({% slug dateparsing_kendoui_globalization %}#parse-utc-date-strings).

## See Also

* [Overview of Globalization in Kendo UI]({% slug overview_kendoui_globalization %})
* [Culture Definition]({% slug culture_definition_kendoui_globalization %})
* [Date Parsing]({% slug dateparsing_kendoui_globalization %})
* [Number Formatting]({% slug numberformatting_kendoui_globalization %})
* [Number Parsing]({% slug numberparsing_kendoui_globalization %})
