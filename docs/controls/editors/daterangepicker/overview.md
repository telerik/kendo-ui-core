---
title: Overview
page_title: jQuery DateRangePicker Documentation | DateRangePicker Overview
description: "Get started with the jQuery DateRangePicker by Kendo UI and learn how to create, initialize, and enable the widget."
slug: overview_kendoui_daterangepicker_widget
position: 1
---

# DateRangePicker Overview

The DateRangePicker is a container for holding start and end date inputs.

It allows the user to select a date range from a calendar or through a direct input. The widget also supports custom templates for its `month` view, configuration options for minimum and maximum dates, a start view, and a depth for navigation. The first day of the week in the **Calendar** view depends on the applied [culture]({% slug culture_definition_kendoui_globalization %}).

* [Demo page for the DateRangePicker](https://demos.telerik.com/kendo-ui/daterangepicker/index)

## Basic Configuration

The following example demonstrates how to initialize the DateRangePicker.

    <div id="daterangepicker"></div>

    <script>
        $(document).ready(function(){
            $("#daterangepicker").kendoDateRangePicker();
        });
    </script>

## Functionality and Features

* [Disabled dates]({% slug disableddates_kendoui_daterangepicker %})
* [Selected dates]({% slug selecteddates_kendoui_daterangepicker %})
* [Start view and navigation depth]({% slug navdepth_kendoui_daterangepicker %})
* [Calendar types]({% slug calendartypes_kendoui_daterangepicker %})

## See Also

* [Basic Usage of the DateRangePicker (Demo)](https://demos.telerik.com/kendo-ui/daterangepicker/index)
* [Using the API of the DateRangePicker (Demo)](https://demos.telerik.com/kendo-ui/daterangepicker/api)
* [JavaScript API Reference of the DateRangePicker](/api/javascript/ui/daterangepicker)
