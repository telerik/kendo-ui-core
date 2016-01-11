---
title: Date Parsing
page_title: Date Parsing | Kendo UI Globalization
description: "Learn how to convert a specified string to a date object using the Kendo UI culture specific settings."
slug: dateparsing_kendoui_globalization
position: 4
---

# Date Parsing

Kendo UI exposes methods which convert a specified string to a [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) object, using the culture-specific settings.

## Settings

### Parse without Specifying Format

The [`kendo.parseDate(string)`](/api/javascript/kendo#methods-parseDate) method converts a string to a JavaScript Date object taking into account the culture's set of default formats.

###### Example

    //current culture is "en-US"
    kendo.parseDate("12/22/2000"); //Fri Dec 22 2000

### Parse by Specifying Format

The [`kendo.parseDate(string, format)`](/api/javascript/kendo#methods-parseDate) method converts a string to a JavaScript Date object taking into account the specified formats.

###### Example

    kendo.parseDate("2000/12/22", "yyyy/MM/dd");
    kendo.parseDate("2000/12/22", ["MM/dd/yyyy", "yyyy/MM/dd"]);

### Parse by Specifying Format and Culture Name

The [`kendo.parseDate(string, format, cultureName)`](/api/javascript/kendo#methods-parseDate) method converts a string to a JavaScript Date object taking into account the specified formats and culture.

###### Example

    kendo.parseDate("2012.07.16", "yyyy/MM/dd", "de-DE");
  	kendo.parseDate("2012.07.16", ["MM/dd/yyyy", "yyyy/MM/dd"], "de-DE");

> **Important**
> * The `kendo.parseDate()` parses strings by incrementally matching an increasing portion of the date string, until it satisfies the current corresponding format part. This may lead to unexpected results when parsing ambiguous date strings with no delimiters. For example, the parsing of `222015` with a `dMyyyy` format fails, because `"22"` is matched as `d` and there is no suitable string part left for the month.
> * In addition, parsing is permissive and ignores invalid strings which occur after the year.

## See Also

Articles on globalization in Kendo UI:

* [Overview of Globalization in Kendo UI]({% slug overview_kendoui_globalization %})
* [Culture Definition]({% slug culture_definition_kendoui_globalization %})
* [Date Formatting]({% slug dateformatting_kendoui_globalization %})
* [Number Formatting]({% slug numberformatting_kendoui_globalization %})
* [Number Parsing]({% slug numberparsing_kendoui_globalization %})
