---
title: Overview
page_title: NumericTextBox UI widget - documentation overview
description: How to create NumericTextBox widget and deal with proper configuration of its behaviors.
---

# NumericTextBox Overview

The NumericTextBox widget can convert an `INPUT` element into a numeric, percentage or currency textbox.
The type is defined depending on the specified format. The widget renders spin buttons and with their help you can
increment/decrement the value with a predefined step. The NumericTextBox widget accepts only numeric entries.
The widget uses _kendo.culture.current_ culture in order to determine number precision and other culture
specific properties.


## Getting Started

### NumericTextBox initialization
    
    <input id="textBox" />
    
    <script>
        $(document).ready(function(){
            $("#textBox").kendoNumericTextBox();
        });
    </script>

When a NumericTextBox is initialized, it will automatically
wrap the `INPUT` element with a `<span>` tag and render spin buttons.

> When getting a reference of the widget, you should always use id instead of class selector. Behind the scenes, the NumericTextBox creates a secondary element that is used to represent the visual look of the widget, and copies over all non-id attributes, including the class. This will cause unexpected results when class is sued for widget referencing.

## Configure NumericTextBox behavior


The NumericTextBox provides configuration options that can be set during initialization. Some of the properties that can be
controlled are:

*   Value of the NumericTextBox
*   Minimum and/or maximum values
*   Increment step
*   Precision of the number
*   Number format (any valid number format is allowed)

For a complete overview of the NumericTextBox's methods and configuration options, [review the NumericTextBox API Reference](/api/web/numerictextbox).

### Customize NumericTextBox defaults

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

### Create Currency NumericTextBox widget

     <input id="textbox">
     
     <script>
        $("#textbox").kendoNumericTextBox({
            format: "c2" //Define currency type and 2 digits precision
        });
    </script>

### Create Percentage NumericTextBox widget
    <input id="textbox">
     
     <script>
        $("#textbox").kendoNumericTextBox({
            format: "p",
            value: 0.15 // 15 %
        });
    </script>

## Support for label element

Because of its complex rendering, focusing the widget using a `LABEL` element requires additional implementation.
Check [this Kendo UI Dojo snippet](http://dojo.telerik.com/uSeho), which shows how its done.

## Known limitations

Kendo UI NumericTextBox widget uses JavaScript [Number](http://ecma262-5.com/ELS5_HTML.htm#Section_8.5) object to keep its value, which has a certain precision limitation.
In general, Number object can persist its precision up to 16 digits. Numbers longer than that length will be converted to
exponential numbers and hence will lose their precision. As the widget relies on a Number object, it gets the same precision limitation.

#### Workaround
Unfortunately, there is no feasible workaround for this limitation as it comes from the JavaScript itself. What we suggest is to use
simple INPUT element with server validation, as some server languages are able to parse long numbers.
