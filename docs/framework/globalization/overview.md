---
title: Overview
page_title: Overview of Globalization in Kendo UI framework
description: Documentation how to define current culture settings, format number or date objects in the process of globalization.
position: 1
---
# Kendo Globalization Overview

Globalization is the process of designing and developing an application that works in multiple cultures. The culture defines specific information for the number formats, week and month names, date and time formats and etc.

Kendo UI provides a way to internationalize the current page using a culture script. Kendo UI exposes culture(cultureName) method which allows to select the culture script coresponding to the "`<language code>-<country/region code>`". For complete overview of the *culture* method, [review the Kendo API Reference](/api/framework/kendo#methods-culture).

## Define the current culture

First let's start by adding the required culture script:

### Add culture scripts to the page:

    <script src="jquery.js"></script>
    <script src="kendo.all.min.js"></script>
    <script src="kendo.culture.en-GB.js"></script>

    <!-- or when using the Kendo UI CDN -->
    <script src="http://cdn.kendostatic.com/<version>/js/jquery.min.js"></script>
    <script src="http://cdn.kendostatic.com/<version>/js/kendo.all.min.js"></script>
    <script src="http://cdn.kendostatic.com/<version>/js/cultures/kendo.culture.en-GB.min.js"></script>


Now, you just need to set the culture script, which Kendo UI should use:

### Set current culture:

    <script type="text/javascript">
         //set current to the "en-GB" culture script
         kendo.culture("en-GB");
    </script>

The default culture, which Kendo UI widgets uses is "en-US".

## Format Number or Date object

Kendo UI exposes methods which can format number or date object using specific format string and the current specified culture:

- [kendo.toString(object, format, [culture])](/api/framework/kendo#methods-toString) - returns a string representation of the current object taking into account the given format and culture.
- [kendo.format(format, arguments)](/api/framework/kendo#methods-format) -  replaces each format item in a specified string with the text equivalent of a corresponding object's value.

For more detail information check [this help topic](/framework/globalization/dateformatting).

## Parsing a string
Kendo UI exposes methods which converts the specified string to date or number object:

- [kendo.parseInt(string, [culture])](/api/framework/kendo#methods-parseInt) - converts a string to a whole number using the specified culture (current culture by default).
- [kendo.parseFloat(string, [culture])](/api/framework/kendo#methods-parseFloat) - converts a string to a number with floating point using the specified culture (current culture by default).
- [kendo.parseDate(string, [formats], [culture])](/api/framework/kendo#methods-parseDate) - converts a string to a JavaScript Date object, taking into account the given format/formats (or the given culture's set of default formats).

For more detail information check [this help topic](/framework/globalization/dateparsing).

## globalize.js support

> When globalize.js is registered before Kendo UI scripts, then Kendo UI will use globalize.js features instead of Kendo UI Globalization.

## Widgets that depend on culture info

Here is a list of widgets which depends on the current culture:

- Calendar
- DatePicker
- TimePicker
- DateTimePicker
- NumericTextBox
- MaskedTextBox (globalized mask literals)
- Scheduler
- Gantt

All widgets that support date or numeric formatting also depend on current culture. These widgets are the more complex ones like Grid, ListView, Charts and etc.
