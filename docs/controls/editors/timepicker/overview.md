---
title: Overview
page_title: jQuery TimePicker Documentation | TimePicker Overview
description: "Get started with the jQuery TimePicker by Kendo UI and learn how to create, initialize, and enable the widget."
slug: overview_kendoui_timepicker_widget
position: 1
---

# TimePicker Overview

The TimePicker enables users to select time values from a predefined list or enter new ones.

The widget supports configurable options for setting its format, minimum and maximum time, and the interval between the predefined values in the list.

* [Demo page for the TimePicker](https://demos.telerik.com/kendo-ui/timepicker/index)

## Initializing the TimePicker

To initialize the DatePicker, use an `id` selector.

> The widget copies any styles and CSS classes from the input element to the wrapper element.

    <input id="timePicker" />

    <script>
        $(document).ready(function(){
            $("#timePicker").kendoTimePicker();
        });
    </script>

## Functionality and Features

* [Selected times]({% slug selectedtimes_kendoui_timepicker %})
* [Formats]({% slug formats_kendoui_timepicker %})
* [Validation]({% slug validation_kendoui_timepicker %})

## See Also

* [Basic Usage of the TimePicker (Demo)](https://demos.telerik.com/kendo-ui/timepicker/index)
* [Using the API of the TimePicker (Demo)](https://demos.telerik.com/kendo-ui/timepicker/api)
* [JavaScript API Reference of the TimePicker](/api/javascript/ui/timepicker)
