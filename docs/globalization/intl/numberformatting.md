---
title: Number Formatting
page_title: Number Formatting | Kendo UI Globalization
description: "Learn how to use the number formatting methods to convert a number object to a human readable string using the Kendo UI culture specific settings."
previous_url: /framework/globalization/numberformatting
slug: numberformatting_kendoui_globalization
position: 5
---

# Number Formatting

The purpose of number formatting is to convert a `Number` object to a human readable string using the culture-specific settings.

The [`kendo.format`](/api/javascript/kendo#format) and [`kendo.toString`](/api/javascript/kendo#tostring) methods support standard and custom numeric formats.

## Default Number Formats

* `"n"`&mdash;Renders a number.

    kendo.culture("en-US");
    kendo.toString(1234.567, "n"); //1,234.57

    kendo.toString(10.12, "n5"); //10.12000
    kendo.toString(10.12, "n0"); //10

    kendo.culture("de-DE");
    kendo.toString(1234.567, "n3"); //1.234,567

* `"c"`&mdash;Renders a currency value.

    kendo.culture("en-US");
    kendo.toString(1234.567, "c"); //$1,234.57

    kendo.culture("en-US");
    kendo.toString(1234.567, "c0"); //$1,235

    kendo.culture("de-DE");
    kendo.toString(1234.567, "c3"); //1.234,567 €

* `"p"`&mdash;Renders a percentage (number is multiplied by 100).

    kendo.culture("en-US");
    kendo.toString(0.222, "p"); //22.20 %

    kendo.culture("en-US");
    kendo.toString(0.222, "p0"); //22 %

    kendo.culture("de-DE");
    kendo.toString(0.22, "p3"); //22.000 %

* `"e"`&mdash;Renders exponential values.

    kendo.toString(0.122, "e"); //1.22e-1
    kendo.toString(0.122, "e4"); //1.2200e-1

## Custom Number Formats

You can also create a custom numeric format string by using one or more custom numeric specifiers. A custom numeric format string is any string which is not a standard numeric format.

The following specifiers are supported by Kendo UI:

* `"0"`&mdash;The zero placeholder replaces the zero with the corresponding digit if such is present. Otherwise, zero appears in the result string.

    kendo.toString(1234.5678, "00000") -> 01235

* `"#"`&mdash;The digit placeholder replaces the pound sign with the corresponding digit if one is present. Otherwise, no digit appears in the result string. Cannot be used to format a number as a telephone number, that is, `(###)-###-####`.

    kendo.toString(1234.5678, "#####") -> 1235

* `"."`&mdash;The decimal placeholder determines the location of the decimal separator in the result string.

    kendo.toString(0.45678, "0.00") -> 0.46 (en-US)

* `","`&mdash;The group separator placeholder inserts a localized group separator between each group.

    kendo.toString(12345678, "##,#") -> 12,345,678(en-US)

* `"%"`&mdash;The percentage placeholder multiplies a number by 100 and inserts a localized percentage symbol in the result string. The `%` symbol is interpreted as a format specifier in the format string. To prevent this behavior, precede the `%` symbol with a double backslash - `kendo.toString(12, "# \\\%")` -> 12 % (en-US).

* `"$"`&mdash;The currency placeholder specifies that the number will be formatted by using the currency culture settings. The `$` symbol is replaced with the localized currency symbol. `$` is interpreted as a format specifier in the format string. To prevent this behavior, precede the `$` symbol with a double backslash - `kendo.toString(12, "# \\\$")` -> 12 $ (en-US).

* `"e"`&mdash;The exponential notation.

    kendo.toString(0.45678, "e0") -> 5e-1

* `";"`&mdash;The section separator defines sections with separate format strings for positive, negative, and zero numbers.
* `"string"/'string'`&mdash;The literal string delimiter indicates that the enclosed characters will be copied to the result string.

## See Also

* [Overview of Globalization in Kendo UI]({% slug overview_kendoui_globalization %})
* [Culture Definition]({% slug culture_definition_kendoui_globalization %})
* [Date Formatting]({% slug dateformatting_kendoui_globalization %})
* [Date Parsing]({% slug dateparsing_kendoui_globalization %})
* [Number Parsing]({% slug numberparsing_kendoui_globalization %})
