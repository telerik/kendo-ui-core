---
title: Overview
page_title: Overview | FlatColorPicker PHP Class
description: "Get started with the FlatColorPicker PHP class in Kendo UI."
slug: overview_flatcolorpicker_uiforphp
position: 1
---

# FlatColorPicker

The Kendo UI FlatColorPicker for PHP is a server-side wrapper for the [Kendo UI FlatColorPicker](/api/javascript/ui/flatcolorpicker) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI FlatColorPicker for PHP.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create a [FlatColorPicker](/api/php/Kendo/UI/FlatColorPicker).

###### Example

        <?php
        $flatcolorpicker = new \Kendo\UI\FlatColorPicker('flatcolorpicker');
        $flatcolorpicker->value('#ff0000');
        ?>

**Step 3** Output the FlatColorPicker by echoing the result of the `render` method.

###### Example

        <?php
        echo $flatcolorpicker->render();
        ?>

## Event Handling

You can subscribe to all FlatColorPicker [events](/api/javascript/ui/flatcolorpicker#events).

### Specify Function Names

The example below demonstrates how to subscribe for events by specifying a JavaScript function name.

###### Example

        <?php
        $flatcolorpicker = new \Kendo\UI\FlatColorPicker('flatcolorpicker');

        // The 'flatcolorpicker_change' JavaScript function will handle the 'change' event of the flatcolorpicker
        $flatcolorpicker->change('flatcolorpicker_change');

        echo $flatcolorpicker->render();
        ?>
        <script>
        function flatcolorpicker_change() {
            // Handle the change event
        }
        </script>

### Provide Inline Code

The example below demonstrates how to subscribe to events by providing inline JavaScript code.

###### Example

        <?php
        $flatcolorpicker = new \Kendo\UI\FlatColorPicker('flatcolorpicker');

        // Provide inline JavaScript code that will handle the 'change' event of the flatcolorpicker
        $flatcolorpicker->change('function() { /* Handle the change event */ }');

        echo $flatcolorpicker->render();
        ?>


<!--*-->
## Reference

### Client-Side Instances

You are able to reference an existing FlatColorPicker instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [FlatColorPicker API](/api/javascript/ui/flatcolorpicker#methods) to control its behavior.

###### Example

        <?php
        $flatcolorpicker = new \Kendo\UI\FlatColorPicker('flatcolorpicker');
        echo $flatcolorpicker->render();
        ?>
        <script>
        $(function() {
            // The constructor parameter is used as the 'id' HTML attribute of the flatcolorpicker
            var flatcolorpicker = $("#flatcolorpicker").data("kendoFlatColorPicker")
        });
        </script>

## See Also

Other articles on Telerik UI for PHP and related to the FlatColorPicker:

* [Overview of the Kendo UI ColorPicker Widget]({% slug overview_kendoui_colorpicker_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
