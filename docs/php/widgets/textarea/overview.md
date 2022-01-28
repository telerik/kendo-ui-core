---
title: Overview
page_title: Overview | TextArea PHP Class
description: "How to configure and use the TextArea PHP class in Kendo UI."
slug: overview_textarea_uiforphp
---

# TextArea PHP Class Overview

The Kendo UI TextArea for PHP is a server-side wrapper for the [Kendo UI TextArea](https://demos.telerik.com/kendo-ui/textarea/index) widget.

The Kendo UI TextArea converts a `<textarea>` element into a styled textarea.

## Getting Started

### Configuration

The TextArea provides a set of [default API configuration options](/api/php/Kendo/UI/TextArea) that can be set during its initialization such as value, placeholder, and so on. Below are listed the steps for you to follow when configuring the Kendo UI TextArea. Below are listed the steps for you to follow when configuring the Kendo UI TextArea for PHP.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create a [TextArea](/api/php/Kendo/UI/TextArea).
    
        $textarea = new \Kendo\UI\TextArea('description');
        $textarea->placeholder("Description...")
                ->rows(5)
                ->attr('style', 'width: 100%');


**Step 3** Output the TextArea by echoing the result of the `render` method.

       <?= $textarea->render() ?>

### Labels

The Label enables you to associate a `label` HTML element with a TextArea.

* [Demo page for the TextArea Floating Label](https://demos.telerik.com/php-ui/textarea/floating-label) 

The example below demonstrates how to add a floating label to a TextArea.

        $label = new \Kendo\UI\TextAreaLabel();
        $label->content("Description");
        $label->Floating(true);

        $textarea = new \Kendo\UI\TextArea('textarea');
        $textarea->label($label)
                ->rows(5);

        <style>
            .k-floating-label-container {
                width: 100%;
            }
        </style>

## Event Handling

You can subscribe to the [change](/api/javascript/ui/textarea/events/change) event by the handler name. The `change` fires each time a new value is set by the user. For a full list, refer to the TextArea events documentation in the API section.

> **Important:** The [`change`](/api/javascript/ui/textarea/events/change) event is not fired when the value of the widget is changed from JavaScript code. 

### Specify Function Names

The example below demonstrates how to subscribe for events by specifying a JavaScript function name.

    $textarea = new \Kendo\UI\TextArea('description');
    $textarea->change('onChange')
        ->rows(5)
        ->attr('style', 'width: 100%');

    <script>
        function onChange() {
            console.log("Change :: " + this.value());
        }
    </script>

## Reference

### Client-Side Instances

To reference to an existing TextArea instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) method. Once a reference is established, use the [API](/api/javascript/ui/textarea) to control its behavior.

The following example demonstrates how to access an existing TextArea instance.


        $textarea = new \Kendo\UI\TextArea('description');

        <script>
            $(function() {
                // The constructor parameter is used as the 'id' HTML attribute of the textarea
                var textarea = $("#description").data("kendoTextArea");
            });
        </script>

## See Also

* [Overview of the Kendo UI TextArea Widget]({% slug overview_kendoui_textarea_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/TextArea)
