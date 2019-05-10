---
title: Overview
page_title: jQuery NumericTextBox Documentation | NumericTextBox Overview | Kendo UI
description: "Get started with the jQuery NumericTextBox by Kendo UI and learn how to create and initialize the widget."
slug: overview_kendoui_numerictextbox_widget
position: 1
---

# NumericTextBox Overview

The [Kendo UI NumericTextBox widget](http://demos.telerik.com/kendo-ui/numerictextbox/index) converts an `<input>` element into a numeric, percentage, or currency textbox.

By default, the widget renders **Spin** buttons which increase or decrease the value with a predefined step.

## Basic Usage

The NumericTextBox provides a set of [default API configuration options](/api/javascript/ui/numerictextbox) which can be set during its initialization such as minimum and maximum values, incremental steps, and so on.

The following example demonstrates how to create a NumericTextBox and set some of its configuration options.

     <input id="textbox">

     <script>
        $("#textbox").kendoNumericTextBox({
            value: 10,
            min: -10,
            max: 100,
            step: 0.75,
            format: "n",
            decimals: 3
        });
    </script>

## Initializing the NumericTextBox

Upon its initialization, the NumericTextBox wraps the `<input>` element with a `<span>` tag and renders its **Spin** buttons.

> To get a reference to the NumericTextBox, always use `id` instead of a class selector. Behind the scenes, the NumericTextBox creates a secondary element that represents the visual look of the widget and copies all non-`id` attributes including the class. When you use the class for referencing the widget, this behavior causes unexpected results.

The following example demonstrates how to initialize the NumericTextBox.

    <input id="textBox" />

    <script>
        $(document).ready(function(){
            $("#textBox").kendoNumericTextBox();
        });
    </script>

## Features and Functionality

* [Formats]({% slug formats_numerictextbox %})
* [Input Restrictions]({% slug input_restrictions_numerictextbox %})
* [Globalization]({% slug globalization_numerictextbox %})
* [Accessibility]({% slug accessibility_numerictextbox %})

For more information on the known limitations of the NumericTextBox, refer to [this article]({% slug limitations_numerictextbox %}).

## Events

For a complete example on the basic NumericTextBox events, refer to the [demo on using the events of the NumericTextBox](https://demos.telerik.com/kendo-ui/numerictextbox/events).

## See Also

* [Basic Usage of the NumericTextBox (Demo)](https://demos.telerik.com/kendo-ui/numerictextbox/index)
* [Using the Basic Events of the NumericTextBox (Demo)](https://demos.telerik.com/kendo-ui/numerictextbox/events)
* [Binding the NumericTextBox over MVVM (Demo)](https://demos.telerik.com/kendo-ui/numerictextbox/mvvm)
* [Using the NumericTextBox with AngularJS Directives (Demo)](https://demos.telerik.com/kendo-ui/numerictextbox/angular)
* [Applying the NumericTextBox API (Demo)](https://demos.telerik.com/kendo-ui/numerictextbox/api)
* [JavaScript API Reference of the NumericTextBox](/api/javascript/ui/numerictextbox)
* [Known Limitations in the NumericTextBox]({% slug limitations_numerictextbox %})
