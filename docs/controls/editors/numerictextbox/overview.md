---
title: Overview
page_title: Overview | Kendo UI NumericTextBox
description: "Learn how to initialize the Kendo UI NumericTextBox widget and configure its behaviors."
slug: overview_kendoui_numerictextbox_widget
position: 1
---

# NumericTextBox Overview

The [Kendo UI NumericTextBox widget](http://demos.telerik.com/kendo-ui/numerictextbox/index) converts an `<input>` element into a numeric, percentage, or currency textbox.

The specific format defines the conversion data type. The widget renders **Spin** buttons which increase or decrease the value with a predefined step. The NumericTextBox accepts only numeric entries. The widget uses `kendo.culture.current` culture to determine the number precision and other culture-specific properties.

## Getting Started

### Initialize the NumericTextBox

To initialize the NumericTextBox, use the following example.

    <input id="textBox" />

    <script>
        $(document).ready(function(){
            $("#textBox").kendoNumericTextBox();
        });
    </script>

When initialized, the NumericTextBox wraps the `<input>` element with a `<span>` tag and renders **Spin** buttons.

> **Important**
>
> When you get a reference to the NumericTextBox, always use `id` instead of a class selector. Behind the scenes, the NumericTextBox creates a secondary element that represents the visual look of the widget and copies over all non-`id` attributes including the class. When you use the class for referencing the widget, this behavior causes unexpected results.

## Configuration

The NumericTextBox provides configuration options that can be set during initialization. The available properties are:

* Value of the widget
* Minimum and/or maximum values
* Increment step
* Precision of numbers
* Rounding of numbers
* Number format (any valid number format is allowed)

For more information on its methods and configuration options, review the [API Reference of the NumericTextBox](/api/javascript/ui/numerictextbox).

### Defaults

The following example demonstrates how to customize the default settings of the NumericTextBox.

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

The following example demonstrates how to create a currency NumericTextBox.

###### Example

     <input id="textbox">

     <script>
        $("#textbox").kendoNumericTextBox({
            format: "c2" //Define currency type and 2 digits precision
        });
    </script>

### Percentage NumericTextBox

The following example demonstrates how to create a percentage NumericTextBox.

###### Example

    <input id="textbox">

     <script>
        $("#textbox").kendoNumericTextBox({
            format: "p",
            value: 0.15 // 15 %
        });
    </script>

### Precision of Numbers

The widget controls the precision of the entered number by using the value of the [`decimals`](/api/javascript/ui/numerictextbox#configuration-decimals) option. The number is limited to the `decimals` length.

By default, the widget does not restrict the length of the typed value. To enforce a specific fraction length during editing, set the [`restrictDecimals`](/api/javascript/ui/numerictextbox#configuration-restrictDecimals) option to `true`.

### Rounding of Numbers

The widget controls the precision of the entered number using the half-up rounding technique. To disable this functionality, use the [`round`](/api/javascript/ui/numerictextbox#configuration-round) configuration option. Once you turn off the rounding, the value is truncated up to the desired precision length without rounding it.

### Range Validation

You can restrict the value of the NumericTextBox to a specific range by using either of the following approaches:

- Restrict the input value between a specific [`min`](/api/javascript/ui/numerictextbox#configuration-min) and [`max`](/api/javascript/ui/numerictextbox#configuration-max) range. The typed value gets modified to fit the range on `blur`.
- Use a custom Kendo UI Validator rule to restrict the input value. The invalid value keeps unchanged and the user is notified for the incorrect input with a friendly error message.

    For more details, refer to the article on [custom validation rules]({% slug overview_kendoui_validator_widget %}#custom-rules-for-validation) of the Validator.

    To see the suggested implementation in action, navigate to the online demo on [range validation](http://demos.telerik.com/kendo-ui/numerictextbox/validation).

### Support for label Element

Because of its complex rendering, you need additional implementation if you focus the widget by using a `label` element. For more information on how to do it, refer to [this Kendo UI Dojo snippet](http://dojo.telerik.com/uSeho).

## Known Limitations

### Value Precision

The NumericTextBox uses a JavaScript [`Number`](http://ecma262-5.com/ELS5_HTML.htm#Section_8.5) object to keep its value which has a certain precision limitation. In general, the `Number` object persists its precision up to 16 digits. Numbers longer than 16 digits get converted to exponential numbers and lose their precision. Because the widget relies on a `Number` object, it gets the same precision limitation.

This limitation comes from JavaScript itself and you cannot work around it in a feasible way. You are recommended to use an `<input>` element with server validation because some server languages can parse long numbers.

On the other hand, if the user enters a number with a greater precision than is currently configured through the `decimals` property, the widget value will be rounded. For more details and examples, refer to the [API documentation on `decimals`](/api/javascript/ui/numerictextbox#configuration-decimals).

### Input Type

The NumericTextBox uses `<input type="text" />` elements. If initialized from an `<input type="number" />` element, the widget switches the input type to `text`. This behavior is enables the support of the comma (`,`) as a decimal separator in some non-"en-US" cultures. Currently, browsers ignore the culture of the client and the values that contain a comma as a decimal separator.

The side effect of using a `text` input type is that it prevents the numeric keyboard from appearing on mobile devices with context-specific software keyboards.

To render a numeric software keyboard, use either of the following workarounds:
* Use a plain numeric input for mobile devices and add a [`k-textbox`](/web/appearance-styling#primitives) CSS class to apply Kendo UI styling.
* Change the input type back to `number` after the NumericTextBox initializes. This is possible only for cultures that use a dot (`.`) as a decimal separator.

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
