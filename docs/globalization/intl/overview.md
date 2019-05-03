---
title: Overview
page_title: Internationaization Overview | Kendo UI Globalization
description: "Learn how to adapt the Kendo UI for jQuery widgets to different cultures locales, and format and parse number or date objects."
slug: overview_kendoui_intl
position: 1
---

# Internationalization Overview

The internationalization approaches in Kendo UI for jQuery apply the desired cultures by providing services for defining the desired cultures and parsing and formatting of dates and numbers.

## Getting Started

[Kendo UI provides a way to internationalize the current page using a culture script](http://demos.telerik.com/kendo-ui/globalization/index). Kendo UI exposes culture (`cultureName`) method which allows you to select the culture script corresponding to the `<language code>-<country/region code>`. For more information on the `culture` method, refer to the [API reference article on this method](/api/javascript/kendo/methods/culture).

All Kendo UI widgets which support date or number formatting depend also on the current culture. These widgets are the more complex ones such as the [Grid](http://demos.telerik.com/kendo-ui/grid/index), [ListView](http://demos.telerik.com/kendo-ui/listview/index), [Charts](http://demos.telerik.com/kendo-ui/area-charts/index), and so on.

The following Kendo UI widgets depend on the current culture:

- [Calendar](http://demos.telerik.com/kendo-ui/calendar/index)
- [DateInput](https://demos.telerik.com/kendo-ui/dateinput/index)
- [DatePicker](http://demos.telerik.com/kendo-ui/datepicker/index)
- [TimePicker](http://demos.telerik.com/kendo-ui/timepicker/index)
- [DateTimePicker](http://demos.telerik.com/kendo-ui/datetimepicker/index)
- [NumericTextBox](http://demos.telerik.com/kendo-ui/numerictextbox/index)
- [MaskedTextBox (globalized mask literals)](http://demos.telerik.com/kendo-ui/maskedtextbox/index)
- [Scheduler](http://demos.telerik.com/kendo-ui/scheduler/index)
- [Gantt](http://demos.telerik.com/kendo-ui/gantt/index)

## Defining the Current Culture

The default culture which Kendo UI widgets use is `"en-US"`.

> * You have to set the culture before the initialization of any Kendo UI widgets which rely on it.
> * If you include the generic culture file, you can omit the country or region code. For example, you can use `kendo.culture.en.min.js` with `kendo.culture("en");` instead of `kendo.culture.en-GB.min.js` with `kendo.culture("en-GB");`. However, the generic files do not carry country or region specifics and can only serve as a more generic representation.

To define the current culture:

1. Add the required culture script to the page, as demonstrated in the example below.

    ```
        <script src="jquery.js"></script>
        <script src="kendo.all.min.js"></script>
        <script src="kendo.culture.en-GB.js"></script>

        <!-- or when using the Kendo UI CDN -->
        <script src="http://kendo.cdn.telerik.com/<version>/js/jquery.min.js"></script>
        <script src="http://kendo.cdn.telerik.com/<version>/js/kendo.all.min.js"></script>
        <script src="http://kendo.cdn.telerik.com/<version>/js/cultures/kendo.culture.en-GB.min.js"></script>
    ```

1. Set the culture script that Kendo UI will use.

    ```
        <script type="text/javascript">
            //set current to the "en-GB" culture script
            kendo.culture("en-GB");
        </script>
    ```

## Formatting Date and Number Objects

Kendo UI exposes the following methods which can format the number or date objects by using a specific format string and the current specified culture.

- [`kendo.toString(object, format, [culture])`](/api/javascript/kendo/methods/tostring)&mdash;Returns a string representation of the current object while taking into account the given format and culture.
- [`kendo.format(format, arguments)`](/api/javascript/kendo/methods/format)&mdash;Replaces each format item in a specified string with the text equivalent of a corresponding object value.

For more information, refer to the article on [date formatting]({% slug dateformatting_kendoui_globalization %}).

## Parsing Strings

Kendo UI exposes the following methods which convert the specified string to a date or number object.

- [`kendo.parseInt(string, [culture])`](/api/javascript/kendo/methods/parseint)&mdash;Converts a string to a whole number by using the specified culture (current culture by default).
- [`kendo.parseFloat(string, [culture])`](/api/javascript/kendo/methods/parsefloat)&mdash;Converts a string to a number with a floating point by using the specified culture (current culture by default).
- [`kendo.parseDate(string, [formats], [culture])`](/api/javascript/kendo/methods/parsedate)&mdash;Converts a string to a JavaScript `Date` object and takes into account the given formats or the set of default formats for the given culture.

For more information, refer to the article on [date parsing]({% slug dateparsing_kendoui_globalization %}).

## See Also

* [Overview of Globalization in Kendo UI]({% slug overview_kendoui_globalization %})
* [Culture Definition]({% slug culture_definition_kendoui_globalization %})
* [Date Formatting]({% slug dateformatting_kendoui_globalization %})
* [Date Parsing]({% slug dateparsing_kendoui_globalization %})
* [Number Formatting]({% slug numberformatting_kendoui_globalization %})
* [Number Parsing]({% slug numberparsing_kendoui_globalization %})
