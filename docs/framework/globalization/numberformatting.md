---
title: Number Formatting
page_title: Number Formatting | Kendo UI Globalization
description: "Learn how to use the number formatting methods to convert a number object to a human readable string using the Kendo UI culture specific settings."
slug: numberformatting_kendoui_globalization
position: 5
---

# Number Formatting

The purpose of number formatting is to convert a `Number` object to a human readable string using the culture's specific settings. The [`kendo.format`](/api/javascript/kendo#format) and [`kendo.toString`](/api/javascript/kendo#tostring) methods support standard and custom numeric formats.

## Types of Number Formats

### Standard

The `"n"` specifier renders a number, as shown below.

###### Example

    kendo.culture("en-US");
    kendo.toString(1234.567, "n"); //1,234.57

    kendo.toString(10.12, "n5"); //10.12000
    kendo.toString(10.12, "n0"); //10

    kendo.culture("de-DE");
    kendo.toString(1234.567, "n3"); //1.234,567

The `"c"` specifier renders currency.

###### Example

    kendo.culture("en-US");
    kendo.toString(1234.567, "c"); //$1,234.57

    kendo.culture("en-US");
    kendo.toString(1234.567, "c0"); //$1,235

    kendo.culture("de-DE");
    kendo.toString(1234.567, "c3"); //1.234,567 €

The `"p"` specifier renders a percentage (number is multiplied by 100).

###### Example

    kendo.culture("en-US");
    kendo.toString(0.222, "p"); //22.20 %

    kendo.culture("en-US");
    kendo.toString(0.222, "p0"); //22 %

    kendo.culture("de-DE");
    kendo.toString(0.22, "p3"); //22.000 %

The `"e"` specifier renders exponential values.

###### Example

    kendo.toString(0.122, "e"); //1.22e-1
    kendo.toString(0.122, "e4"); //1.2200e-1

### Custom

You are able to create a custom numeric format string using one or more custom numeric specifiers. A custom numeric format string is any string which is not a standard numeric format. The supported format specifiers are listed below.

The `"0"` is the zero placeholder. It replaces the zero with the corresponding digit if one is present. Otherwise, zero appears in the result string.

###### Example

    kendo.toString(1234.5678, "00000") -> 01235.

The `"#"` is the digit placeholder. It replaces the pound sign with the corresponding digit if one is present. Otherwise, no digit appears in the result string.

###### Example

    kendo.toString(1234.5678, "#####") -> 1235.

> **Important**
>
> The `"#"` specifier cannot be used to format a number as telephone number, i.e. (###)-###-####.

The `"."` is the decimal placeholder. It determines the location of the decimal separator in the result string.

###### Example

    kendo.toString(0.45678, "0.00") -> 0.46 (en-US).

The `","` is the group separator placeholder. It inserts a localized group separator between each group.

###### Example

   kendo.toString(12345678, "##,#") -> 12,345,678(en-US).

The `"%"` is the percentage placeholder. It multiplies a number by 100 and inserts a localized percentage symbol in the result string.

> **Important**
>
> The `%` symbol is interpreted as a format specifier in the format string. If you need to prevent this, precede the `%` symbol with a double backslash - `kendo.toString(12, "# \\\%")` -> 12 % (en-US).

The `"$"` is the currency placeholder. It specifies that the number should be formatted using the currency culture settings. The `$` symbol is replaced with the localized currency symbol.

> **Important**
>
> The `$` symbol is interpreted as a format specifier in the format string. If you need to prevent this, precede the `$` symbol with a double backslash - `kendo.toString(12, "# \\\$")` -> 12 $ (en-US).

The `"e"` is the exponential notation.

###### Example

    kendo.toString(0.45678, "e0") -> 5e-1

The `";"` is the section separator. It defines sections with separate format strings for positive, negative, and zero numbers.

The `"string"/'string'` is the literal string delimiter. It indicates that the enclosed characters should be copied to the result string.

## See Also

Articles on globalization in Kendo UI:

* [Overview of Globalization in Kendo UI]({% slug overview_kendoui_globalization %})
* [Culture Definition]({% slug culture_definition_kendoui_globalization %})
* [Date Formatting]({% slug dateformatting_kendoui_globalization %})
* [Date Parsing]({% slug dateparsing_kendoui_globalization %})
* [Number Parsing]({% slug numberparsing_kendoui_globalization %})
