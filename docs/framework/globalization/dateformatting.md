---
title: Date Formatting
page_title: Date Formatting | Kendo UI Framework Globalization documentation
description: Learn how with date formatting you can convert Date object to human readable string, supporting standard and custom date formats.
---

#Date Formatting

The purpose of date formatting is to convert Date object to a human readable string using culture's specific settings. [kendo.format](/api/framework/kendo#format) and [kendo.toString](/api/framework/kendo#tostring) methods support standard and custom date formats:

## Standard date formats

- *d* - short date pattern ("M/d/yyyy" for en-US)

    `kendo.toString(new Date(2000, 10, 6), "d")` -> 10/6/2000

- "D" - long date pattern (dddd, MMMM dd, yyyy" for en-US)

    `kendo.toString(new Date(2000, 10, 6), "D")` -> Monday, November 06, 2000

- *F* - Full date/time pattern ("dddd, MMMM dd, yyyy h:mm:ss tt" for en-US)

    kendo.toString(new Date(2000, 10, 6), "F") -> Monday, November 06, 2000 12:00:00 AM

- *g* - General date/time pattern (short time) ("M/d/yyyy h:mm tt" for en-US)

    `kendo.toString(new Date(2000, 10, 6), "g")` -> 11/6/2000 12:00 AM

- *G* - General date/time pattern (long time) ("M/d/yyyy h:mm:ss tt" for en-US)

    `kendo.toString(new Date(2000, 10, 6), "G")` -> 11/6/2000 12:00:00 AM

- *M/m* - Month/day pattern ("MMMM dd" for en-US)

    `kendo.toString(new Date(2000, 10, 6), "m")` -> November 06

- *u* - Universal sortable date/time pattern ("yyyy'-'MM'-'dd HH':'mm':'ss'Z'" for en-US)

    `kendo.toString(new Date(2000, 10, 6), "u")` -> 2000-11-06 00:00:00Z

- *Y/y* - Year/month pattern ("MMMM, yyyy" for en-US)

    `kendo.toString(new Date(2000, 10, 6), "y")` -> November, 2000

## Custom date formats

- "d" - The day of the month, from 1 through 31
- "dd" - The day of the month, from 01 through 31.
- "ddd" - The abbreviated name of the day of the week.
- "dddd" - The full name of the day of the week.
- "f" - The tenths of a second in a date and time value.
- "ff" - The hundredths of a second in a date and time value.
- "fff" - The milliseconds in a date and time value.
- "M" - The month, from 1 through 12.
- "MM" - The month, from 01 through 12.
- "MMM" - The abbreviated name of the month.
- "MMMM" - The full name of the month.
- "h" - The hour, using a 12-hour clock from 1 to 12.
- "hh" - The hour, using a 12-hour clock from 01 to 12.
- "H" - The hour, using a 24-hour clock from 1 to 23.
- "HH" - The hour, using a 24-hour clock from 01 to 23.
- "m" - The minute, from 0 through 59.
- "mm" - The minute, from 00 through 59.
- "s" - The second, from 0 through 59.
- "ss" - The second, from 00 through 59.
- "tt" - The AM/PM designator.
- "yy" - The last two characters from year value.
- "yyyy" - The year full value.
