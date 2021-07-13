---
title: Overview
page_title: Overview | TextBox PHP Class
description: "How to configure and use the TextBox PHP class in Kendo UI."
slug: overview_textbox_uiforphp
---

# TextBox PHP Class Overview

The Kendo UI TextBox for PHP is a server-side wrapper for the [Kendo UI TextBox](https://demos.telerik.com/kendo-ui/textbox/index) widget.

The Kendo UI TextBox converts an `<input>` element into a styled input.

## Getting Started

### Configuration

The TextBox provides a set of [default API configuration options](/api/php/Kendo/UI/TextBox) that can be set during its initialization such as value, placeholder, and so on. Below are listed the steps for you to follow when configuring the Kendo UI TextBox. Below are listed the steps for you to follow when configuring the Kendo UI TextBox for PHP.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create a [TextBox](/api/php/Kendo/UI/TextBox).
    
        $textbox = new \Kendo\UI\TextBox('textbox');
        $textbox->placeholder("Name...")
            ->attr('style', 'width: 100%');


**Step 3** Output the TextBox by echoing the result of the `render` method.

       <?= $textbox->render() ?>

### Labels

The Label enables you to associate the label HTML element with a TextBox.

* [Demo page for the TextBox Floating Label](https://demos.telerik.com/php-ui/textbox/floating-label) 

The example below demonstrates how to add a floating label to a TextBox.

        $label = new \Kendo\UI\TextBoxLabel();
        $label->content("Name");
        $label->Floating(true);

        $textbox = new \Kendo\UI\TextBox('textbox');
        $textbox->label($label);

        <style>
            .k-floating-label-container {
                width: 100%;
            }
        </style>

## Event Handling

You can subscribe to the [change](/api/javascript/ui/textbox/events/change) event by the handler name. The `change` fires each time a new value is set by the user.  For a full list, refer to the TextBox events documentation in the API section.

> **Important:** The [`change`](/api/javascript/ui/textbox/events/change) event is not fired when the value of the widget is changed from JavaScript code.

### Specify Function Names

The example below demonstrates how to subscribe for events by specifying a JavaScript function name.

    $textbox = new \Kendo\UI\TextBox('textbox');
    $textbox->change('onChange')
        ->attr('style', 'width: 100%');

    <script>
        function onChange() {
            console.log("Change :: " + this.value());
        }
    </script>

## Reference

### Client-Side Instances

To reference to an existing TextBox instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) method. Once a reference is established, use the [API](/api/javascript/ui/textbox) to control its behavior.

The following example demonstrates how to access an existing TextBox instance.


        $textbox = new \Kendo\UI\TextBox('textbox');

        <script>
            $(function() {
                // The constructor parameter is used as the 'id' HTML attribute of the textbox
                var textbox = $("#textbox").data("kendoTextBox");
            });
        </script>

## See Also

* [Overview of the Kendo UI TextBox Widget]({% slug overview_kendoui_textbox_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/TextBox)
