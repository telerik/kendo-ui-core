---
title: Date parsing
page_title: Date Parsing | Kendo UI Framework Globalization documentation
description: Guide to supported methods for converting a specified string to a Date object using culture's specific settings.
---
# Date parsing

Kendo exposes methods which convert a specified string to a [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) object, using culture-specific settings.

## Parse a string as date without specifying a format

[kendo.parseDate(string)](/api/javascript/kendo#methods-parseDate) - converts a string to a JavaScript Date object taking into account culture's set of default formats.

    //current culture is "en-US"
    kendo.parseDate("12/22/2000"); //Fri Dec 22 2000

## Parse a string as date with specifying a format/s

[kendo.parseDate(string, format)](/api/javascript/kendo#methods-parseDate) - converts a string to a JavaScript Date object taking into account the specified format/s.

    kendo.parseDate("2000/12/22", "yyyy/MM/dd");
	kendo.parseDate("2000/12/22", ["MM/dd/yyyy", "yyyy/MM/dd"]);

## Parse a string as date with specifying a format/s and culture name

[kendo.parseDate(string, format, cultureName)](/api/javascript/kendo#methods-parseDate) - converts a string to a JavaScript Date object taking into account the specified format/s and culture

    kendo.parseDate("2012.07.16", "yyyy/MM/dd", "de-DE");
	kendo.parseDate("2012.07.16", ["MM/dd/yyyy", "yyyy/MM/dd"], "de-DE");

> kendo.parseDate() parses strings by incrementally matching an increasing portion of the date string, until it satisfies the current corresponding format part.
This may lead to unexpected results when parsing ambiguous date strings with no delimiters. For example, parsing of `222015` with a `dMyyyy` format will fail,
because "22" will be matched as `d` and there will be no suitable string part left for the month.
>
> In addition, parsing is permissive and ignores invalid strings which occur after the year.