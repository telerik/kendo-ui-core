---
title: Overview
page_title: jQuery DatePicker Documentation | DatePicker Overview
description: "Get started with the jQuery DatePicker by Kendo UI and learn how to initialize the widget, disable and select dates, navigate its navigation depth, and use all its available features."
slug: overview_kendoui_datepicker_widget
position: 1
---

# DatePicker Overview

The DatePicker enables the user to select a date from a calendar or through a direct input.

It provides options for using custom templates for its **Month** view, setting minimum and maximum dates, a start view, and a depth for navigation.

* [Demo page for the DatePicker](https://demos.telerik.com/kendo-ui/datepicker/index)

## Initializing the DatePicker

The following example demonstrates how to initialize the DatePicker.

> * The DatePicker copies any styles and CSS classes from the `input` element to the `wrapper` element and visible input.
> * The first day of the week in the DatePicker calendar depends on the applied [culture]({% slug culture_definition_kendoui_globalization %}).

```dojo
    <input id="datePicker" />

    <script>
        $(document).ready(function(){
            $("#datePicker").kendoDatePicker();
        });
    </script>
```

## Functionality and Features

* [Disabled dates]({% slug disableddates_datepicker %})
* [Selected dates]({% slug selecteddates_datepicker %})
* [Start View and Navigation Depth]({% slug navdepth_datepicker %})
* [Input value validation]({% slug validation_datepicker %})
* [Calendar types]({% slug calendartypes_datepicker %})
* [Week number column]({% slug weeknumcolumn_datepicker %})
* [DateInput integration]({% slug dateinputintegration_datepicker %})
* [Templates]({% slug templates_datepicker %})
* [Globalization]({% slug globalization_datepicker %})
* [Accessibility]({% slug accessibility_datepicker %})

For more information on implementing specific scenarios, refer to the [**Knowledge Base** section](https://docs.telerik.com/kendo-ui/knowledge-base).

## Events

For a complete example on basic DatePicker events, refer to the [demo on using the events of the DatePicker](https://demos.telerik.com/kendo-ui/datepicker/events).

## See Also

* [Basic Usage of the DatePicker (Demo)](https://demos.telerik.com/kendo-ui/datepicker/index)
* [Basic Events in the DatePicker (Demo)](https://demos.telerik.com/kendo-ui/datepicker/events)
* [Binding the DatePicker over MVVM (Demo)](https://demos.telerik.com/kendo-ui/datepicker/keyboard-navigation)
* [Using the DatePicker with AngularJS Directives (Demo)](https://demos.telerik.com/kendo-ui/datepicker/angular)
* [Applying the DatePicker API (Demo)](https://demos.telerik.com/kendo-ui/datepicker/api)
* [JavaScript API Reference of the DatePicker](/api/javascript/ui/datepicker)
