---
title: Overview
page_title: Overview | Kendo UI NumericTextBox
description: "Learn how to initialize the Kendo UI NumericTextBox widget and configure its behaviors."
slug: overview_kendoui_numerictextbox_widget
position: 1
---

# NumericTextBox Overview

The [Kendo UI NumericTextBox widget](http://demos.telerik.com/kendo-ui/numerictextbox/index) can convert an `<input>` element into a numeric, percentage, or currency textbox. The conversion data type is defined by the specified format. The widget renders spin buttons and by using them you can increment/decrement the value with a predefined step. The NumericTextBox widget accepts only numeric entries. The widget uses `kendo.culture.current` culture to determine the number precision and other culture-specific properties.

## Getting Started

### Initialize the NumericTextBox

    <input id="textBox" />

    <script>
        $(document).ready(function(){
            $("#textBox").kendoNumericTextBox();
        });
    </script>

When a NumericTextBox is initialized, it will automatically wrap the `<input>` element with a `<span>` tag and render spin buttons.

> **Important**  
> When getting a reference to the widget, you should always use `id` instead of a class selector. Behind the scenes, the NumericTextBox creates a secondary element that is used to represent the visual look of the widget, and copies over all non-`id` attributes, including the class. This will cause unexpected results when the class is sued for widget referencing.

## Configuration

NumericTextBox provides configuration options that can be set during initialization. Some of the properties that can be controlled are:

*   Value of the widget
*   Minimum and/or maximum values
*   Increment step
*   Precision of number
*   Number format (any valid number format is allowed)

For a complete overview of the methods and configuration options NumericTextBox applies, [review its API Reference](/api/javascript/ui/numerictextbox).

### Defaults

The example below demonstrates how to customize NumericTextBox defaults.

###### Example

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

### Currency NumericTextBox

The example below demonstrates how to create a currency NumericTextBox widget.

###### Example

     <input id="textbox">

     <script>
        $("#textbox").kendoNumericTextBox({
            format: "c2" //Define currency type and 2 digits precision
        });
    </script>

### Percentage NumericTextBox

The example below demonstartes how to create a percentage NumericTextBox widget.

###### Example

    <input id="textbox">

     <script>
        $("#textbox").kendoNumericTextBox({
            format: "p",
            value: 0.15 // 15 %
        });
    </script>

### Support fro label Element

Because of its complex rendering, focusing the widget by using a label element requires additional implementation. For more information about how to do it, check this [this Kendo UI Dojo snippet](http://dojo.telerik.com/uSeho).

## Known Limitations

### Value Precision

Kendo UI NumericTextBox uses a JavaScript [`Number`](http://ecma262-5.com/ELS5_HTML.htm#Section_8.5) object to keep its value, which has a certain precision limitation. In general, the `Number` object can persist its precision up to 16 digits. Numbers longer than that are converted to exponential numbers. Hence, they lose their precision. As the widget relies on a `Number` object, it gets the same precision limitation.

No feasible workaround for this limitation exists as it comes from JavaScript itself. It is recommended that you use a simple `<input>` element with server validation as some server languages are able to parse long numbers.

### Input Type

Kendo UI NumericTextBox uses `<input type="text" />` elements. If the widget is initialized from an `<input type="number" />` element, it will switch the input type to `text`. This behavior is required so that comma (",") is supported as a decimal separator in some non-"en-US" cultures. For the time being, browsers do not take into account the client's culture and always ignore values that contain a comma decimal separator.

A side effect from using a `text` input type is that it prevents the numeric keyboard from appearing on mobile devices with context-specific software keyboards. If a numeric software keyboard is desired, use any of the two possible workarounds:

* Use a plain numeric input for mobile devices and add a [`k-textbox`](/web/appearance-styling#primitives) CSS class to apply Kendo UI styling.
* Change the input type back to `number` after the NumericTextBox is initialized. This is possible only for cultures that use a dot (".") as a decimal separator.

###### Example

        /* widget is initialized */
        $("#my-numeric-textbox").kendoNumericTextBox({ /*...*/ });

        /* set the input type to "number" */
        $("#my-numeric-textbox").attr("type", "number");

        /* or if the widget object is already available */
        var numericTextBoxObject = $("#my-numeric-textbox").data("kendoNumericTextBox");
        numericTextBoxObject.element.attr("type", "number");

<!--*-->
## See Also

Other articles and how-to examples on Kendo UI NumericTextBox:

* [How to Add Title Attribute]({% slug howto_add_title_attribute_numerictextbox %})
* [How to Change Text Color]({% slug howto_change_text_color_numerictextbox %})
* [How to Focus Widget on Label Click]({% slug howto_focus_widgeton_label_click_numerictextbox %})
* [How to Persist Old Value]({% slug howto_persist_old_value_numerictextbox %})
* [How to Select All Text on Focus]({% slug howto_select_all_texton_focus_numerictextbox %})
* [How to Update Value on Keyup]({% slug howto_update_valueon_keyup_angularjs_numerictextbox %})
* [How to Update Value on Spin]({% slug howto_update_valueon_spin_angularjs_numerictextbox %})
* [How to Use Custom Culture Script]({% slug howto_use_custom_culture_script_numerictextbox %})
* [Overview of the ASP.NET MVC HtmlHelper Extension for the NumericTextBox Widget](/aspnet-mvc/helpers/numerictextbox/overview)
* [Overview of the NumericTextBox JSP Tag]({% slug overview_numerictextbox_uiforjsp %})
* [Overview of the NumericTextBox PHP Class](/php/widgets/numerictextbox/overview)
* [NumericTextBox JavaScript API Reference](/api/javascript/ui/numerictextbox)
