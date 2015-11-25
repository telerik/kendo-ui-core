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

### Value Precision

Kendo UI NumericTextBox widget uses JavaScript [Number](http://ecma262-5.com/ELS5_HTML.htm#Section_8.5) object to keep its value, which has a certain precision limitation.
In general, Number object can persist its precision up to 16 digits. Numbers longer than that length will be converted to
exponential numbers and hence will lose their precision. As the widget relies on a Number object, it gets the same precision limitation.

Unfortunately, there is no feasible workaround for this limitation as it comes from the JavaScript itself. What we suggest is to use
simple INPUT element with server validation, as some server languages are able to parse long numbers.

### Input Type

The Kendo UI NumericTextBox uses `<input type="text" />` elements. If the widget is initialized from an `<input type="number" />` element, it will switch the input type to `text`.
This behavior is required in order to support comma (",") as a decimal separator in some non-"en-US" cultures. For the time being, browsers do not take into account the client's culture and
always ignore values that contain a comma decimal separator.

A side effect from using a text input type is that it will prevent the numeric keyboard from appearing on mobile devices with context-specific software keyboards.

If a numeric software keyboard is desired, there are two possible workarounds:

* Use a plain numeric input for mobile devices and add a [`k-textbox`](/web/appearance-styling#primitives) CSS class to apply Kendo UI styling.
* Change the input type back to `number` after the NumericTextBox is initialized. This is possible only for cultures that use a dot (".") as a decimal separator.

        /* widget is initialized */
        $("#my-numeric-textbox").kendoNumericTextBox({ /*...*/ });
        
        /* set the input type to "number" */
        $("#my-numeric-textbox").attr("type", "number");
        
        /* or if the widget object is already available */
        var numericTextBoxObject = $("#my-numeric-textbox").data("kendoNumericTextBox");
        numericTextBoxObject.element.attr("type", "number");
