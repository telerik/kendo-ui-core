---
title: Date Formatting
page_title: Date Formatting | Kendo UI Globalization
description: "Learn how to convert the date object to a human readable string, and support standard and custom date formats in Kendo UI."
slug: dateformatting_kendoui_globalization
position: 3
---

# Date Formatting

The purpose of date formatting is to convert the `Date` object to a human readable string by using the culture's specific settings. The [`kendo.format`](/api/javascript/kendo#format) and [`kendo.toString`](/api/javascript/kendo#tostring) methods support standard and custom date formats.

## Types of Date Formats

### Standard

The `standard` formats are retrieved from the used Kendo culture script defined with [kendo.culture]()  method.

#### The 'd' Specifier

The `"d"` specifier renders a short date pattern (`"M/d/yyyy"` for en-US), as shown below.

###### Example

    kendo.toString(new Date(2000, 10, 6), "d") -> 10/6/2000

#### The 'D' Specifier

The `"D"` specifier renders a long date pattern (`"dddd, MMMM dd, yyyy"` for en-US).

###### Example

    kendo.toString(new Date(2000, 10, 6), "D") -> Monday, November 06, 2000

#### The 'F' Specifier

The `"F"` specifier renders a full date/time pattern (`"dddd, MMMM dd, yyyy h:mm:ss tt"` for en-US).

###### Example

    kendo.toString(new Date(2000, 10, 6), "F") -> Monday, November 06, 2000 12:00:00 AM

#### The 'g' Specifier

The `"g"` specifier renders a general date/time pattern (short time) (`"M/d/yyyy h:mm tt"` for en-US).

###### Example

    kendo.toString(new Date(2000, 10, 6), "g") -> 11/6/2000 12:00 AM

#### The 'G' Specifier

The `"G"` specifier renders a general date/time pattern (long time) (`"M/d/yyyy h:mm:ss tt"` for en-US).

###### Example

    kendo.toString(new Date(2000, 10, 6), "G") -> 11/6/2000 12:00:00 AM

#### The 'M' or 'm' Specifiers

The `"M"` or `"m"` specifiers render a month/day pattern (`"MMMM dd"` for en-US).

###### Example

    kendo.toString(new Date(2000, 10, 6), "m") -> November 06

#### The 't' Specifier

The `"t"` specifier renders a short time pattern (`"h:mm tt"` for en-US).

###### Example

    kendo.toString(new Date(2000, 10, 6, 14, 30, 45), "t") -> 2:30 PM

#### The 'T' Specifier

The `"T"` specifier renders a long time pattern (`"h:mm:ss tt"` for en-US).

###### Example

    kendo.toString(new Date(2000, 10, 6, 14, 30, 45), "T") -> 2:30:45 PM

#### The 's' Specifier

The `"s"` specifier renders universal sortable **local** date/time pattern (`"yyyy-MM-dd HH:mm:ss"` for en-US).

###### Example

    kendo.toString(new Date(2000, 10, 6), "s") -> 2000-11-06 00:00:00

#### The 'u' Specifier

The `"u"` specifier renders universal sortable **UTC** date/time pattern (`"yyyy-MM-dd HH:mm:ssZ"` for en-US).

###### Example

    kendo.toString(new Date(2000, 10, 6), "u") -> 2000-11-06 00:00:00Z

#### The 'Y' or 'y' Specifiers

The `"Y"` or `"y"` specifier renders a year/month pattern (`"MMMM, yyyy"` for en-US).

###### Example

    kendo.toString(new Date(2000, 10, 6), "y") -> November, 2000

### Custom

| Specifier     | Result  |
|:---           |:---     |
| **`"d"`**     | Renders the day of the month, from 1 through 31.|
| **`"dd"`**    | The day of the month, from 01 through 31.|
| **`"ddd"`**   | The abbreviated name of the day of the week.
| **`"dddd"`**  | The full name of the day of the week.
| **`"f"`**     | The tenths of a second in a date and time value.
| **`"ff"`**    | The hundredths of a second in a date and time value.
| **`"fff"`**   | The milliseconds in a date and time value.
| **`"M"`**     | The month, from 1 through 12.
| **`"MM"`**    | The month, from 01 through 12.
| **`"MMM"`**   | The abbreviated name of the month.
| **`"MMMM"`**  | The full name of the month.
| **`"h"`**     | The hour, using a 12-hour clock from 1 to 12.
| **`"hh"`**    | The hour, using a 12-hour clock from 01 to 12.
| **`"H"`**     | The hour, using a 24-hour clock from 1 to 23.
| **`"HH"`**    | The hour, using a 24-hour clock from 01 to 23.
| **`"m"`**     | The minute, from 0 through 59.
| **`"mm"`**    | The minute, from 00 through 59.
| **`"s"`**     | The second, from 0 through 59.
| **`"ss"`**    | The second, from 00 through 59.
| **`"tt"`**    | The AM/PM designator.
| **`"yy"`**    | The last two characters from the year value.
| **`"yyyy"`**  | The year full value.

## See Also

Articles on globalization in Kendo UI:

* [Overview of Globalization in Kendo UI]({% slug overview_kendoui_globalization %})
* [Culture Definition]({% slug culture_definition_kendoui_globalization %})
* [Date Parsing]({% slug dateparsing_kendoui_globalization %})
* [Number Formatting]({% slug numberformatting_kendoui_globalization %})
* [Number Parsing]({% slug numberparsing_kendoui_globalization %})
