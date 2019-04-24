---
title: Date Parsing
page_title: Date Parsing | Kendo UI Globalization
description: "Learn how to convert a specified string to a date object using the Kendo UI culture specific settings."
previous_url: /framework/globalization/dateparsing
slug: dateparsing_kendoui_globalization
position: 4
---

# Date Parsing

Kendo UI exposes methods which convert a specified string to a [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) object by using the culture-specific settings.

## Parsing without Specifying Formats

The [`kendo.parseDate(string)`](/api/javascript/kendo/methods/parsedate) method converts a string to a JavaScript `Date` object taking into account the set of default culture formats.

    //current culture is "en-US"
    kendo.parseDate("12/22/2000"); //Fri Dec 22 2000

## Parsing by Specifying Formats

The [`kendo.parseDate(string, format)`](/api/javascript/kendo/methods/parsedate) method converts a string to a JavaScript Date object taking into account the specified formats.

    kendo.parseDate("2000/12/22", "yyyy/MM/dd");
    kendo.parseDate("2000/12/22", ["MM/dd/yyyy", "yyyy/MM/dd"]);

## Parsing by Specifying Format and Culture Names

The [`kendo.parseDate(string, format, cultureName)`](/api/javascript/kendo/methods/parsedate) method converts a string to a JavaScript `Date` object by taking into account the specified formats and culture.

    kendo.parseDate("2012.07.16", "yyyy/MM/dd", "de-DE");
  	kendo.parseDate("2012.07.16", ["MM/dd/yyyy", "yyyy/MM/dd"], "de-DE");

> * The `kendo.parseDate()` parses strings by incrementally matching an increasing portion of the date string until it satisfies the current corresponding format part. This may lead to unexpected results when parsing ambiguous date strings with no delimiters. For example, the parsing of `222015` with a `dMyyyy` format fails, because `"22"` is matched as `d` and there is no suitable string part left for the month.
> * In addition, parsing is permissive and ignores invalid strings which occur after the year.

## Parsing by Exactly Matching the Format

The [`kendo.parseExactDate(string, formats)`](/api/javascript/kendo/methods/parseexactdate) method will parse a string as a date. If the string does not match the format exactly the method will return `null`.

    kendo.parseExactDate("3/4/2013", "MM/dd/yyyy") // Outputs "Mon Mar 04 2013 00:00:00".
    kendo.parseExactDate("3/4/2013", "MM/dd/yy") // Outputs "null".

## Parsing UTC Date Strings

When parsing UTC date strings without providing a format string, the resulting JavaScript `Date` object renders the time according to the local time zone of the user.

    kendo.parseDate("2016-02-14T06:15:44.123Z"); // Sun Feb 14 2016 08:15:44 GMT+0200 (FLE Standard Time)

When you use formats for parsing UTC date strings, apply the `zzz` specifier to render the local time. Otherwise, the current browser timezone offset will apply.

    kendo.parseDate("2016-08-09T05:28:46Z", "yyyy-MM-ddTHH:mm:sszzz") // Tue Aug 09 2016 08:28:46 GMT+0300 (FLE Daylight Time)

## See Also

* [Overview of Globalization in Kendo UI]({% slug overview_kendoui_globalization %})
* [Culture Definition]({% slug culture_definition_kendoui_globalization %})
* [Date Formatting]({% slug dateformatting_kendoui_globalization %})
* [Number Formatting]({% slug numberformatting_kendoui_globalization %})
* [Number Parsing]({% slug numberparsing_kendoui_globalization %})
