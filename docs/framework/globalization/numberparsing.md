---
title: Number Parsing
page_title: Number Parsing | Kendo UI Globalization
description: "Learn how to parse a string as a whole number or floating point number in Kendo UI by using the specified culture."
slug: numberparsing_kendoui_globalization
position: 6
---

# Number Parsing

Kendo UI exposes methods which convert the specified string to a [`Number`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Number) object using the culture's specific settings.

## Settings 

### Parse As Whole Number

The [`kendo.parseInt(string, [culture])`](/api/framework/kendo#parseInt) method converts a string to a whole number using the specified culture (current culture by default).

###### Example

    //assumes that current culture defines decimal separator as "."
    kendo.parseInt("12.22"); //12

    //assumes that current culture defines decimal separator as "."
    kendo.parseInt("1000 %") //10

    //assumes that current culture defines decimal separator as ",", group separator as "." and currency symbol as "€"
    kendo.parseInt("1.212,22 €"); //1212

### Parse As Floating Point Number

The [`kendo.parseFloat(string, [culture])`](/api/framework/kendo#parseInt) method converts a string to a number with floating point using the specified culture (current culture by default).

###### Example

    //assumes that current culture defines decimal separator as "."
    kendo.parseFloat("12.22"); //12.22

    //assumes that current culture defines decimal separator as "."
    kendo.parseFloat("10.22 %") //0.1022

    //assumes that current culture defines decimal separator as ",", group separator as "." and currency symbol as "€"
    kendo.parseFloat("1.212,22 €"); //1212.22

## See Also

Articles on globalization in Kendo UI:

* [Overview of Globalization in Kendo UI]({% slug overview_kendoui_globalization %})
* [Culture Definition]({% slug culture_definition_kendoui_globalization %})
* [Date Formatting]({% slug dateformatting_kendoui_globalization %})
* [Date Parsing]({% slug dateparsing_kendoui_globalization %})
* [Number Formatting]({% slug numberformatting_kendoui_globalization %})
