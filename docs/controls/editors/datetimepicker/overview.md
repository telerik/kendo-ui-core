---
title: Overview
page_title: jQuery DateTimePicker Documentation | DateTimePicker Overview
description: "Get started with the jQuery DateTimePicker by Kendo UI and learn how to create, initialize, and enable the widget."
slug: overview_kendoui_datetimepicker_widget
position: 1
---

# DateTimePicker Overview

The DateTimePicker allows the user to select a value from a calendar, a time drop-down list, or through direct input.

The DateTimePicker supports configurable options for minimum and maximum value, format, interval between predefined hours in the time view, custom templates for the **Month** view of the calendar, start view, and a depth for navigation. The first day of the week in the **Calendar** view depends on the applied [culture]({% slug culture_definition_kendoui_globalization %}).

* [Demo page for the DateTimePicker](https://demos.telerik.com/kendo-ui/datetimepicker/index)

## Basic Configuration

The following example demonstrates how to initialize the DateTimePicker. The widget copies any styles and CSS classes from the `input` element to the `wrapper` element.

    <input id="dateTimePicker">

    <script>
      $(document).ready(function(){
        $("#dateTimePicker").kendoDateTimePicker();
      });
    </script>

## Functionality and Features

* [Disabled dates]({% slug disableddates_kendoui_datetimepicker %})
* [Selected date and time]({% slug selecteddatestimes_kendoui_datetimepicker %})
* [Start view and navigation depth]({% slug navdepth_kendoui_datetimepicker %})
* [Validation]({% slug validation_kendoui_datetimepicker %})
* [Date and time formatting]({% slug datetimeformats_kendoui_datetimepicker_widget %})
* [Calendar types]({% slug calendartypes_kendoui_datetimepicker %})

## See Also

* [Basic Usage of the DateTimePicker (Demo)](https://demos.telerik.com/kendo-ui/datetimepicker/index)
* [Using the API of the DateTimePicker (Demo)](https://demos.telerik.com/kendo-ui/datetimepicker/api)
* [JavaScript API Reference of the DateTimePicker](/api/javascript/ui/datetimepicker)
