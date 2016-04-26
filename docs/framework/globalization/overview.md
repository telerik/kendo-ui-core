---
title: Overview
page_title: Overview | Kendo UI Globalization
description: "Learn how to define current culture settings, format number or date objects in the process of globalization when working with Kendo UI."
slug: overview_kendoui_globalization
position: 1
---

# Globalization Overview

Globalization is the process of designing and developing an application that works in multiple cultures. The culture defines specific information for the number formats, week and month names, date and time formats, etc.

## Getting Started

[Kendo UI provides a way to internationalize the current page using a culture script](http://demos.telerik.com/kendo-ui/globalization/index). Kendo UI exposes culture (`cultureName`) method which allows you to select the culture script corresponding to the `<language code>-<country/region code>`.

For detailed information on the `culture` method, refer to the [API reference article on this method](/api/javascript/kendo#methods-culture).

### Define Current Culture

First, add the required culture script to the page, as demonstrated in the example below.

###### Example

    <script src="jquery.js"></script>
    <script src="kendo.all.min.js"></script>
    <script src="kendo.culture.en-GB.js"></script>

    <!-- or when using the Kendo UI CDN -->
    <script src="http://kendo.cdn.telerik.com/<version>/js/jquery.min.js"></script>
    <script src="http://kendo.cdn.telerik.com/<version>/js/kendo.all.min.js"></script>
    <script src="http://kendo.cdn.telerik.com/<version>/js/cultures/kendo.culture.en-GB.min.js"></script>


Now, set the culture script, which Kendo UI should use, as shown below.

###### Example

    <script type="text/javascript">
         //set current to the "en-GB" culture script
         kendo.culture("en-GB");
    </script>

The default culture, which Kendo UI widgets uses is "en-US".

> The culture must be set before any Kendo UI widgets that rely on it, are initialized.

## Configuration

### Format Number or Date Objects

Kendo UI exposes methods, which can format the number or date objects using a specific format string and the current specified culture. These are:

- [`kendo.toString(object, format, [culture])`](/api/javascript/kendo#methods-toString)&mdash;This method returns a string representation of the current object while taking into account the given format and culture.
- [`kendo.format(format, arguments)`](/api/javascript/kendo#methods-format)&mdash;Replaces each format item in a specified string with the text equivalent of a corresponding object's value.

For detailed information, refer to [this article]({%slug dateformatting_kendoui_globalization %}).

### Parse Strings

Kendo UI exposes methods which convert the specified string to a date or number object.

- [`kendo.parseInt(string, [culture])`](/api/javascript/kendo#methods-parseInt)&mdash;This method converts a string to a whole number using the specified culture (current culture by default).
- [`kendo.parseFloat(string, [culture])`](/api/javascript/kendo#methods-parseFloat)&mdash;Converts a string to a number with floating point using the specified culture (current culture by default).
- [`kendo.parseDate(string, [formats], [culture])`](/api/javascript/kendo#methods-parseDate)&mdash;Converts a string to a JavaScript Date object, taking into account the given format/formats (or the given culture's set of default formats).

For detailed information, refer to [this article]({% slug dateparsing_kendoui_globalization %}).

## Support

### (Deprecated) jQuery Globalize.js 0.1

If you load globalize.js, the default globalization features in Kendo UI are overridden. Some features might not work. For example, custom number formats are unsupported in this case.

> **Important**
>
> The Globalization 0.1 library is no longer supported. It is advisable not to use it. For more details, refer to the [#1354 issue](https://github.com/telerik/kendo-ui-core/issues/1354).

## Widgets Depending on Culture Information

Here is a list of Kendo UI widgets which depend on the current culture:

- [Calendar](http://demos.telerik.com/kendo-ui/calendar/index)
- [DatePicker](http://demos.telerik.com/kendo-ui/datepicker/index)
- [TimePicker](http://demos.telerik.com/kendo-ui/timepicker/index)
- [DateTimePicker](http://demos.telerik.com/kendo-ui/datetimepicker/index)
- [NumericTextBox](http://demos.telerik.com/kendo-ui/numerictextbox/index)
- [MaskedTextBox (globalized mask literals)](http://demos.telerik.com/kendo-ui/maskedtextbox/index)
- [Scheduler](http://demos.telerik.com/kendo-ui/scheduler/index)
- [Gantt](http://demos.telerik.com/kendo-ui/gantt/index)

All Kendo UI widgets which support date or numeric formatting also depend on current culture. These widgets are the more complex ones such as Kendo UI [Grid](http://demos.telerik.com/kendo-ui/grid/index), [ListView](http://demos.telerik.com/kendo-ui/listview/index), [Charts](http://demos.telerik.com/kendo-ui/area-charts/index), etc.

## See Also

Articles on globalization in Kendo UI:

* [Overview of Globalization in Kendo UI]({% slug overview_kendoui_globalization %})
* [Culture Definition]({% slug culture_definition_kendoui_globalization %})
* [Date Formatting]({% slug dateformatting_kendoui_globalization %})
* [Date Parsing]({% slug dateparsing_kendoui_globalization %})
* [Number Formatting]({% slug numberformatting_kendoui_globalization %})
* [Number Parsing]({% slug numberparsing_kendoui_globalization %})
